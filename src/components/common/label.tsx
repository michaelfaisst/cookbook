import React, { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLLabelElement> {}

const Label = ({ className, ...restProps }: Props) => {
    let classes = "mb-2 block text-sm font-medium text-gray-900";

    if (className) {
        classes = `${classes} ${className}`;
    }

    return <label className={classes} {...restProps} />;
};

export default Label;
