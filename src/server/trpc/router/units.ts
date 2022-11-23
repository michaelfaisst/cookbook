import { router, publicProcedure, protectedProcedure } from "../trpc";
import { prisma } from "@/server/db/client";
import { createUnitInputSchema } from "@/utils/validators";

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
