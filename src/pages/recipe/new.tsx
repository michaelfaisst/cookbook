import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import TextArea from "@/components/common/textarea";
import Layout from "@/components/layout";
import { createRecipeSchema } from "@/utils/validators";
import type { CreateRecipeType } from "@/utils/validators";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/common/form-error";
import IngredientsForm from "@/components/ingredients-form/form";
import InstructionsForm from "@/components/instructions-form/form";
import { trpc } from "@/utils/trpc";
import Select from "@/components/common/select";
import { Category } from "@prisma/client";
import { useRouter } from "next/router";

const NewRecipePage = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm<CreateRecipeType>({
        resolver: zodResolver(createRecipeSchema),
        defaultValues: {
            name: "Neues Rezept",
            prepTime: 0,
            cookTime: 0,
            chillTime: 0
        }
    });

    const { data: categories } = trpc.categories.getCategories.useQuery();
    const saveRecipeMutation = trpc.recipes.createRecipe.useMutation();

    const router = useRouter();

    const onSubmit = async (data: CreateRecipeType) => {
        await saveRecipeMutation.mutateAsync(data, {
            onSuccess: (data) => {
                router.push(`/recipe/${data.id}`);
            }
        });
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center justify-between">
                    <h1 className="mb-6 text-4xl font-light text-yellow-800">
                        Neues Rezept
                    </h1>
                    <Button type="submit">Speichern</Button>
                </div>

                <div className="flex flex-col gap-6">
                    <div>
                        <Label>Name</Label>
                        <Input
                            error={errors.name?.message}
                            {...register("name")}
                        />
                        <FormError error={errors.name?.message} />
                    </div>

                    <div>
                        <Label>Beschreibung</Label>
                        <TextArea {...register("description")} />
                    </div>

                    <div>
                        <Label>Kategorie</Label>
                        <Controller
                            name="categoryId"
                            control={control}
                            render={({ field }) => (
                                <Select<string, Category>
                                    value={field.value}
                                    onChange={field.onChange}
                                    renderInputValue={(value) => value.name}
                                    renderOption={(value) => value.name}
                                    filter={(query, value) =>
                                        value.name
                                            .toLowerCase()
                                            .includes(query.toLowerCase())
                                    }
                                    keyProp={(value) => value.id}
                                    valueProp={(value) => value.id}
                                    data={categories || []}
                                    error={errors.categoryId?.message}
                                />
                            )}
                        />
                        <FormError error={errors.categoryId?.message} />
                    </div>

                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <Label>Vorbereitungszeit</Label>
                            <div className="flex flex-row items-center gap-2">
                                <Input
                                    type="number"
                                    min="0"
                                    className="w-20"
                                    {...register("prepTime", {
                                        valueAsNumber: true
                                    })}
                                    error={errors.prepTime?.message}
                                />
                                <span className="text-sm text-slate-500">
                                    Minuten
                                </span>
                            </div>
                            <FormError error={errors.prepTime?.message} />
                        </div>

                        <div>
                            <Label>Kochzeit</Label>
                            <div className="flex flex-row items-center gap-2">
                                <Input
                                    type="numer"
                                    min="0"
                                    className="w-20"
                                    {...register("cookTime", {
                                        valueAsNumber: true
                                    })}
                                />
                                <span className="text-sm text-slate-500">
                                    Minuten
                                </span>
                            </div>
                            <FormError error={errors.cookTime?.message} />
                        </div>

                        <div>
                            <Label>Stehzeit</Label>
                            <div className="flex flex-row items-center gap-2">
                                <Input
                                    type="number"
                                    min="0"
                                    className="w-20"
                                    error={errors.chillTime?.message}
                                    {...register("chillTime", {
                                        valueAsNumber: true
                                    })}
                                />
                                <span className="text-sm text-slate-500">
                                    Minuten
                                </span>
                            </div>
                            <FormError error={errors.chillTime?.message} />
                        </div>
                    </div>

                    <IngredientsForm register={register} control={control} />
                    <InstructionsForm register={register} control={control} />
                </div>
            </form>
        </Layout>
    );
};

export default NewRecipePage;
