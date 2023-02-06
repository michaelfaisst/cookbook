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
                "rounded-full border border-rose-100 bg-white p-1 font-medium text-rose-700 transition-colors hover:bg-rose-100 focus:outline-none",
                className
            )}
            {...restProps}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
};

export default IconButton;
