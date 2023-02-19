import { Toaster } from "react-hot-toast";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps, AppType } from "next/app";

import NiceModal from "@ebay/nice-modal-react";
import "@fontsource/libre-baskerville";
import "@fontsource/source-sans-pro";
import { AnimatePresence } from "framer-motion";

import { trpc } from "@/utils/trpc";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}: AppProps) => {
    return (
        <main className="relative">
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
