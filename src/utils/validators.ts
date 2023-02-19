import { z } from "zod";

export const createRecipeInputSchema = z.object({
    name: z.string().min(1),
    description: z.string().nullable(),
    prepTime: z.number().min(0),
    cookTime: z.number().min(0),
    chillTime: z.number().min(0),
    servings: z.number().min(1),
    categoryId: z.string().cuid(),
    image: z.string().nullable(),
    ingredients: z.array(
        z.object({
            id: z.string().cuid().optional(),
            amount: z.number().min(0).nullable(),
            ingredientId: z.string().cuid(),
            unitId: z.string().cuid().nullable()
        })
    ),
    instructions: z.array(
        z.object({
            id: z.string().cuid().optional(),
            instruction: z.string()
        })
    )
});

export const updateRecipeInputSchema = createRecipeInputSchema.extend({
    id: z.string().cuid()
});

export const getRecipeInputSchema = z.object({
    id: z.string().cuid()
});

export const searchRecipesInputSchema = z.object({
    search: z.string()
});

export const createUnitInputSchema = z.object({
    name: z.string().min(1)
});

export const createIngredientInputSchema = z.object({
    name: z.string().min(1)
});

export const deleteRecipeInputSchema = z.object({
    id: z.string().cuid()
});

export type CreateRecipeInputType = z.infer<typeof createRecipeInputSchema>;
export type CreateUnitInputType = z.infer<typeof createUnitInputSchema>;
export type CreateIngredientInputType = z.infer<
    typeof createIngredientInputSchema
>;
export type GetRecipeInputType = z.infer<typeof getRecipeInputSchema>;
export type UpdateRecipeInputType = z.infer<typeof updateRecipeInputSchema>;
export type DeleteRecipeInputType = z.infer<typeof deleteRecipeInputSchema>;
