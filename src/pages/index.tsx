import Layout from "@/components/layout";
import { trpc } from "@/utils/trpc";
import { type NextPage } from "next";

const Home: NextPage = () => {
    const { data } = trpc.recipes.getRecipes.useQuery();

    return <Layout>Hallo Manuela!</Layout>;
};

export default Home;
