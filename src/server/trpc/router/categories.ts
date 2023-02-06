import { prisma } from "@/server/db/client";

import { publicProcedure, router } from "../trpc";

export const categoriesRouter = router({
    getCategories: publicProcedure.query(() => {
        return prisma.category.findMany();
    })
});
