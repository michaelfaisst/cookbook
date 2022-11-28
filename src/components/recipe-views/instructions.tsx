import type { RecipeInstruction } from "@/utils/types";
import { Fragment } from "react";

interface Props {
    instructions: RecipeInstruction[];
}

const InstructionsView = ({ instructions }: Props) => {
    return (
        <Fragment>
            <h2 className="mb-4 text-2xl">Zubereitung</h2>

            <ol role="list" className="overflow-hidden">
                {instructions.map((instruction, index) => (
                    <li key={instruction.id} className="relative pb-6">
                        {index < instructions.length - 1 && (
                            <div
                                className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-200"
                                aria-hidden="true"
                            />
                        )}

                        <div className="group relative flex items-start">
                            <span className="flex h-9 items-center">
                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-200 bg-white"></span>
                            </span>
                            <span className="ml-4 mt-2.5 flex min-w-0 flex-col">
                                <span className="mb-2 text-xs font-medium text-indigo-500">
                                    Schritt {index + 1}
                                </span>
                                <span>{instruction.instruction}</span>
                            </span>
                        </div>
                    </li>
                ))}
            </ol>
        </Fragment>
    );
};

export default InstructionsView;
