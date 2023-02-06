import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/server/trpc/router/_app";

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;

export type RecipeListOutput = RouterOutput["recipes"]["getRecipes"][0];
export type RecipeIngredient =
    RouterOutput["recipes"]["getRecipe"]["ingredients"][0];
export type RecipeInstruction =
    RouterOutput["recipes"]["getRecipe"]["instructions"][0];
