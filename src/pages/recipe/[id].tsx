import React from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";

import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Content from "@/components/content";
import Layout from "@/components/layout";
import IngredientsView from "@/components/recipe-views/ingredients";
import InstructionsView from "@/components/recipe-views/instructions";
import { trpc } from "@/utils/trpc";

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
                },
                onError: (e) => {
                    console.error(e);
                }
            }
        );
    };

    if (!recipe || isLoading) {
        return (
            <Layout>
                <Content>
                    <Loading className="flex h-full flex-1 items-center justify-center" />
                </Content>
            </Layout>
        );
    }

    return (
        <Layout>
            <Content>
                <div className="mb-8 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                    <h2 className="mb-4 font-title text-xl sm:mb-0">
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

                <div className="flex flex-col sm:grid w-full sm:grid-cols-[1fr_400px] sm:items-start gap-4">
                    <div className="relative h-[24rem] w-full">
                        <Image
                            src={recipe.image || "/images/placeholder.png"}
                            fill
                            alt={recipe.name}
                            className="h-full w-full rounded-lg object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <div className="border-y border-y-slate-200 py-4">
                            <div className="mb-4 flex flex-row justify-between">
                                <div className="text-slate-500">Kategorie</div>
                                <div>{recipe.category.name}</div>
                            </div>

                            {recipe.prepTime > 0 && (
                                <div className="flex flex-row justify-between">
                                    <div className="text-slate-500">
                                        Vorbereitungszeit
                                    </div>
                                    <div>{recipe.prepTime} Minuten</div>
                                </div>
                            )}

                            {recipe.cookTime > 0 && (
                                <div className="flex flex-row justify-between">
                                    <div className="font-extralight text-slate-500">
                                        Kochzeit
                                    </div>
                                    <div>{recipe.cookTime} Minuten</div>
                                </div>
                            )}

                            {recipe.chillTime > 0 && (
                                <div className="flex flex-row justify-between">
                                    <div className="font-thin text-slate-500">
                                        Stehzeit
                                    </div>
                                    <div>{recipe.chillTime} Minuten</div>
                                </div>
                            )}
                        </div>

                        <div className="mb-4 sm:mb-0 sm:mt-4 flex flex-row items-center gap-4 order-first sm:order-none">
                            <Image
                                width={40}
                                height={40}
                                className="h-10 w-10 rounded-full"
                                alt={
                                    recipe.createdBy.name ||
                                    "Recipe Author Image"
                                }
                                src={
                                    recipe.createdBy.image ||
                                    "/images/placeholder.png"
                                }
                            />
                            <div>
                                <div className="text-sm text-slate-500">
                                    Erstellt am{" "}
                                    {format(recipe.createdAt, "dd.MM.yyyy")} von
                                </div>
                                <div>{recipe.createdBy.name}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="mt-4 mb-12">{recipe.description}</p>

                <div className="mb-12">
                    <IngredientsView
                        servings={recipe.servings}
                        ingredients={recipe.ingredients}
                    />
                </div>

                <div className="mb-8">
                    <InstructionsView instructions={recipe.instructions} />
                </div>
            </Content>
        </Layout>
    );
};

export default RecipePage;
