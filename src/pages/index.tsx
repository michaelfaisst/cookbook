import Layout from "@/components/layout";
import RecipeCard from "@/components/recipe-card";
import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const { data } = trpc.recipes.getRecipes.useQuery();
    const router = useRouter();

    return (
        <Layout>
            <div className="flex flex-row items-center justify-between py-5">
                <h1 className="text-4xl font-light text-yellow-800">
                    Manuelas Rezepte
                </h1>
                <button
                    className="rounded-lg bg-yellow-800 px-5 py-2.5 text-sm font-medium text-white"
                    onClick={() => router.push("/recipe/new")}
                >
                    Neues Rezept
                </button>
            </div>

            <div className="grid grid-cols-4">
                {data?.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
            </div>
        </Layout>
    );
};

export default Home;
