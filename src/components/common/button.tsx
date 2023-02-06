import type { ButtonHTMLAttributes } from "react";
import React from "react";

import type { ClockIcon } from "@heroicons/react/24/outline";

import { classNames } from "@/utils";

import Loading from "./loading";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    mode?: "primary" | "default";
    icon?: typeof ClockIcon;
    loading?: boolean;
}

const Button = ({
    className,
    mode = "default",
    icon,
    children,
    loading = false,
    ...restProps
}: Props) => {
    const Icon = icon;

    return (
        <button
            type="button"
            className={classNames(
                "relative inline-flex items-center gap-1 rounded-md border px-4 py-2 text-sm font-medium shadow-sm",
                mode === "default"
                    ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none"
                    : "",
                mode === "primary"
                    ? "border-transparent bg-rose-100 text-gray-900 transition-colors hover:bg-rose-200 focus:outline-none"
                    : "",
                className
            )}
            disabled={loading}
            {...restProps}
        >
            <div
                className={classNames(
                    "absolute left-0 top-0 flex h-full w-full items-center justify-center backdrop-blur-sm transition-all",
                    loading ? "opacity-100" : "opacity-0"
                )}
            >
                <Loading fillClassName="fill-white"></Loading>
            </div>
            {Icon && <Icon className="h-5 w-5" />}
            {children}
        </button>
    );
};

export default Button;
