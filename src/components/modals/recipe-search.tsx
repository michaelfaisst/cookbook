import { Fragment, useState } from "react";

import Image from "next/image";
import { useRouter } from "next/router";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, Transition } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import useDebounce from "hooks/use-debounce";

import { trpc } from "@/utils/trpc";

const RecipeSearch = NiceModal.create(() => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: recipes } = trpc.recipes.searchRecipes.useQuery(
        {
            search: debouncedSearchTerm
        },
        {
            keepPreviousData: true
        }
    );

    const modal = useModal();

    const close = () => {
        setSearchTerm("");
        modal.hide();
    };

    return (
        <Transition appear show={modal.visible} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={close}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>
                <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                            <div className="relative">
                                <MagnifyingGlassIcon className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400" />
                                <input
                                    type="text"
                                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                                    placeholder="Search..."
                                    role="combobox"
                                    aria-expanded="false"
                                    aria-controls="options"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.currentTarget.value)
                                    }
                                />
                            </div>

                            {recipes && recipes.length > 0 ? (
                                <ul
                                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                                    id="options"
                                    role="listbox"
                                >
                                    {recipes?.map((recipe) => (
                                        <li
                                            className="cursor-default select-none px-4 py-2 flex flex-row items-center gap-4 hover:bg-rose-50 transition-colors"
                                            id="option-1"
                                            role="option"
                                            tabIndex={-1}
                                            onClick={() => {
                                                close();
                                                router.push(
                                                    `/recipe/${recipe.id}`
                                                );
                                            }}
                                        >
                                            <Image
                                                src={recipe.image || ""}
                                                alt={recipe.name}
                                                width={48}
                                                height={48}
                                                sizes="200"
                                                className="w-12 h-12 object-cover rounded-full"
                                            />
                                            <div>
                                                <div className="font-title text-sm">
                                                    {recipe.name}
                                                </div>
                                                <div className="text-gray-400">
                                                    Erstellt am{" "}
                                                    {format(
                                                        recipe.createdAt,
                                                        "dd.MM.yyyy"
                                                    )}
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="p-4 text-sm text-gray-500">
                                    Keine Rezepte gefunden
                                </p>
                            )}
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
});

export default RecipeSearch;
