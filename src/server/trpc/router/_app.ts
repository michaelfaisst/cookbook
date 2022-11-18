import { router } from "../trpc";
import { authRouter } from "./auth";
import { recipesRouter } from "./recipes";
import { ingredientsRouter } from "./ingredients";
import { unitsRouter } from "./units";

export const appRouter = router({
    auth: authRouter,
    recipes: recipesRouter,
    ingredients: ingredientsRouter,
    units: unitsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
