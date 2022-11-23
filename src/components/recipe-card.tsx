import type { RecipeListOutput } from "@/utils/types";
import { format } from "date-fns";
import Link from "next/link";
import React from "react";
import { ClockIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface Props {
    recipe: RecipeListOutput;
}

const RecipeCard = (props: Props) => {
    const { recipe } = props;

    return (
        <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
            <Link href={`/recipe/${recipe.id}`} className="flex-shrink-0">
                <div className="relative h-48 w-full">
                    <Image
                        fill
                        className="object-cover"
                        src={recipe.image || ""}
                        alt={recipe.name}
                    />
                </div>
            </Link>

            <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                        {recipe.category.name}
                    </p>

                    <Link href={`/recipe/${recipe.id}`} className="mt-2 block">
                        <p className="text-xl font-semibold text-gray-900">
                            {recipe.name}
                        </p>

                        <p className="mt-3 text-base text-gray-500">
                            {recipe.description}
                        </p>
                    </Link>
                </div>
                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <Image
                            width={40}
                            height={40}
                            alt={recipe.createdBy.name || "Recipe Author Image"}
                            className="h-10 w-10 rounded-full"
                            src={recipe.createdBy.image || ""}
                        />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                            {recipe.createdBy.name}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <ClockIcon className="h-4 w-4" />
                            <time dateTime={recipe.createdAt.toISOString()}>
                                {format(recipe.createdAt, "dd.MM.yyyy")}
                            </time>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
