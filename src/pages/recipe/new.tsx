import Button from "@/components/common/button";
import Layout from "@/components/layout";
import GeneralRecipeForm from "@/components/recipe-forms/general-form";
import IngredientsForm from "@/components/recipe-forms/ingredients-form";
import InstructionsForm from "@/components/recipe-forms/instructions-form";
import { trpc } from "@/utils/trpc";
import type { CreateRecipeInputType } from "@/utils/validators";
import { createRecipeInputSchema } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { CheckIcon } from "@heroicons/react/24/outline";

const NewRecipePage = () => {
    const formMethods = useForm<CreateRecipeInputType>({
        resolver: zodResolver(createRecipeInputSchema),
        defaultValues: {
            name: "Neues Rezept",
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
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className="mb-10 flex flex-row items-center justify-between">
                        <h1 className="text-2xl font-bold leading-7 text-gray-900">
                            Neues Rezept
                        </h1>
                        <Button mode="primary" type="submit" icon={CheckIcon}>
                            Speichern
                        </Button>
                    </div>

                    <div className="flex w-full max-w-3xl flex-col space-y-8 divide-y divide-gray-200">
                        <GeneralRecipeForm />
                        <IngredientsForm />
                        <InstructionsForm />
                    </div>
                </form>
            </FormProvider>
        </Layout>
    );
};

export default NewRecipePage;
