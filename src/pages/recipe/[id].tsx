import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Content from "@/components/content";
import Layout from "@/components/layout";
import IngredientsView from "@/components/recipe-views/ingredients";
import InstructionsView from "@/components/recipe-views/instructions";
import { trpc } from "@/utils/trpc";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const RecipePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: recipe, isLoading } = trpc.recipes.getRecipe.useQuery({
        id: id as string
    });

    const deleteRecipeMutation = trpc.recipes.deleteRecipe.useMutation();
    const trpcHelper = trpc.useContext();

    const deleteRecipe = async () => {
        await deleteRecipeMutation.mutateAsync(
            { id: id as string },
            {
                onSuccess: () => {
                    trpcHelper.recipes.getRecipes.invalidate();
                    router.push("/");
                }
            }
        );
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
            <div aria-hidden="true" className="relative">
                <div className="h-64 w-full">
                    <Image
                        src={recipe.image || "/images/placeholder.png"}
                        fill
                        alt={recipe.name}
                        className="object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50"></div>
            </div>
            <Content className="-mt-12">
                <div className="flex flex-col items-start justify-between py-5 sm:flex-row sm:items-center">
                    <h2 className="mb-4 text-3xl font-bold leading-7 text-gray-900 sm:mb-0">
                        {recipe.name}
                    </h2>
                    {recipe.editable && (
                        <div className="flex flex-row gap-4">
                            <Button
                                icon={TrashIcon}
                                onClick={deleteRecipe}
                                loading={deleteRecipeMutation.isLoading}
                            >
                                Löschen
                            </Button>
                            <Button
                                icon={PencilIcon}
                                mode="primary"
                                onClick={() =>
                                    router.push(`/recipe/${id}/edit`)
                                }
                            >
                                Editieren
                            </Button>
                        </div>
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
                    <IngredientsView
                        servings={recipe.servings}
                        ingredients={recipe.ingredients}
                    />
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    <InstructionsView instructions={recipe.instructions} />
                </div>
            </Content>
        </Layout>
    );
};

export default RecipePage;
