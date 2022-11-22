import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { classNames } from "@/utils";
import Button from "./common/button";

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
                <span className="text-sm font-medium text-gray-500">
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
        <div className="border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex items-center">
                            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                        </div>

                        <div className="ml-12 flex space-x-8">
                            <Link
                                href="/"
                                className={classNames(
                                    "border-indigo-500 text-gray-900",
                                    "inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium"
                                )}
                            >
                                Rezepte
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center">{renderUser()}</div>
                </div>
            </div>
        </div>
    );

    // return (
    //     <div className="flex flex-row justify-center bg-gray-900 p-2">
    //         <div className="flex w-full max-w-7xl flex-row items-center justify-between">
    //             <div>
    //                 <FontAwesomeIcon
    //                     icon={faSearch}
    //                     className="text-lg text-white"
    //                 />
    //             </div>
    //             <div>
    //                 <Link href="/" className="text-white">
    //                     Rezepte
    //                 </Link>
    //             </div>
    //             {renderUser()}
    //         </div>
    //     </div>
    // );
};

export default Header;
