import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { PlusIcon } from "@heroicons/react/24/outline";

import Button from "@/components/common/button";
import Content from "@/components/content";
import Layout from "@/components/layout";
import RecipeCard from "@/components/recipe-card";
import { trpc } from "@/utils/trpc";

const Home: NextPage = () => {
    const { data: session } = useSession();

    const { data } = trpc.recipes.getRecipes.useQuery();
    const router = useRouter();

    return (
        <Layout>
            <Content>
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center">
                    <div className="flex-1 sm:mb-0">
                        <h1 className="font-title text-xl text-slate-900">
                            Neueste Rezepte
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

                <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                    {data?.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            </Content>
        </Layout>
    );
};

export default Home;
