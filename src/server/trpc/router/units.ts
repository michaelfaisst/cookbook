import { prisma } from "@/server/db/client";
import { createUnitInputSchema } from "@/utils/validators";

import { protectedProcedure, publicProcedure, router } from "../trpc";

export const unitsRouter = router({
    getUnits: publicProcedure.query(() => {
        return prisma.unit.findMany();
    }),
    createUnit: protectedProcedure
        .input(createUnitInputSchema)
        .mutation(({ input }) => {
            return prisma.unit.create({
                data: {
                    name: input.name
                }
            });
        })
});
