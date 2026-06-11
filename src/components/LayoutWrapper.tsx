import { cookies } from "next/headers";
import { GoogleTagManager } from "@next/third-parties/google";

import { PropsWithChildren } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/styles/base/index.scss";
import "react-loading-skeleton/dist/skeleton.css";

import { MangadexContextProvider } from "@/contexts/mangadex";
import { Constants } from "@/constants";
import { SettingsProvider } from "@/contexts/settings";
import { SourceProvider } from "@/contexts/source";
import { SkeletonTheme } from "react-loading-skeleton";

async function detectSettings() {
  const cookieStore = cookies();

  const settingsStore = cookieStore.get(Constants.Settings.COOKIE_KEY);

  return settingsStore ? JSON.parse(settingsStore.value) : null;
}

export const LayoutWrapper = async ({
  children,
  ...props
}: PropsWithChildren & {
  id: string;
}) => {
  const settings = await detectSettings();
  return (
    <html lang="vi" suppressHydrationWarning>
      <GoogleTagManager gtmId={Constants.GTM_ID} />
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="https://mangadex.org" />
        <link rel="dns-prefetch" href="https://api.wdex.cc" />
        <link rel="dns-prefetch" href="https://api-proxy.wdex.cc" />
        <link rel="dns-prefetch" href="https://cdn.wdex.cc" />

        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://www.gstatic.com" />
      </head>
      <body
        data-layout-id={props.id}
        className="bg-[#FAF8F5] font-sans text-[#311B56] antialiased"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <SettingsProvider settings={settings}>
          <SkeletonTheme baseColor="#E8E0D6" highlightColor="#F5F0EB">
            <MangadexContextProvider>
              <SourceProvider>{children}</SourceProvider>
            </MangadexContextProvider>
          </SkeletonTheme>
        </SettingsProvider>
        <ToastContainer />
      </body>
    </html>
  );
};
