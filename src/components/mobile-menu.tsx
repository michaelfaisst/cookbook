import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useAtom } from "jotai";
import { mobileMenuOpen } from "store";

const MobileMenu = () => {
    const [menuOpen, setMenuOpen] = useAtom(mobileMenuOpen);

    return (
        <div className="sm:hidden">
            <Bars3Icon
                className="w-6 h-6 text-rose-300"
                onClick={() => setMenuOpen(true)}
            />

            <div
                className={clsx(
                    "fixed w-screen h-screen inset-0 bg-rose-200 z-50 transition-all",
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
            </div>
        </div>
    );
};

export default MobileMenu;
