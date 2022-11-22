import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db/client";
import { z } from "zod";
import { createRecipeSchema } from "@/utils/validators";

export const recipesRouter = router({
    getRecipes: publicProcedure.query(() => {
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
    }),
    getRecipe: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(async ({ ctx, input }) => {
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
                editable: result.createdById === ctx.session?.user?.id
            };
        }),
    createRecipe: protectedProcedure
        .input(createRecipeSchema)
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
