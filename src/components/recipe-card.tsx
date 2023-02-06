import type { RecipeListOutput } from "@/utils/types";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface Props {
    recipe: RecipeListOutput;
}

const RecipeCard = (props: Props) => {
    const { recipe } = props;

    return (
        <div className="flex flex-col rounded-lg">
            <Link href={`/recipe/${recipe.id}`} className="mb-3 flex-shrink-0">
                <div className="relative h-96 w-full overflow-hidden rounded-lg">
                    <Image
                        fill
                        className="rounded-lg object-cover transition-transform hover:scale-105"
                        src={recipe.image || "/images/placeholder.png"}
                        alt={recipe.name}
                    />
                </div>
            </Link>
            <span className="mb-1.5 text-sm text-rose-500">
                {recipe.category.name}
            </span>
            <h2 className="mb-1.5 font-title text-lg">{recipe.name}</h2>
            <div className="flex items-center text-sm">
                <span className="mr-1 text-slate-500">Erstellt von:</span>
                <span>{recipe.createdBy.name}</span>
            </div>
        </div>
    );
};

export default RecipeCard;
