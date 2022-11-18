import { trpc } from "@/utils/trpc";
import { CreateRecipeType } from "@/utils/validators";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import Button from "../common/button";
import Label from "../common/label";
import IngridientsFormLine from "./form-line";

interface Props {
    register: UseFormRegister<CreateRecipeType>;
    control: Control<CreateRecipeType, any>;
}

const IngridientsForm = (props: Props) => {
    const { control } = props;
    const { data: ingredients } = trpc.ingredients.getIngredients.useQuery();
    const { data: units } = trpc.units.getUnits.useQuery();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
    });

    return (
        <div>
            <h2 className="mt-8 mb-6 text-xl">Zutaten</h2>

            <div className="mb-6 grid grid-cols-ingridientsForm items-center gap-x-6 gap-y-3">
                {fields.length > 0 && (
                    <>
                        <div />
                        <Label>Menge</Label>
                        <Label>Einheit</Label>
                        <Label>Zutat</Label>
                    </>
                )}

                {fields.map((item, index) => (
                    <IngridientsFormLine
                        key={item.id}
                        index={index}
                        ingredients={ingredients}
                        units={units}
                        remove={remove}
                        {...props}
                    />
                ))}
            </div>

            <Button
                className="w-48"
                onClick={() =>
                    append({
                        ingridientId: ""
                    })
                }
            >
                Zutat hinzufügen
            </Button>
        </div>
    );
};

export default IngridientsForm;
