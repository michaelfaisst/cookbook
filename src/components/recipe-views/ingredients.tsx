import { Fragment, useState } from "react";

import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { round } from "lodash";

import type { RecipeIngredient } from "@/utils/types";

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
            <h2 className="mb-4 font-title text-xl">Zutaten</h2>

            <div className="mb-6 flex flex-row gap-4">
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
                                className="h-4 w-4 rounded-full border-slate-300 text-rose-300 focus:outline-none focus:ring-transparent"
                            />
                        </div>
                        <div className="ml-3">
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
