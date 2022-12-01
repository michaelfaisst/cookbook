import { classNames } from "@/utils";
import type { ClockIcon } from "@heroicons/react/24/outline";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: typeof ClockIcon;
}

const IconButton = ({ icon, className, ...restProps }: Props) => {
    const Icon = icon;

    return (
        <button
            className={classNames(
                "rounded-full border border-gray-300 bg-white p-1 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none",
                className
            )}
            {...restProps}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
};

export default IconButton;
