import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db/client";

export const ingredientsRouter = router({
    getIngredients: publicProcedure.query(() => {
        return prisma.ingredient.findMany();
    })
});
