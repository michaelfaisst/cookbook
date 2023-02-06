import { router } from "../trpc";
import { authRouter } from "./auth";
import { categoriesRouter } from "./categories";
import { ingredientsRouter } from "./ingredients";
import { recipesRouter } from "./recipes";
import { unitsRouter } from "./units";

export const appRouter = router({
    auth: authRouter,
    recipes: recipesRouter,
    ingredients: ingredientsRouter,
    units: unitsRouter,
    categories: categoriesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
