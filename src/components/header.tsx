import Link from "next/link";

import DesktopMenu from "./desktop-menu";
import MobileMenu from "./mobile-menu";

const Header = () => {
    return (
        <div className="bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 gap-4 items-center justify-between">
                    <div className="flex">
                        <div className="flex items-center font-title text-xl font-semibold text-rose-300">
                            <Link href="/">Manuelas Recipes</Link>
                        </div>
                    </div>
                    <DesktopMenu />
                    <MobileMenu />
                </div>
            </div>
        </div>
    );
};

export default Header;
