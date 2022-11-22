import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter } from "@next/font/google";

import { trpc } from "@/utils/trpc";
import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}) => {
    return (
        <main className={inter.className}>
            <SessionProvider session={session}>
                <AnimatePresence mode="wait">
                    <Component {...pageProps} />
                </AnimatePresence>
            </SessionProvider>
        </main>
    );
};

export default trpc.withTRPC(MyApp);
