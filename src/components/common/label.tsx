import React from "react";
import type { HTMLProps } from "react";

const Label = ({ className, ...restProps }: HTMLProps<HTMLLabelElement>) => {
    return (
        <label
            className={`mb-1 block text-sm font-medium text-gray-900 ${className}`}
            {...restProps}
        />
    );
};

export default Label;
