import React, { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLLabelElement> {}

const Label = ({ className, ...restProps }: Props) => {
    return (
        <label
            className="mb-2 block text-sm font-medium text-gray-900"
            {...restProps}
        />
    );
};

export default Label;
