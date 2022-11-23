import React from "react";
import type { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLInputElement> {
    error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ className, error, ...restProps }, ref) => {
        let classes =
            "block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500";

        if (className) {
            classes = `${classes} ${className}`;
        }

        if (error) {
            classes = `${classes} border-red-600`;
        }

        return (
            <input
                ref={ref}
                className={classes}
                autoComplete="off"
                {...restProps}
                aria-invalid={error ? "true" : "false"}
            />
        );
    }
);

Input.displayName = "Input";
export default Input;
