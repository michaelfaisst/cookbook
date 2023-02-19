import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import NiceModal from "@ebay/nice-modal-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { classNames } from "@/utils";

import Button from "./common/button";
import Input from "./common/input";
import RecipeSearch from "./modals/recipe-search";

const DesktopMenu = () => {
    const { data: session, status } = useSession();

    const renderUser = () => {
        if (status === "loading") {
            return <div>Loading...</div>;
        }

        if (!session) {
            return <Button onClick={() => signIn("google")}>Anmelden</Button>;
        }

        return (
            <div onClick={() => signOut()} className="flex items-center gap-3">
                <Image
                    src={session.user?.image || ""}
                    width={32}
                    height={32}
                    alt={session.user?.name || "Profilbild"}
                    className="rounded-full"
                />
            </div>
        );
    };
    return (
        <div className="hidden sm:flex flex-1 flex-row items-center sm:flex-initial sm:gap-4">
            <div className="space-x-8">
                <Link
                    href="/"
                    className={classNames(
                        "inline-flex items-center text-sm font-medium"
                    )}
                >
                    Rezepte
                </Link>
            </div>
            <div className="flex-1">
                <Input
                    onClick={() => NiceModal.show(RecipeSearch)}
                    placeholder="Suche"
                    className="cursor-pointer"
                    icon={MagnifyingGlassIcon}
                />
            </div>
            <div>{renderUser()}</div>
        </div>
    );
};

export default DesktopMenu;
