import React from "react";
import type { HTMLProps } from "react";
import { classNames } from "@/utils";

const TextArea = React.forwardRef<
    HTMLTextAreaElement,
    HTMLProps<HTMLTextAreaElement>
>(({ className, ...restProps }, ref) => {
    return (
        <textarea
            ref={ref}
            className={classNames(
                "block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500",
                className
            )}
            {...restProps}
        />
    );
});

TextArea.displayName = "TextArea";
export default TextArea;
