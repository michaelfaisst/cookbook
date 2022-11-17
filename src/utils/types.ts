import { AppRouter } from "@/server/trpc/router/_app";
import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;
type RouterInput = inferRouterInputs<AppRouter>;

export type RecipeListOutput = RouterOutput["recipes"]["getRecipes"][0];
