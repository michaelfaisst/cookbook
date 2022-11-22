import { trpc } from "@/utils/trpc";
import { createUnitSchema, CreateUnitType } from "@/utils/validators";
import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseSyntheticEvent } from "react";
import { useForm } from "react-hook-form";
import Button from "../common/button";
import Input from "../common/input";
import Label from "../common/label";
import Link from "../common/link";

interface Props {
    open: boolean;
    onClose: () => void;
}

const CreateUnitModal = (props: Props) => {
    const { open, onClose } = props;

    const { handleSubmit, register, reset } = useForm<CreateUnitType>({
        resolver: zodResolver(createUnitSchema)
    });

    const trpcUtils = trpc.useContext();
    const createUnitMutation = trpc.units.createUnit.useMutation();

    const onSubmit = (data: CreateUnitType, event?: BaseSyntheticEvent) => {
        event?.preventDefault();
        event?.stopPropagation();

        createUnitMutation.mutateAsync(data, {
            onSuccess: () => {
                trpcUtils.units.getUnits.invalidate();
                reset();
                onClose();
            }
        });
    };

    return (
        <Dialog open={open} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-sm rounded-lg bg-white p-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Dialog.Title className="text-xl">
                            Einheit erstellen
                        </Dialog.Title>

                        <div className="p-3" />

                        <Label>Name</Label>
                        <Input {...register("name")} />

                        <div className="p-4" />

                        <div className="flex flex-row justify-between">
                            <Link onClick={onClose}>Abbrechen</Link>

                            <Button className="bg-white" type="submit">
                                Speichern
                            </Button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default CreateUnitModal;
