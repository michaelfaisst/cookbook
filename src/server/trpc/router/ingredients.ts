import { prisma } from "@/server/db/client";
import { createIngredientInputSchema } from "@/utils/validators";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const ingredientsRouter = router({
    getIngredients: publicProcedure.query(() => {
        return prisma.ingredient.findMany();
    }),
    createIngredient: protectedProcedure
        .input(createIngredientInputSchema)
        .mutation(({ input }) => {
            return prisma.ingredient.create({
                data: {
                    name: input.name
                }
            });
        })
});
