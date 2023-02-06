import React from "react";
import type { PropsWithChildren } from "react";
import type { PlusSmallIcon } from "@heroicons/react/20/solid";

interface Props {
    onClick: () => void;
    icon?: typeof PlusSmallIcon;
}

const Link = ({ children, onClick, icon }: PropsWithChildren<Props>) => {
    const Icon = icon;

    return (
        <a
            onClick={onClick}
            className="flex cursor-pointer flex-row items-center text-xs text-rose-600"
        >
            {Icon && <Icon className="mr-1 h-3 w-3" />}
            <span>{children}</span>
        </a>
    );
};

export default Link;
