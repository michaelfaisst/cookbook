import { z } from "zod";

export const createRecipeSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    prepTime: z.number().min(0),
    cookTime: z.number().min(0),
    chillTime: z.number().min(0),
    servings: z.number().min(1),
    categoryId: z.string().cuid(),
    ingredients: z.array(
        z.object({
            amount: z.number().min(1).optional(),
            ingridientId: z.string().cuid(),
            unitId: z.string().cuid().optional()
        })
    )
});

export type CreateRecipeType = z.infer<typeof createRecipeSchema>;
