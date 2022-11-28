import { classNames } from "@/utils";
import type { ClockIcon } from "@heroicons/react/24/outline";
import type { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: typeof ClockIcon;
}

const IconButton = ({ icon, className, ...restProps }: Props) => {
    const Icon = icon;

    return (
        <button className={classNames("", className)} {...restProps}></button>
    );
};

export default IconButton;
