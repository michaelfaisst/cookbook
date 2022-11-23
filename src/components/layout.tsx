import type { PropsWithChildren } from "react";
import Header from "./header";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const variants: Variants = {
    hidden: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 }
};

const Layout = (props: PropsWithChildren) => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <Header />
            <motion.main
                variants={variants}
                initial="hidden"
                animate="enter"
                exit="exit"
                transition={{ type: "linear" }}
                className="m-auto flex w-full max-w-7xl flex-1 flex-grow flex-col py-10 px-4"
            >
                {props.children}
            </motion.main>
        </div>
    );
};

export default Layout;
