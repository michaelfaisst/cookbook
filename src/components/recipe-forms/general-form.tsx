import { trpc } from "@/utils/trpc";
import { CreateRecipeType } from "@/utils/validators";
import { Category } from "@prisma/client";
import React, { Fragment } from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormError from "../common/form-error";
import Input from "../common/input";
import Label from "../common/label";
import Select from "../common/select";
import TextArea from "../common/textarea";

const GeneralRecipeForm = () => {
    const {
        register,
        formState: { errors },
        control
    } = useFormContext<CreateRecipeType>();

    const { data: categories } = trpc.categories.getCategories.useQuery();

    return (
        <Fragment>
            <div>
                <Label>Name</Label>
                <Input error={errors.name?.message} {...register("name")} />
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
                        <span className="text-sm text-slate-500">Minuten</span>
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
                        <span className="text-sm text-slate-500">Minuten</span>
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
                        <span className="text-sm text-slate-500">Minuten</span>
                    </div>
                    <FormError error={errors.chillTime?.message} />
                </div>
            </div>
        </Fragment>
    );
};

export default GeneralRecipeForm;