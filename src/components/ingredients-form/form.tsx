import { trpc } from "@/utils/trpc";
import { CreateRecipeType } from "@/utils/validators";
import { Control, useFieldArray, UseFormRegister } from "react-hook-form";
import Button from "../common/button";
import Input from "../common/input";
import Label from "../common/label";
import IngredientsFormLine from "./form-line";

interface Props {
    register: UseFormRegister<CreateRecipeType>;
    control: Control<CreateRecipeType, any>;
}

const IngredientsForm = (props: Props) => {
    const { control, register } = props;
    const { data: ingredients } = trpc.ingredients.getIngredients.useQuery();
    const { data: units } = trpc.units.getUnits.useQuery();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
    });

    return (
        <div>
            <h2 className="mt-8 mb-2 text-xl">Zutaten</h2>

            <div className="mb-8 flex flex-row items-center">
                <span className="mr-4">Zutaten für:</span>
                <Input
                    type="number"
                    className="mr-2 w-20"
                    min="1"
                    {...register("servings", {
                        valueAsNumber: true
                    })}
                />
                <span>Personen</span>
            </div>

            {fields.length > 0 && (
                <div className="mb-6 grid grid-cols-ingredientsForm gap-x-6 gap-y-3">
                    <Label className="mb-0">Menge</Label>
                    <Label className="mb-0">Einheit</Label>
                    <Label className="mb-0">Zutat</Label>
                    <div />

                    {fields.map((item, index) => (
                        <IngredientsFormLine
                            key={item.id}
                            index={index}
                            ingredients={ingredients}
                            units={units}
                            remove={remove}
                            {...props}
                        />
                    ))}
                </div>
            )}

            <Button className="w-48" onClick={() => append({} as any)}>
                Zutat hinzufügen
            </Button>
        </div>
    );
};

export default IngredientsForm;
