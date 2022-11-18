import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...restProps }: Props) => {
    let classes =
        "rounded-lg bg-yellow-800 px-5 py-2.5 text-sm font-medium text-white";

    if (className) {
        classes = `${classes} ${className}`;
    }

    return <button type="button" className={classes} {...restProps} />;
};

export default Button;
