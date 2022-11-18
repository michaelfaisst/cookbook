import React, { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>(
    ({ className, ...restProps }, ref) => {
        return (
            <textarea
                ref={ref}
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                {...restProps}
            />
        );
    }
);

export default TextArea;
