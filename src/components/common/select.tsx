import React, { useState } from "react";
import { Combobox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface Props<TVal, T> {
    value?: TVal | null;
    data: T[];
    keyProp: (obj: T) => string | number;
    valueProp: (obj: T) => TVal;
    onChange: (selected: TVal | null) => void;
    renderInputValue: (obj: T) => string;
    renderOption: (obj: T) => string;
    filter: (query: string, obj: T) => boolean;
    error?: string;
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
        filter,
        error
    } = props;
    const [query, setQuery] = useState("");

    const filteredData =
        query === "" ? data : data.filter((item) => filter(query, item));

    let inputClasses =
        "w-full rounded-lg border border-gray-300 p-2.5 pr-10 text-sm text-gray-900 focus:border-rose-400 focus:ring-transparent";

    if (error) {
        inputClasses = `${inputClasses} border-red-400`;
    }

    return (
        <Combobox value={value} onChange={(e) => onChange(e || null)} nullable>
            <div className="relative">
                <div className="relative block w-full cursor-default rounded-lg bg-white focus:border-rose-400 focus:ring-transparent">
                    <Combobox.Input
                        autoComplete="off"
                        className={inputClasses}
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

                <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {filteredData.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nichts gefunden.
                        </div>
                    ) : (
                        filteredData.map((item) => (
                            <Combobox.Option
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 px-4 ${
                                        active ? `bg-rose-100` : "text-gray-900"
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
