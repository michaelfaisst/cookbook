import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

import { faUserChef } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { classNames } from "@/utils";

import Button from "./common/button";
import Input from "./common/input";

const Header = () => {
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
                <span className=" whitespace-nowrap text-sm font-medium text-gray-500">
                    {session.user?.name}
                </span>
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
        <div className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 gap-4 sm:justify-between">
                    <div className="flex">
                        <div className="flex items-center font-title text-xl font-semibold text-slate-900">
                            <Link href="/">Manuelas Recipes</Link>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-row items-center sm:flex-initial sm:gap-4">
                        <div className="hidden space-x-8 sm:flex">
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
                                placeholder="Suche"
                                icon={MagnifyingGlassIcon}
                            />
                        </div>
                        <div className="hidden sm:block">{renderUser()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
