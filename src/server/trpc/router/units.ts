import { router, publicProcedure } from "../trpc";
import { prisma } from "@/server/db/client";

export const unitsRouter = router({
    getUnits: publicProcedure.query(() => {
        return prisma.unit.findMany();
    })
});
