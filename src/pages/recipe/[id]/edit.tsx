import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useRouter } from "next/router";

import { CheckIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Notification from "@/components/common/notification";
import Content from "@/components/content";
import Layout from "@/components/layout";
import GeneralRecipeForm from "@/components/recipe-forms/general-form";
import IngredientsForm from "@/components/recipe-forms/ingredients-form";
import InstructionsForm from "@/components/recipe-forms/instructions-form";
import { trpc } from "@/utils/trpc";
import type { UpdateRecipeInputType } from "@/utils/validators";
import { createRecipeInputSchema } from "@/utils/validators";

const NewRecipePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: recipe, isLoading } = trpc.recipes.getRecipe.useQuery(
        {
            id: id as string
        },
        {
            onError: (error) => {
                console.error(error);
            }
        }
    );

    const formMethods = useForm<UpdateRecipeInputType>({
        resolver: zodResolver(createRecipeInputSchema),
        values: recipe ? (recipe as UpdateRecipeInputType) : undefined
    });

    const recipeTitle = formMethods.watch("name");
    const updateRecipeMutation = trpc.recipes.updateRecipe.useMutation();
    const trcpContext = trpc.useContext();

    const onSubmit = async (data: UpdateRecipeInputType) => {
        if (!recipe) {
            return;
        }

        await updateRecipeMutation.mutateAsync(
            {
                ...data,
                id: recipe.id
            },
            {
                onSuccess: (data) => {
                    trcpContext.recipes.getRecipe.setData(data, {
                        ...data
                    });
                    trcpContext.recipes.getRecipes.invalidate();
                    toast.custom((t) => (
                        <Notification
                            visible={t.visible}
                            type="success"
                            title="Rezept gespeichert"
                            description={`Dein Rezept "${data.name}" wurde erfolgreich gespeichert!`}
                        />
                    ));
                },
                onError: (e) => {
                    console.error(e);
                    toast.custom((t) => (
                        <Notification
                            visible={t.visible}
                            type="error"
                            title="Error"
                            description={e.message}
                        />
                    ));
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
            <Content>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div className="mb-10 flex flex-col justify-between sm:flex-row sm:items-center">
                            <h1 className="mb-4 font-title text-xl sm:mb-0">
                                {recipeTitle}
                            </h1>
                            <div>
                                <Button
                                    loading={updateRecipeMutation.isLoading}
                                    mode="primary"
                                    type="submit"
                                    icon={CheckIcon}
                                >
                                    Speichern
                                </Button>
                            </div>
                        </div>

                        <div className="flex w-full max-w-3xl flex-col space-y-12">
                            <div>
                                <GeneralRecipeForm />
                            </div>
                            <div>
                                <IngredientsForm />
                            </div>
                            <div>
                                <InstructionsForm />
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </Content>
        </Layout>
    );
};

export default NewRecipePage;
