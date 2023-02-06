import { Toaster } from "react-hot-toast";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import NiceModal from "@ebay/nice-modal-react";
import "@fontsource/libre-baskerville";
import "@fontsource/source-sans-pro";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AnimatePresence } from "framer-motion";

import { trpc } from "@/utils/trpc";

import "../styles/globals.css";

config.autoAddCss = false;

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}) => {
    return (
        <main>
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
