import { classNames } from "@/utils";
import type { HTMLProps, PropsWithChildren } from "react";

const Content = (props: PropsWithChildren<HTMLProps<HTMLDivElement>>) => {
    const { className, ...restProps } = props;

    return (
        <div
            className={classNames(
                "m-auto flex w-full max-w-7xl flex-1 flex-grow flex-col py-10 px-4 sm:px-6 lg:px-8",
                className
            )}
            {...restProps}
        >
            {props.children}
        </div>
    );
};

export default Content;
