import { FormProvider, useForm } from "react-hook-form";

import { useRouter } from "next/router";

import { CheckIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";

import Button from "@/components/common/button";
import Content from "@/components/content";
import Layout from "@/components/layout";
import GeneralRecipeForm from "@/components/recipe-forms/general-form";
import IngredientsForm from "@/components/recipe-forms/ingredients-form";
import InstructionsForm from "@/components/recipe-forms/instructions-form";
import { trpc } from "@/utils/trpc";
import type { CreateRecipeInputType } from "@/utils/validators";
import { createRecipeInputSchema } from "@/utils/validators";

const NewRecipePage = () => {
    const formMethods = useForm<CreateRecipeInputType>({
        resolver: zodResolver(createRecipeInputSchema),
        defaultValues: {
            name: "Neues Rezept",
            image: null,
            prepTime: 0,
            cookTime: 0,
            chillTime: 0
        }
    });

    const saveRecipeMutation = trpc.recipes.createRecipe.useMutation();
    const router = useRouter();

    const onSubmit = async (data: CreateRecipeInputType) => {
        await saveRecipeMutation.mutateAsync(data, {
            onSuccess: (data) => {
                router.push(`/recipe/${data.id}`);
            }
        });
    };

    return (
        <Layout>
            <Content>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                        <div className="mb-10 flex flex-col justify-between sm:flex-row sm:items-center">
                            <h1 className="mb-4 font-title text-xl sm:mb-0">
                                Neues Rezept
                            </h1>
                            <div>
                                <Button
                                    mode="primary"
                                    type="submit"
                                    icon={CheckIcon}
                                    loading={saveRecipeMutation.isLoading}
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
