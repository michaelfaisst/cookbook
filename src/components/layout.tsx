import type { PropsWithChildren } from "react";
import Header from "./header";

const Layout = (props: PropsWithChildren) => {
    return (
        <div className="flex w-full flex-col">
            <Header />
            <main className="m-auto w-full max-w-7xl flex-grow py-10 px-4">
                {props.children}
            </main>
        </div>
    );
};

export default Layout;
