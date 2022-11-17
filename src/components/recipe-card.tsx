import { RecipeListOutput } from "@/utils/types";
import React from "react";

interface Props {
    recipe: RecipeListOutput;
}

const RecipeCard = (props: Props) => {
    const { recipe } = props;

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-md">
            <a href="#">
                <img className="rounded-t-lg" src={recipe.image || undefined} />
                <div className="p-5">
                    <a href="#">
                        <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                            {recipe.name}
                        </h3>
                        <p className="font-normal text-gray-700">
                            {recipe.description}
                        </p>
                    </a>
                </div>
            </a>
        </div>
    );
};

export default RecipeCard;
