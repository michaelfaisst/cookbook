import Layout from "@/components/layout";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import React from "react";

const RecipePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const {
        data: recipe,
        isLoading,
        isError
    } = trpc.recipes.getRecipe.useQuery({ id: id as string });

    if (!recipe || isLoading) {
        return <Layout>Loading...</Layout>;
    }

    return (
        <Layout>
            {recipe.image && (
                <img className="w-96 rounded-lg" src={recipe.image} />
            )}

            <h1 className="py-5 text-4xl font-light text-yellow-800">
                {recipe.name}
            </h1>
            <p className="mb-2">{recipe.description}</p>

            {recipe.prepTime > 0 && (
                <p>Vorbereitungszeit: {recipe.prepTime} Minuten</p>
            )}

            {recipe.cookTime > 0 && <p>Kochzeit: {recipe.cookTime} Minuten</p>}

            {recipe.chillTime > 0 && (
                <p>Chill time: {recipe.chillTime} Minuten</p>
            )}

            <p>Total time: {recipe.totalTime} minuten</p>

            <h2 className="mt-5 mb-2 text-2xl">Zutaten</h2>

            <ul className="list-disc">
                {recipe.ingridients.map((ingredient) => (
                    <li>
                        {ingredient.amount} {ingredient.unit?.name}{" "}
                        {ingredient.ingredient.name}
                    </li>
                ))}
            </ul>

            <h2 className="mt-5 mb-2 text-2xl">Zubereitung</h2>

            <ol className="list-decimal">
                {recipe.instructions?.map((step) => (
                    <li>{step.instruction}</li>
                ))}
            </ol>
        </Layout>
    );
};

export default RecipePage;
