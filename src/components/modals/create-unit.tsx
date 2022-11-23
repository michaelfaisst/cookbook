import { trpc } from "@/utils/trpc";
import type { CreateUnitInputType } from "@/utils/validators";
import { createUnitInputSchema } from "@/utils/validators";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Dialog, Transition } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/button";
import Input from "../common/input";
import Label from "../common/label";
import Link from "../common/link";

const CreateUnitModal = NiceModal.create(() => {
    const modal = useModal();

    const { handleSubmit, register, reset } = useForm<CreateUnitInputType>({
        resolver: zodResolver(createUnitInputSchema)
    });

    const trpcUtils = trpc.useContext();
    const createUnitMutation = trpc.units.createUnit.useMutation();

    const onSubmit = async (data: CreateUnitInputType) => {
        await createUnitMutation.mutateAsync(data, {
            onSuccess: () => {
                trpcUtils.units.getUnits.invalidate();
                reset();
                modal.remove();
            }
        });
    };

    return (
        <Transition show={modal.visible} as={Fragment}>
            <Dialog
                open={modal.visible}
                onClose={modal.remove}
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
                            <form
                                id="createIngredientForm"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Dialog.Title className="text-xl">
                                    Einheit erstellen
                                </Dialog.Title>

                                <div className="p-3" />

                                <Label>Name</Label>
                                <Input {...register("name")} />

                                <div className="p-4" />

                                <div className="flex flex-row justify-between">
                                    <Link onClick={modal.remove}>
                                        Abbrechen
                                    </Link>

                                    <Button
                                        form="createIngredientForm"
                                        className="bg-white"
                                        type="submit"
                                        loading={createUnitMutation.isLoading}
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

export default CreateUnitModal;
