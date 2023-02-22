import { Fragment } from "react";

import { Transition } from "@headlessui/react";
import {
    CheckCircleIcon,
    ExclamationCircleIcon
} from "@heroicons/react/24/outline";

interface Props {
    visible: boolean;
    type: "success" | "error";
    title: string;
    description: string;
}

const Notification = (props: Props) => {
    const { visible, type, title, description } = props;

    return (
        <Transition
            appear
            show={visible}
            enter="transition ease-in-out transform duration-150"
            enterFrom="opacity-0 translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="transition ease-in-out transform duration-150"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 translate-x-full"
            as={Fragment}
        >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="flex items-start p-4">
                    <div className="flex-shrink-0">
                        {type === "success" ? (
                            <CheckCircleIcon className="h-6 w-6 text-green-400" />
                        ) : (
                            <ExclamationCircleIcon className="h-6 w-6 text-red-400" />
                        )}
                    </div>
                    <div className="ml-3 w-0 flex-1 pt-0.5">
                        <p className="text-sm font-medium text-gray-900">
                            {title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </Transition>
    );
};

export default Notification;
