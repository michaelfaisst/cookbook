import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db/client";

export const categoriesRouter = router({
    getCategories: publicProcedure.query(() => {
        return prisma.category.findMany();
    })
});
