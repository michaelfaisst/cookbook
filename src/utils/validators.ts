import { z } from "zod";

export const createRecipeInputSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable().optional(),
    prepTime: z.number().min(0),
    cookTime: z.number().min(0),
    chillTime: z.number().min(0),
    servings: z.number().min(1),
    categoryId: z.string().cuid(),
    ingredients: z.array(
        z.object({
            id: z.string().cuid().nullable().optional(),
            amount: z.number().min(0).nullable().optional(),
            ingredientId: z.string().cuid(),
            unitId: z.string().cuid().nullable().optional()
        })
    ),
    instructions: z.array(
        z.object({
            id: z.string().cuid().nullable().optional(),
            instruction: z.string()
        })
    )
});

export const updateRecipeInputSchema = createRecipeInputSchema.extend({
    id: z.string().cuid()
});

export const getRecipeInputSchema = z.object({
    id: z.string().min(1)
});

export const createUnitInputSchema = z.object({
    name: z.string().min(1)
});

export const createIngredientInputSchema = z.object({
    name: z.string().min(1)
});

export type CreateRecipeInputType = z.infer<typeof createRecipeInputSchema>;
export type CreateUnitInputType = z.infer<typeof createUnitInputSchema>;
export type CreateIngredientInputType = z.infer<
    typeof createIngredientInputSchema
>;
export type GetRecipeInputType = z.infer<typeof getRecipeInputSchema>;
export type UpdateRecipeInputType = z.infer<typeof updateRecipeInputSchema>;
