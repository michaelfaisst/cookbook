import { prisma } from "@/server/db/client";
import {
    createRecipeInputSchema,
    getRecipeInputSchema,
    updateRecipeInputSchema
} from "@/utils/validators";
import type { Context } from "../context";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

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

export const recipesRouter = router({
    getRecipes: publicProcedure.query(getRecipes),
    getRecipe: publicProcedure
        .input(getRecipeInputSchema)
        .query(({ ctx, input }) => getRecipe(ctx, input.id)),
    createRecipe: protectedProcedure
        .input(createRecipeInputSchema)
        .mutation(({ ctx, input }) => {
            const { ingredients, instructions, ...restInput } = input;
            const totalTime = input.prepTime + input.cookTime + input.chillTime;

            return prisma.recipe.create({
                data: {
                    ...restInput,
                    totalTime,
                    createdById: ctx.session.user.id,
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
        }),
    updateRecipe: protectedProcedure
        .input(updateRecipeInputSchema)
        .mutation(async ({ ctx, input }) => {
            const recipe = await getRecipe(ctx, input.id);

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

            return getRecipe(ctx, input.id);
        })
});
