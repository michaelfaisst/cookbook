import React, { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { TrashIcon } from "@heroicons/react/24/outline";

import type { CreateRecipeInputType } from "@/utils/validators";

import Button from "../common/button";
import TextArea from "../common/textarea";

const InstructionsForm = () => {
    const { control, register } = useFormContext<CreateRecipeInputType>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "instructions"
    });

    return (
        <>
            <div className="mb-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Zubereitung
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Hier kannst du alle Schritte zur Zubereitung deines Rezeptes
                    angeben
                </p>
            </div>

            {fields.length > 0 && (
                <div className="mb-6 grid grid-cols-instructionsForm items-center gap-x-6 gap-y-3">
                    {fields.map((item, index) => (
                        <Fragment key={item.id}>
                            <div className="text-xl">{index + 1}.</div>
                            <TextArea
                                {...register(
                                    `instructions.${index}.instruction`
                                )}
                            />
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300"
                                onClick={() => remove(index)}
                            >
                                <TrashIcon className="h-4 w-4" />
                            </div>
                        </Fragment>
                    ))}
                </div>
            )}

            <Button
                onClick={() =>
                    append({
                        instruction: ""
                    })
                }
            >
                Schritt hinzufügen
            </Button>
        </>
    );
};

export default InstructionsForm;
