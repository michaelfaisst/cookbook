import { Fragment } from "react";

import type { RecipeInstruction } from "@/utils/types";

interface Props {
    instructions: RecipeInstruction[];
}

const InstructionsView = ({ instructions }: Props) => {
    return (
        <Fragment>
            <h2 className="mb-4 font-title text-xl">Zubereitung</h2>

            <ol role="list" className="flex flex-col gap-2 overflow-hidden">
                {instructions.map((instruction, index) => (
                    <li
                        key={instruction.id}
                        className="flex flex-row items-center"
                    >
                        <div className="mr-6 w-6 text-center font-title text-xl text-rose-200">
                            {index + 1}.
                        </div>
                        <div>{instruction.instruction}</div>
                    </li>
                ))}
            </ol>
        </Fragment>
    );
};

export default InstructionsView;
