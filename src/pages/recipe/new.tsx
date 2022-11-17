import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import TextArea from "@/components/common/textarea";
import Layout from "@/components/layout";
import { createRecipeSchema } from "@/utils/validators";
import type { CreateRecipeType } from "@/utils/validators";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const NewRecipePage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CreateRecipeType>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            name: "Neues Rezept"
        }
    });

    const onSubmit = (data: CreateRecipeType) => console.log(data);

    return (
        <Layout>
            <h1 className="mb-6 text-4xl font-light text-yellow-800">
                Neues Rezept
            </h1>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >
                <div>
                    <Label>Name</Label>
                    <Input {...register("name")} />
                </div>

                <div>
                    <Label>Beschreibung</Label>
                    <TextArea {...register("description")} />
                </div>

                <div className="grid grid-cols-3 gap-6">
                    <div>
                        <Label>Vorbereitungszeit</Label>
                        <Input {...register("prepTime")} />
                    </div>

                    <div>
                        <Label>Kochzeit</Label>
                        <Input {...register("cookTime")} />
                    </div>

                    <div>
                        <Label>Stehzeit</Label>
                        <Input {...register("chillTime")} />
                    </div>
                </div>

                <Button type="submit">Speichern</Button>
            </form>
        </Layout>
    );
};

export default NewRecipePage;
