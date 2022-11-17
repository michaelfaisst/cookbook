import { signIn, useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faSearch } from "@fortawesome/pro-light-svg-icons";

const Header = () => {
    const { data: session, status } = useSession();

    const renderUser = () => {
        if (status === "loading") {
            return <div>Loading...</div>;
        }

        if (!session) {
            return <button onClick={() => signIn("google")}>Login</button>;
        }

        return (
            <div>
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
        <div className="flex flex-row justify-center bg-gray-900 p-2">
            <div className="flex w-full max-w-7xl flex-row items-center justify-between">
                <div>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className="text-lg text-white"
                    />
                </div>
                <div>/* Maybe menu goes here */</div>
                {renderUser()}
            </div>
        </div>
    );
};

export default Header;