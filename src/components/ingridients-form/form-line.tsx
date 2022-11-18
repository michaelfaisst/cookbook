import { CreateRecipeType } from "@/utils/validators";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Ingredient, Unit } from "@prisma/client";
import React from "react";
import {
    Controller,
    Control,
    UseFormRegister,
    UseFieldArrayRemove
} from "react-hook-form";
import Input from "../common/input";
import Select from "../common/select";

interface Props {
    index: number;
    control: Control<CreateRecipeType, any>;
    register: UseFormRegister<CreateRecipeType>;
    remove: UseFieldArrayRemove;
    ingredients?: Ingredient[];
    units?: Unit[];
}

const IngridientsFormLine = (props: Props) => {
    const { index, control, ingredients, units, register, remove } = props;

    return (
        <>
            <div
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300"
                onClick={() => remove(index)}
            >
                <TrashIcon className="h-4 w-4" />
            </div>

            <Input
                type="number"
                min="0"
                {...register(`ingredients.${index}.amount`, {
                    setValueAs: (value) => {
                        const num = parseFloat(value);
                        return isNaN(num) ? undefined : num;
                    }
                })}
            />

            <Controller
                name={`ingredients.${index}.unitId`}
                control={control}
                render={({ field }) => (
                    <Select<string, Unit>
                        value={field.value}
                        onChange={field.onChange}
                        data={units || []}
                        renderInputValue={(value) => value.name}
                        renderOption={(value) => value.name}
                        filter={(query, value) =>
                            value.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                        }
                        keyProp={(value) => value.id}
                        valueProp={(value) => value.id}
                    />
                )}
            />

            <Controller
                name={`ingredients.${index}.ingridientId`}
                control={control}
                render={({ field }) => (
                    <Select<string, Ingredient>
                        value={field.value}
                        onChange={field.onChange}
                        data={ingredients || []}
                        renderInputValue={(value) => value.name}
                        renderOption={(value) => value.name}
                        filter={(query, value) =>
                            value.name
                                .toLowerCase()
                                .includes(query.toLowerCase())
                        }
                        keyProp={(value) => value.id}
                        valueProp={(value) => value.id}
                    />
                )}
            />
        </>
    );
};

export default IngridientsFormLine;
