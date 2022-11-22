import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db/client";
import { createIngredientSchema } from "@/utils/validators";

export const ingredientsRouter = router({
    getIngredients: publicProcedure.query(() => {
        return prisma.ingredient.findMany();
    }),
    createIngredient: protectedProcedure
        .input(createIngredientSchema)
        .mutation(({ input }) => {
            return prisma.ingredient.create({
                data: {
                    name: input.name
                }
            });
        })
});
