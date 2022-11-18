import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db/client";
import { z } from "zod";
import { createRecipeSchema } from "@/utils/validators";

export const recipesRouter = router({
    getRecipes: publicProcedure.query(() => {
        return prisma.recipe.findMany();
    }),
    getRecipe: publicProcedure
        .input(z.object({ id: z.string().cuid() }))
        .query(({ input }) => {
            return prisma.recipe.findFirstOrThrow({
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
