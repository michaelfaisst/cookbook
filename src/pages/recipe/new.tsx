import Button from "@/components/common/button";
import Input from "@/components/common/input";
import Label from "@/components/common/label";
import TextArea from "@/components/common/textarea";
import Layout from "@/components/layout";
import { createRecipeSchema } from "@/utils/validators";
import type { CreateRecipeType } from "@/utils/validators";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "@/components/common/form-error";
import IngridientsForm from "@/components/ingridients-form/form";

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

    console.log(errors);

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
                    <Input error={errors.name?.message} {...register("name")} />
                    <FormError error={errors.name?.message} />
                </div>

                <div>
                    <Label>Beschreibung</Label>
                    <TextArea {...register("description")} />
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

                <IngridientsForm register={register} control={control} />

                <Button type="submit">Speichern</Button>
            </form>
        </Layout>
    );
};

export default NewRecipePage;
