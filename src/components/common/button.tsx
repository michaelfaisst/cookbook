import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ className, ...restProps }: Props) => {
    return (
        <button
            className="rounded-lg bg-yellow-800 px-5 py-2.5 text-sm font-medium text-white"
            {...restProps}
        />
    );
};

export default Button;
