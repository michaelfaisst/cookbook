import { Controller, useFormContext } from "react-hook-form";

import type { Category } from "@prisma/client";

import { trpc } from "@/utils/trpc";
import type { CreateRecipeInputType } from "@/utils/validators";

import FormError from "../common/form-error";
import ImageUpload from "../common/image-upload";
import Input from "../common/input";
import Label from "../common/label";
import Select from "../common/select";
import TextArea from "../common/textarea";

const GeneralRecipeForm = () => {
    const {
        register,
        formState: { errors },
        control
    } = useFormContext<CreateRecipeInputType>();

    const { data: categories } = trpc.categories.getCategories.useQuery();

    return (
        <>
            <div className="mb-8">
                <h3 className="text-lg font-title">Allgemeine Information</h3>
                <p className="mt-1 text-sm text-slate-500">
                    Hier kannst du allgemeine Informationen zu deinem Rezept
                    angeben
                </p>
            </div>
            <div className="mb-6">
                <Label>Name</Label>
                <Input error={errors.name?.message} {...register("name")} />
                <FormError error={errors.name?.message} />
            </div>

            <div className="mb-6">
                <Label>Beschreibung</Label>
                <TextArea {...register("description")} />
            </div>

            <div className="mb-6">
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

            <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
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

            <div>
                <Label>Bild</Label>
                <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                        <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                ></Controller>
            </div>
        </>
    );
};

export default GeneralRecipeForm;
