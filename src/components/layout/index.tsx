import type { PropsWithChildren } from "react";
import Header from "../header";

const Layout = (props: PropsWithChildren) => {
    return (
        <div className="m-auto flex w-full max-w-7xl flex-col p-2">
            <Header />
            <main className="flex-grow py-4">{props.children}</main>
        </div>
    );
};

export default Layout;
