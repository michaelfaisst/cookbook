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
            rows={5}
            className={classNames(
                "block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-rose-400 focus:ring-transparent",
                className
            )}
            {...restProps}
        />
    );
});

TextArea.displayName = "TextArea";
export default TextArea;
