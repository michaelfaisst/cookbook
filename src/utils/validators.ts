import { z } from "zod";

export const createRecipeSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    prepTime: z.number().min(0).optional(),
    cookTime: z.number().min(0).optional(),
    chillTime: z.number().min(0).optional(),
    servings: z.number().min(1),
    categoryId: z.string().cuid()
});

export type CreateRecipeType = z.infer<typeof createRecipeSchema>;
