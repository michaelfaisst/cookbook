import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import NiceModal from "@ebay/nice-modal-react";
import {
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    MagnifyingGlassIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useAtom } from "jotai";
import { mobileMenuOpen } from "store";

import Button from "./common/button";
import RecipeSearch from "./modals/recipe-search";

const MobileMenu = () => {
    const [menuOpen, setMenuOpen] = useAtom(mobileMenuOpen);
    const { data: session } = useSession();

    return (
        <div className="sm:hidden">
            <div className="flex flex-row text-rose-300 items-center gap-4">
                <MagnifyingGlassIcon
                    className="w-6 h-6"
                    onClick={() => NiceModal.show(RecipeSearch)}
                />
                <Bars3Icon
                    className="w-6 h-6"
                    onClick={() => setMenuOpen(true)}
                />
            </div>

            <div
                className={clsx(
                    "fixed inset-0 bg-rose-300 z-50 transition-all flex flex-col",
                    { "opacity-0": !menuOpen },
                    { "opacity-100": menuOpen },
                    { "-translate-y-full": !menuOpen },
                    { "translate-y-0": menuOpen }
                )}
            >
                <div className="absolute top-5 right-4">
                    <XMarkIcon
                        className="w-6 h-6 text-white cursor-pointer"
                        onClick={() => setMenuOpen(false)}
                    />
                </div>

                <div className="flex-1 flex flex-col items-center justify-center font-title text-2xl text-white">
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                        Rezepte
                    </Link>
                </div>
                <div className="p-8 text-white">
                    {session == null ? (
                        <div className="flex flex-row justify-center">
                            <Button onClick={() => signIn("google")}>
                                Mit Google anmelden
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-row items-center gap-4">
                                <Image
                                    src={session?.user?.image || ""}
                                    alt={session.user?.name || "Profilbild"}
                                    width={48}
                                    height={48}
                                    className="rounded-full border border-white"
                                />
                                <div>
                                    <div className="font-title">
                                        {session.user?.name}
                                    </div>
                                    <div className="text-sm text-gray-100">
                                        {session.user?.email}
                                    </div>
                                </div>
                            </div>
                            <Button
                                icon={ArrowLeftOnRectangleIcon}
                                className="px-2"
                                onClick={() => signOut()}
                            ></Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
