import type { User } from "next-auth";

import { TRPCError } from "@trpc/server";

import { prisma } from "@/server/db/client";
import type {
    CreateRecipeInputType,
    UpdateRecipeInputType
} from "@/utils/validators";
import { searchRecipesInputSchema } from "@/utils/validators";
import {
    createRecipeInputSchema,
    deleteRecipeInputSchema,
    getRecipeInputSchema,
    updateRecipeInputSchema
} from "@/utils/validators";

import type { IUploadResult } from "../../common/cloudinary";
import { deleteImage, uploadImage } from "../../common/cloudinary";
import type { Context } from "../context";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const getRecipes = () => {
    return prisma.recipe.findMany({
        include: {
            category: {
                select: {
                    name: true
                }
            },
            createdBy: {
                select: {
                    name: true,
                    image: true,
                    id: true
                }
            }
        },
        orderBy: [
            {
                createdAt: "desc"
            }
        ]
    });
};

const getRecipe = async (context: Context, id: string) => {
    const result = await prisma.recipe.findFirstOrThrow({
        where: {
            id
        },
        include: {
            ingredients: {
                include: {
                    ingredient: true,
                    unit: true
                }
            },
            instructions: true,
            category: true,
            createdBy: true
        }
    });

    return {
        ...result,
        editable: result.createdById === context.session?.user?.id
    };
};

const createRecipe = async (user: User, input: CreateRecipeInputType) => {
    const { ingredients, instructions, image, ...restInput } = input;
    const totalTime = input.prepTime + input.cookTime + input.chillTime;

    try {
        const uploadedImage = await uploadImage(image);

        return prisma.recipe.create({
            data: {
                ...restInput,
                totalTime,
                imageId: uploadedImage?.id,
                image: uploadedImage?.url,
                createdById: user.id,
                ingredients: {
                    createMany: {
                        data: ingredients
                    }
                },
                instructions: {
                    createMany: { data: instructions }
                }
            }
        });
    } catch (e) {
        console.error(e);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
};

const updateRecipe = async (context: Context, input: UpdateRecipeInputType) => {
    const recipe = await getRecipe(context, input.id);

    if (!recipe.editable) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const { ingredients, instructions, ...restInput } = input;
    let uploadImageResult: IUploadResult | undefined = undefined;

    try {
        if (input.image && input.image !== recipe.image) {
            if (recipe.imageId) {
                deleteImage(recipe.imageId);
            }

            uploadImageResult = await uploadImage(input.image);
        }

        const totalTime = input.prepTime + input.cookTime + input.chillTime;

        await prisma.recipe.update({
            where: {
                id: input.id
            },
            data: {
                ...restInput,
                imageId: uploadImageResult?.id,
                image: uploadImageResult?.url,
                totalTime,
                ingredients: {
                    deleteMany: {},
                    createMany: {
                        data: ingredients
                    }
                },
                instructions: {
                    deleteMany: {},
                    createMany: { data: instructions }
                }
            }
        });

        return getRecipe(context, input.id);
    } catch (e) {
        console.error(e);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
};

const deleteRecipe = async (context: Context, id: string) => {
    const recipe = await getRecipe(context, id);

    if (!recipe.editable) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    if (recipe.imageId) {
        await deleteImage(recipe.imageId);
    }

    await prisma.recipe.delete({
        where: {
            id
        }
    });
};

const searchRecipes = async (search: string) => {
    if (search.trim() === "") {
        return [];
    }

    const recipes = await prisma.recipe.findMany({
        where: {
            OR: [
                {
                    name: {
                        contains: search
                    }
                },
                {
                    description: {
                        contains: search
                    }
                }
            ]
        },
        take: 10
    });

    return recipes;
};

export const recipesRouter = router({
    getRecipes: publicProcedure.query(getRecipes),
    getRecipe: publicProcedure
        .input(getRecipeInputSchema)
        .query(({ ctx, input }) => getRecipe(ctx, input.id)),
    searchRecipes: publicProcedure
        .input(searchRecipesInputSchema)
        .query(({ input }) => searchRecipes(input.search)),
    createRecipe: protectedProcedure
        .input(createRecipeInputSchema)
        .mutation(async ({ ctx, input }) =>
            createRecipe(ctx.session.user, input)
        ),
    updateRecipe: protectedProcedure
        .input(updateRecipeInputSchema)
        .mutation(async ({ ctx, input }) => updateRecipe(ctx, input)),
    deleteRecipe: protectedProcedure
        .input(deleteRecipeInputSchema)
        .mutation(async ({ ctx, input }) => deleteRecipe(ctx, input.id))
});
