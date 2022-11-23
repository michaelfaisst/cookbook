import { z } from "zod";

export const createRecipeInputSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    prepTime: z.number().min(0),
    cookTime: z.number().min(0),
    chillTime: z.number().min(0),
    servings: z.number().min(1),
    categoryId: z.string().cuid(),
    ingredients: z.array(
        z.object({
            amount: z.number().min(0).optional(),
            ingredientId: z.string().cuid(),
            unitId: z.string().cuid().optional()
        })
    ),
    instructions: z.array(
        z.object({
            instruction: z.string()
        })
    )
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
