import type { CreateRecipeInputType } from "@/utils/validators";
import { TrashIcon } from "@heroicons/react/24/outline";
import type { Ingredient, Unit } from "@prisma/client";
import type { UseFieldArrayRemove } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import FormError from "../common/form-error";
import Input from "../common/input";
import Label from "../common/label";
import Select from "../common/select";

interface Props {
    index: number;
    remove: UseFieldArrayRemove;
    ingredients?: Ingredient[];
    units?: Unit[];
}

const IngredientsFormLine = (props: Props) => {
    const { index, ingredients, units, remove } = props;

    const {
        control,
        register,
        formState: { errors }
    } = useFormContext<CreateRecipeInputType>();

    const renderAmount = () => {
        return (
            <div className="mb-3 mt-3 lg:m-0">
                <Label className="block lg:hidden">Menge</Label>
                <Input
                    type="number"
                    min="0"
                    {...register(`ingredients.${index}.amount`, {
                        setValueAs: (value) => {
                            const num = parseFloat(value);
                            return isNaN(num) ? null : num;
                        }
                    })}
                    error={errors.ingredients?.[index]?.amount?.message}
                />
                <FormError
                    error={errors.ingredients?.[index]?.amount?.message}
                />
            </div>
        );
    };

    const renderUnit = () => {
        return (
            <div className="mb-3 lg:mb-0">
                <Label className="block lg:hidden">Einheit</Label>
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
                            error={errors.ingredients?.[index]?.unitId?.message}
                        />
                    )}
                />
                <FormError
                    error={errors.ingredients?.[index]?.unitId?.message}
                />
            </div>
        );
    };

    const renderIngredient = () => {
        return (
            <div className="mb-3 lg:mb-0">
                <Label className="block lg:hidden">Zutat</Label>
                <Controller
                    name={`ingredients.${index}.ingredientId`}
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
                            error={
                                errors.ingredients?.[index]?.ingredientId
                                    ?.message
                            }
                        />
                    )}
                />
                <FormError
                    error={errors.ingredients?.[index]?.ingredientId?.message}
                />
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:contents">
            {renderAmount()}
            {renderUnit()}
            {renderIngredient()}
            <div
                className="mt-1.5 mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-gray-300 lg:mb-3"
                onClick={() => remove(index)}
            >
                <TrashIcon className="h-4 w-4" />
            </div>
        </div>
    );
};

export default IngredientsFormLine;
