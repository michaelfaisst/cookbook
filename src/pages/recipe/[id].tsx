import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Content from "@/components/content";
import Layout from "@/components/layout";
import { trpc } from "@/utils/trpc";
import { RecipeIngredient } from "@/utils/types";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const RecipePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: recipe, isLoading } = trpc.recipes.getRecipe.useQuery({
        id: id as string
    });

    const getIngredientDisplayString = (recipe: RecipeIngredient) => {
        const parts = [
            recipe.amount,
            recipe.unit?.name,
            recipe.ingredient.name
        ].filter((x) => x);

        return parts.join(" ");
    };

    if (!recipe || isLoading) {
        return (
            <Layout>
                <Content>
                    <Loading className="flex h-full flex-1 items-center justify-center bg-gray-50" />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout>
            {recipe.image && (
                <div aria-hidden="true" className="relative">
                    <div className="h-64 w-full">
                        <Image
                            src={recipe.image}
                            fill
                            alt={recipe.name}
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50"></div>
                </div>
            )}
            <Content className="-mt-12">
                <div className="flex flex-row items-center justify-between py-5">
                    <h2 className="text-3xl font-bold leading-7 text-gray-900">
                        {recipe.name}
                    </h2>
                    {recipe.editable && (
                        <Button
                            mode="primary"
                            onClick={() => router.push(`/recipe/${id}/edit`)}
                        >
                            Editieren
                        </Button>
                    )}
                </div>
                <p className="mb-2">{recipe.description}</p>

                {recipe.prepTime > 0 && (
                    <p>Vorbereitungszeit: {recipe.prepTime} Minuten</p>
                )}

                {recipe.cookTime > 0 && (
                    <p>Kochzeit: {recipe.cookTime} Minuten</p>
                )}

                {recipe.chillTime > 0 && (
                    <p>Chill time: {recipe.chillTime} Minuten</p>
                )}

                <p>Total time: {recipe.totalTime} minuten</p>

                <div className="mb-4" />

                <div className="mb-4 rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-2xl">Zutaten</h2>

                    <fieldset className="space-y-3">
                        {recipe.ingredients.map((ingredient) => (
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
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <h2 className="mb-4 text-2xl">Zubereitung</h2>

                    <ol role="list" className="overflow-hidden">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={instruction.id} className="relative pb-6">
                                {index < recipe.instructions.length - 1 && (
                                    <div
                                        className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-200"
                                        aria-hidden="true"
                                    />
                                )}

                                <div className="group relative flex items-start">
                                    <span className="flex h-9 items-center">
                                        <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white"></span>
                                    </span>
                                    <span className="ml-4 mt-2.5 flex min-w-0 flex-col">
                                        <span className="mb-2 text-xs font-medium text-indigo-500">
                                            Schritt {index + 1}
                                        </span>
                                        <span>{instruction.instruction}</span>
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </Content>
        </Layout>
    );
};

export default RecipePage;
