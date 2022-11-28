import type { RecipeIngredient } from "@/utils/types";
import { Fragment, useState } from "react";

interface Props {
    servings: number;
    ingredients: RecipeIngredient[];
}

const IngredientsView = ({ servings, ingredients }: Props) => {
    const [currServings, setCurrServings] = useState(servings);

    const getIngredientDisplayString = (recipe: RecipeIngredient) => {
        const parts = [
            recipe.amount,
            recipe.unit?.name,
            recipe.ingredient.name
        ].filter((x) => x);

        return parts.join(" ");
    };

    return (
        <Fragment>
            <h2 className="mb-4 text-2xl">Zutaten</h2>

            <div className="mb-4">{currServings} Personen</div>

            <fieldset className="space-y-3">
                {ingredients.map((ingredient) => (
                    <div
                        className="relative flex items-start"
                        key={ingredient.id}
                    >
                        <div className="flex h-5 items-center">
                            <input
                                id={ingredient.id}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor={ingredient.id}>
                                {getIngredientDisplayString(ingredient)}
                            </label>
                        </div>
                    </div>
                ))}
            </fieldset>
        </Fragment>
    );
};

export default IngredientsView;
