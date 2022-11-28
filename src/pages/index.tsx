import Button from "@/components/common/button";
import Layout from "@/components/layout";
import RecipeCard from "@/components/recipe-card";
import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { PlusIcon } from "@heroicons/react/24/outline";
import Content from "@/components/content";

const Home: NextPage = () => {
    const { data: session } = useSession();

    const { data } = trpc.recipes.getRecipes.useQuery();
    const router = useRouter();

    return (
        <Layout>
            <Content>
                <div className="mb-10 flex flex-col sm:flex-row">
                    <div className="mb-4 flex-1 sm:mb-0">
                        <h1 className="text-3xl font-bold leading-7 text-gray-900">
                            Manuelas Rezepte
                        </h1>
                    </div>

                    {session && (
                        <div className="flex">
                            <Button
                                mode="primary"
                                onClick={() => router.push("/recipe/new")}
                                icon={PlusIcon}
                            >
                                Neues Rezept
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                    {data?.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </Content>
        </Layout>
    );
};

export default Home;
