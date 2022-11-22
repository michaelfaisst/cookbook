import Button from "@/components/common/button";
import Layout from "@/components/layout";
import GeneralRecipeForm from "@/components/recipe-forms/general-form";
import IngredientsForm from "@/components/recipe-forms/ingredients-form";
import InstructionsForm from "@/components/recipe-forms/instructions-form";
import { trpc } from "@/utils/trpc";
import type { CreateRecipeType } from "@/utils/validators";
import { createRecipeSchema } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";

const NewRecipePage = () => {
    const router = useRouter();
    const { id } = router.query;

    const { data: recipe } = trpc.recipes.getRecipe.useQuery({
        id: id as string
    });

    const formMethods = useForm<CreateRecipeType>({
        resolver: zodResolver(createRecipeSchema),
        values: recipe ? (recipe as CreateRecipeType) : undefined
    });

    const recipeTitle = formMethods.watch("name");

    const onSubmit = async (data: CreateRecipeType) => {
        console.log(data);
    };

    return (
        <Layout>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    <div className="flex flex-row items-center justify-between">
                        <h1 className="mb-6 text-4xl font-light text-yellow-800">
                            {recipeTitle}
                        </h1>
                        <Button type="submit">Speichern</Button>
                    </div>

                    <div className="flex flex-col gap-6">
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
