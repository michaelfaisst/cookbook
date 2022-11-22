import { classNames } from "@/utils";
import React, { ButtonHTMLAttributes } from "react";
import { ClockIcon } from "@heroicons/react/24/outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    mode?: "primary" | "default";
    icon?: typeof ClockIcon;
}

const Button = ({
    className,
    mode = "default",
    icon,
    children,
    ...restProps
}: Props) => {
    const Icon = icon;
    return (
        <button
            type="button"
            className={classNames(
                "inline-flex items-center gap-1 rounded-md border px-4 py-2 text-sm font-medium shadow-sm",
                mode === "default"
                    ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none"
                    : "",
                mode === "primary"
                    ? "border-transparent bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none"
                    : ""
            )}
            {...restProps}
        >
            {Icon && <Icon className="h-5 w-5" />}
            {children}
        </button>
    );
};

export default Button;
