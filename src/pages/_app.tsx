import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Inter } from "@next/font/google";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { trpc } from "@/utils/trpc";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import NiceModal from "@ebay/nice-modal-react";
import "../styles/globals.css";

config.autoAddCss = false;
const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}) => {
    return (
        <main className={inter.className}>
            <SessionProvider session={session}>
                <NiceModal.Provider>
                    <AnimatePresence mode="wait">
                        <Component {...pageProps} />
                    </AnimatePresence>
                </NiceModal.Provider>
            </SessionProvider>
            <Toaster position="bottom-right" />
        </main>
    );
};

export default trpc.withTRPC(MyApp);
