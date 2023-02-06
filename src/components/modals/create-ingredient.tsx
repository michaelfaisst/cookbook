import { Fragment } from "react";
import { useForm } from "react-hook-form";

import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "@/utils/trpc";
import type { CreateIngredientInputType } from "@/utils/validators";
import { createIngredientInputSchema } from "@/utils/validators";

import Button from "../common/button";
import Input from "../common/input";
import Label from "../common/label";
import Link from "../common/link";

const CreateIngredientModal = NiceModal.create(() => {
    const modal = useModal();

    const { handleSubmit, register, reset } =
        useForm<CreateIngredientInputType>({
            resolver: zodResolver(createIngredientInputSchema)
        });

    const trpcUtils = trpc.useContext();
    const createIngredientMutation =
        trpc.ingredients.createIngredient.useMutation();

    const onSubmit = async (data: CreateIngredientInputType) => {
        await createIngredientMutation.mutateAsync(data, {
            onSuccess: () => {
                trpcUtils.ingredients.getIngredients.invalidate();
                reset();
                modal.hide();
            }
        });
    };

    return (
        <Transition show={modal.visible} as={Fragment}>
            <Dialog
                open={modal.visible}
                onClose={modal.hide}
                className="relative z-50"
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div
                        className="fixed inset-0 bg-black/30"
                        aria-hidden="true"
                    />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-8">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Dialog.Title className="text-xl">
                                    Zutat erstellen
                                </Dialog.Title>

                                <div className="p-3" />

                                <Label>Name</Label>
                                <Input {...register("name")} />

                                <div className="p-4" />

                                <div className="flex flex-row justify-between">
                                    <Link onClick={modal.hide}>Abbrechen</Link>

                                    <Button
                                        className="bg-white"
                                        loading={
                                            createIngredientMutation.isLoading
                                        }
                                        type="submit"
                                    >
                                        Speichern
                                    </Button>
                                </div>
                            </form>
                        </Dialog.Panel>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
});

export default CreateIngredientModal;
