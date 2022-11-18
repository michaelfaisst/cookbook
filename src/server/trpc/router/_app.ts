import { router } from "../trpc";
import { authRouter } from "./auth";
import { recipesRouter } from "./recipes";
import { ingredientsRouter } from "./ingredients";
import { unitsRouter } from "./units";
import { categoriesRouter } from "./categories";

export const appRouter = router({
    auth: authRouter,
    recipes: recipesRouter,
    ingredients: ingredientsRouter,
    units: unitsRouter,
    categories: categoriesRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
