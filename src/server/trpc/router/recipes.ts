import { prisma } from "@/server/db/client";
import type {
    CreateRecipeInputType,
    UpdateRecipeInputType
} from "@/utils/validators";
import {
    createRecipeInputSchema,
    deleteRecipeInputSchema,
    getRecipeInputSchema,
    updateRecipeInputSchema
} from "@/utils/validators";
import { TRPCError } from "@trpc/server";
import type { User } from "next-auth";
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
        }
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
            instructions: true
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
};

const updateRecipe = async (context: Context, input: UpdateRecipeInputType) => {
    const recipe = await getRecipe(context, input.id);

    if (!recipe.editable) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const { ingredients, instructions, ...restInput } = input;
    const totalTime = input.prepTime + input.cookTime + input.chillTime;

    await prisma.recipe.update({
        where: {
            id: input.id
        },
        data: {
            ...restInput,
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

export const recipesRouter = router({
    getRecipes: publicProcedure.query(getRecipes),
    getRecipe: publicProcedure
        .input(getRecipeInputSchema)
        .query(({ ctx, input }) => getRecipe(ctx, input.id)),
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
