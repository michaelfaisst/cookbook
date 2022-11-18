import { router } from "../trpc";
import { authRouter } from "./auth";
import { recipesRouter } from "./recipes";
import { ingredientsRouter } from "./ingredients";

export const appRouter = router({
    auth: authRouter,
    recipes: recipesRouter,
    ingredients: ingredientsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
