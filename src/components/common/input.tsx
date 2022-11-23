import React from "react";
import type { HTMLProps } from "react";
import type { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { classNames } from "@/utils";

interface Props extends HTMLProps<HTMLInputElement> {
    error?: string;
    icon?: typeof MagnifyingGlassIcon;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
    ({ className, error, icon, ...restProps }, ref) => {
        const Icon = icon;

        return (
            <div className="relative rounded-lg text-gray-500 shadow-sm">
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Icon className="h-4 w-4" />
                    </div>
                )}
                <input
                    ref={ref}
                    className={classNames(
                        "block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500",
                        className,
                        error && "border-red-600",
                        Icon && "pl-10"
                    )}
                    autoComplete="off"
                    {...restProps}
                    aria-invalid={error ? "true" : "false"}
                />
            </div>
        );
    }
);

Input.displayName = "Input";
export default Input;
