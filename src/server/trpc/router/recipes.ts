import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db/client";
import { z } from "zod";

export const recipesRouter = router({
    getRecipes: publicProcedure.query(() => {
        return prisma.recipe.findMany();
    }),
    getRecipe: publicProcedure
        .input(z.object({ id: z.string() }))
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
                    }
                }
            });
        })
});
