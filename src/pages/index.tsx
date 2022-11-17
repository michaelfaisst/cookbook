import Layout from "@/components/layout";
import RecipeCard from "@/components/recipe-card";
import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";

const Home: NextPage = () => {
    const { data } = trpc.recipes.getRecipes.useQuery();

    return (
        <Layout>
            <h1 className="py-5 text-4xl font-light text-yellow-800">
                Manuelas Rezepte
            </h1>

            <div className="grid grid-cols-4">
                {data?.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </Layout>
    );
};

export default Home;
