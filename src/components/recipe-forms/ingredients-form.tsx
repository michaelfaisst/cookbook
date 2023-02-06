import { useFieldArray, useFormContext } from "react-hook-form";

import NiceModal from "@ebay/nice-modal-react";
import { PlusIcon } from "@heroicons/react/20/solid";

import { trpc } from "@/utils/trpc";
import type { CreateRecipeInputType } from "@/utils/validators";

import Button from "../common/button";
import Input from "../common/input";
import Label from "../common/label";
import Link from "../common/link";
import CreateIngredientModal from "../modals/create-ingredient";
import CreateUnitModal from "../modals/create-unit";
import IngredientsFormLine from "./ingredients-form-line";

const IngredientsForm = () => {
    const { control, register } = useFormContext<CreateRecipeInputType>();
    const { data: ingredients } = trpc.ingredients.getIngredients.useQuery();
    const { data: units } = trpc.units.getUnits.useQuery();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients"
    });

    return (
        <>
            <div className="mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Zutaten
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Gib hier alle Zutaten an die für dein Rezept benötigt werden
                </p>
            </div>

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
                <div className="mb-6 flex flex-col gap-x-6 gap-y-0 divide-y lg:grid lg:grid-cols-ingredientsForm lg:gap-y-3 lg:divide-transparent">
                    <Label className="mb-0 hidden lg:block">Menge</Label>

                    <div className="mb-0 hidden items-center justify-between lg:flex lg:flex-row">
                        <Label className="mb-0">Einheit</Label>
                        <Link
                            icon={PlusIcon}
                            onClick={() => NiceModal.show(CreateUnitModal)}
                        >
                            Erstellen
                        </Link>
                    </div>

                    <div className="mb-0 hidden items-center justify-between lg:flex lg:flex-row">
                        <Label className="mb-0">Zutat</Label>
                        <Link
                            icon={PlusIcon}
                            onClick={() =>
                                NiceModal.show(CreateIngredientModal)
                            }
                        >
                            Erstellen
                        </Link>
                    </div>

                    <div className="hidden lg:block" />

                    {fields.map((item, index) => (
                        <IngredientsFormLine
                            key={item.id}
                            index={index}
                            ingredients={ingredients}
                            units={units}
                            remove={remove}
                        />
                    ))}
                </div>
            )}

            <Button
                onClick={() =>
                    append({
                        ingredientId: "",
                        amount: null,
                        unitId: null
                    })
                }
            >
                Zutat hinzufügen
            </Button>
        </>
    );
};

export default IngredientsForm;
