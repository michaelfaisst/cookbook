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
                    ingridients: {
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
            const totalTime =
                (input.prepTime || 0) +
                (input.cookTime || 0) +
                (input.chillTime || 0);

            return prisma.recipe.create({
                data: {
                    ...input,
                    totalTime,
                    createdById: ctx.session.user.id
                }
            });
        })
});
