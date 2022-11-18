import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Props<TVal, T> {
    value?: TVal;
    data: T[];
    keyProp: (obj: T) => string | number;
    valueProp: (obj: T) => TVal;
    onChange: (selected?: TVal) => void;
    renderInputValue: (obj: T) => string;
    renderOption: (obj: T) => string;
    filter: (query: string, obj: T) => boolean;
}

const Select = <TVal, T>(props: Props<TVal, T>) => {
    const {
        data,
        value,
        keyProp,
        valueProp,
        onChange,
        renderInputValue,
        renderOption,
        filter
    } = props;
    const [query, setQuery] = useState("");

    const filteredData =
        query === "" ? data : data.filter((item) => filter(query, item));

    return (
        <Combobox
            value={value}
            onChange={(e) => onChange(e || undefined)}
            nullable
        >
            <div className="relative">
                <div className="relative block w-full cursor-default rounded-lg bg-white focus:border-blue-500 focus:ring-blue-500">
                    <Combobox.Input
                        className="w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(item) => {
                            const selectedObj = data.find(
                                (x) => valueProp(x) === item
                            );
                            return selectedObj
                                ? renderInputValue(selectedObj)
                                : "";
                        }}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="text h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>

                <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {filteredData.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nichts gefunden.
                        </div>
                    ) : (
                        filteredData.map((item) => (
                            <Combobox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 px-4 ${
                                        active
                                            ? `bg-blue-500 text-white`
                                            : "text-gray-900"
                                    }`
                                }
                                key={keyProp(item)}
                                value={valueProp(item)}
                            >
                                {renderOption(item)}
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>
            </div>
        </Combobox>
    );
};

export default Select;
