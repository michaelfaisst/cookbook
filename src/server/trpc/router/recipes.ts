import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db/client";

export const recipesRouter = router({
    getRecipes: publicProcedure.query(({ ctx }) => {
        return prisma.recipe.findMany();
    })
});
