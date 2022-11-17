import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { trpc } from "@/utils/trpc";

config.autoAddCss = false;

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps }
}) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
        </SessionProvider>
    );
};

export default trpc.withTRPC(MyApp);
