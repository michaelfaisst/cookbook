import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db/client";
import { createUnitSchema } from "@/utils/validators";

export const unitsRouter = router({
    getUnits: publicProcedure.query(() => {
        return prisma.unit.findMany();
    }),
    createUnit: protectedProcedure
        .input(createUnitSchema)
        .mutation(({ input }) => {
            return prisma.unit.create({
                data: {
                    name: input.name
                }
            });
        })
});
