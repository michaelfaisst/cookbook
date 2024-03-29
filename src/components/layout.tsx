import type { PropsWithChildren } from "react";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

import Header from "./header";

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
            >
                {props.children}
            </motion.main>
        </div>
    );
};

export default Layout;
