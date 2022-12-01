import type { RecipeIngredient } from "@/utils/types";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { round } from "lodash";
import { Fragment, useState } from "react";
import IconButton from "../common/icon-button";

interface Props {
    servings: number;
    ingredients: RecipeIngredient[];
}

const IngredientsView = ({ servings, ingredients }: Props) => {
    const [currServings, setCurrServings] = useState(servings);

    const getIngredientDisplayString = (recipe: RecipeIngredient) => {
        const amount =
            recipe.amount &&
            round((recipe.amount / servings) * currServings, 2);

        const parts = [
            amount,
            recipe.unit?.name,
            recipe.ingredient.name
        ].filter((x) => x);

        return parts.join(" ");
    };

    return (
        <Fragment>
            <h2 className="mb-4 text-2xl">Zutaten</h2>

            <div className="mb-4 flex flex-row gap-4">
                <IconButton
                    icon={MinusIcon}
                    onClick={() =>
                        setCurrServings((curr) => Math.max(curr - 1, 1))
                    }
                />
                <div>{currServings} Personen</div>
                <IconButton
                    icon={PlusIcon}
                    onClick={() =>
                        setCurrServings((curr) => Math.min(curr + 1, 20))
                    }
                />
            </div>

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
