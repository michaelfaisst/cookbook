import { prisma } from "@/server/db/client";
import {
    createRecipeInputSchema,
    getRecipeInputSchema
} from "@/utils/validators";
import type { Context } from "../context";
import type { GetRecipeInputType } from "@/utils/validators";
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

const getRecipe = async (context: Context, input: GetRecipeInputType) => {
    const result = await prisma.recipe.findFirstOrThrow({
        where: {
            id: input.id
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
        .query(({ ctx, input }) => getRecipe(ctx, input)),
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
        })
});
