import Button from "@/components/common/button";
import Loading from "@/components/common/loading";
import Layout from "@/components/layout";
import GeneralRecipeForm from "@/components/recipe-forms/general-form";
import IngredientsForm from "@/components/recipe-forms/ingredients-form";
import InstructionsForm from "@/components/recipe-forms/instructions-form";
import { trpc } from "@/utils/trpc";
import type { CreateRecipeInputType } from "@/utils/validators";
import { createRecipeInputSchema } from "@/utils/validators";
import { CheckIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

const NewRecipePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: recipe, isLoading } = trpc.recipes.getRecipe.useQuery({
        id: id as string
    });

    const formMethods = useForm<CreateRecipeInputType>({
        resolver: zodResolver(createRecipeInputSchema),
        values: recipe ? (recipe as CreateRecipeInputType) : undefined
    });

    const recipeTitle = formMethods.watch("name");

    const onSubmit = async (data: CreateRecipeInputType) => {
        console.log(data);
    };

    if (!recipe || isLoading) {
        return (
            <Layout>
                <Loading className="flex h-full flex-1 items-center justify-center bg-gray-50" />
            </Layout>
        );
    }

    console.log(recipe);

    return (
        <Layout>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className="mb-10 flex flex-row items-center justify-between">
                        <h1 className="text-2xl font-bold leading-7 text-gray-900">
                            {recipeTitle}
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
