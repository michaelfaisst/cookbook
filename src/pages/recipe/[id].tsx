import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Content from "@/components/content";
import Layout from "@/components/layout";
import { trpc } from "@/utils/trpc";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const RecipePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: recipe, isLoading } = trpc.recipes.getRecipe.useQuery({
        id: id as string
    });

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
                    <div className="h-96 w-full">
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

                <h2 className="mt-5 mb-2 text-2xl">Zutaten</h2>

                <ul className="list-disc">
                    {recipe.ingredients.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.amount} {ingredient.unit?.name}{" "}
                            {ingredient.ingredient.name}
                        </li>
                    ))}
                </ul>

                <h2 className="mt-5 mb-2 text-2xl">Zubereitung</h2>

                <ol className="list-decimal">
                    {recipe.instructions?.map((step) => (
                        <li key={step.id}>{step.instruction}</li>
                    ))}
                </ol>
            </Content>
        </Layout>
    );
};

export default RecipePage;
