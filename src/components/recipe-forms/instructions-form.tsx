import { TrashIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import Button from "../common/button";
import TextArea from "../common/textarea";

const InstructionsForm = () => {
    const { control, register } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "instructions"
    });

    return (
        <div>
            <h2 className="mt-8 mb-2 text-xl">Zubereitung</h2>

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
                className="w-48"
                onClick={() =>
                    append({
                        instruction: ""
                    })
                }
            >
                Schritt hinzufügen
            </Button>
        </div>
    );
};

export default InstructionsForm;