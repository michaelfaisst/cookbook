import Button from "@/components/common/button";
import Layout from "@/components/layout";
import RecipeCard from "@/components/recipe-card";
import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
    const { data: session } = useSession();

    const { data } = trpc.recipes.getRecipes.useQuery();
    const router = useRouter();

    return (
        <Layout>
            <div className="mb-10 flex items-center justify-between">
                <div className="flex-1">
                    <h1 className="text-2xl font-bold leading-7 text-gray-900">
                        Manuelas Rezepte
                    </h1>
                </div>

                {session && (
                    <div className="flex">
                        <Button
                            mode="primary"
                            onClick={() => router.push("/recipe/new")}
                        >
                            Neues Rezept
                        </Button>
                    </div>
                )}
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
