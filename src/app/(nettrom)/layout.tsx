import Link from "next/link";
import { Inter } from "next/font/google";
import { Constants } from "@/constants";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import SettingsDialog from "@/components/nettrom/settings-dialog";
import SidebarNav from "@/components/nettrom/layout/sidebar-nav";
import MobileBottomNav from "@/components/nettrom/layout/mobile-bottom-nav";
import SourceDialogWrapper from "@/components/nettrom/layout/source-dialog-wrapper";

export const metadata: Metadata = {
  title: `${Constants.APP_NAME} - Truyện tranh chất lượng cao không quảng cáo`,
  description: `Đọc truyện miễn phí, chất lượng cao và tham gia ủng hộ nhóm dịch trên ${Constants.APP_NAME}`,
  applicationName: Constants.APP_NAME,
  authors: [{ name: "wdex", url: "https://github.com/zennomi/wdex" }],
  keywords: [
    "truyện tranh",
    "manga",
    "manhwa",
    "manhua",
    "nettruyen",
    "nettrom",
    "blogtruyen",
    "cuutruyen",
  ],
  metadataBase: new URL(Constants.APP_URL),
  other: {
    referrer: "same-origin",
  },
  robots:
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"
      ? {
          index: false,
          follow: false,
        }
      : undefined,
};

const inter = Inter({ subsets: ["latin"] });

export default function NettromLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const copyrightYear = new Date().getFullYear();
  return (
    <LayoutWrapper id="nettrom">
      <NextTopLoader
        zIndex={1000}
        easing="ease-in-out"
        speed={400}
        height={3}
        showSpinner={false}
        template={`
        <div class="bar" style="background:hsl(273 35% 62%);box-shadow:0 0 10px hsl(273 35% 62% / 0.5)" role="bar"><div class="peg"></div></div>
  <div class="spinner" style="color:hsl(273 35% 62%)" role="spinner"><div class="spinner-icon"></div></div>`}
      />
      <SidebarNav />
      <MobileBottomNav />
      <main className="relative ml-[72px] flex min-h-screen w-[calc(100%-72px)] flex-1 flex-col overflow-x-hidden max-lg:ml-0 max-lg:w-full max-lg:pb-[100px]">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 overflow-x-hidden pb-[60px] pt-[100px] max-md:gap-6 max-md:px-0 max-md:pb-[80px] max-md:pt-[86px] md:px-10">
          {children}
        </div>
      </main>
      <footer className="ml-[72px] border-t border-[#311B56]/10 bg-[#F5F0EB]/50 py-16 max-lg:ml-0 max-lg:pb-[140px]">
        <div className="mx-auto max-w-[1400px] px-10 max-md:px-4">
          <div className="flex flex-col justify-between gap-12 md:flex-row">
            <div className="flex max-w-md flex-col gap-4">
              <Link href="/">
                <img
                  src={"/images/logo.png"}
                  alt={`${Constants.APP_NAME} - Truyện tranh Online`}
                  className="max-w-[160px] brightness-0 hue-rotate-[262deg] saturate-[135%] transition-all hover:opacity-80"
                />
              </Link>
              <p className="text-sm leading-relaxed text-[#311B56]/60">
                {Constants.APP_NAME} là nền tảng đọc truyện tranh online miễn
                phí, chất lượng cao. Toàn bộ dữ liệu thuộc về MangaDex.
              </p>
              <p className="text-xs text-[#311B56]/40">
                Copyright &copy; {copyrightYear}{" "}
                <Link
                  href="/"
                  className="border-b border-[#311B56]/20 font-semibold text-[#311B56]/60 transition-colors hover:border-[#311B56] hover:text-[#311B56]"
                >
                  {Constants.APP_NAME}
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap gap-16">
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#311B56]/40">
                  Liên kết
                </h4>
                <div className="flex flex-col gap-2.5">
                  <Link
                    href={Constants.Routes.termsOfService}
                    className="text-sm text-[#311B56]/60 transition-all hover:translate-x-0.5 hover:text-[#311B56]"
                  >
                    Điều khoản dịch vụ
                  </Link>
                  <Link
                    href={Constants.Routes.nettrom.index}
                    className="text-sm text-[#311B56]/60 transition-all hover:translate-x-0.5 hover:text-[#311B56]"
                  >
                    Trang chủ
                  </Link>
                  <a
                    href="https://mangadex.org/about"
                    rel="nofollow noopener"
                    target="_blank"
                    className="text-sm text-[#311B56]/60 transition-all hover:translate-x-0.5 hover:text-[#311B56]"
                  >
                    MangaDex
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#311B56]/40">
                  Pháp lý
                </h4>
                <p className="max-w-xs text-xs leading-relaxed text-[#311B56]/40">
                  {Constants.APP_NAME} chỉ cung cấp giao diện và tổng hợp dữ
                  liệu từ MangaDex; chúng tôi không lưu trữ hay sở hữu nội dung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <SourceDialogWrapper />
      <SettingsDialog />
    </LayoutWrapper>
  );
}
