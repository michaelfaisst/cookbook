import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

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
        <div className="flex items-center justify-between border-b border-solid border-indigo-200 py-4">
            <h1>Manuelas tolle Rezepte!!!!</h1>
            {renderUser()}
        </div>
    );
};

export default Header;
