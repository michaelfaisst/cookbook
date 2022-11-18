import type { AppRouter } from "@/server/trpc/router/_app";
import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";

export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouterInput = inferRouterInputs<AppRouter>;

export type RecipeListOutput = RouterOutput["recipes"]["getRecipes"][0];
export type IngredientListOutput =
    RouterOutput["ingredients"]["getIngredients"][0];
