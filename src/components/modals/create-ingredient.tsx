import { trpc } from "@/utils/trpc";
import {
    createIngredientSchema,
    CreateIngredientType,
    createUnitSchema,
    CreateUnitType
} from "@/utils/validators";
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

const CreateIngredientModal = (props: Props) => {
    const { open, onClose } = props;

    const { handleSubmit, register, reset } = useForm<CreateIngredientType>({
        resolver: zodResolver(createIngredientSchema)
    });

    const trpcUtils = trpc.useContext();
    const createIngredientMutation =
        trpc.ingredients.createIngredient.useMutation();

    const onSubmit = (
        data: CreateIngredientType,
        event?: BaseSyntheticEvent
    ) => {
        event?.preventDefault();
        event?.stopPropagation();

        createIngredientMutation.mutateAsync(data, {
            onSuccess: () => {
                trpcUtils.ingredients.getIngredients.invalidate();
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
                            Zutat erstellen
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

export default CreateIngredientModal;
