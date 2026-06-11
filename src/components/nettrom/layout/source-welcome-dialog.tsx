"use client";

import { useState } from "react";
import { useSourceContext } from "@/contexts/source";
import { SOURCES } from "@/constants/sources";
import { FaCheck, FaRocket, FaStore } from "react-icons/fa";

export default function SourceWelcomeDialog() {
  const { hasSeenWelcome, installSource, dismissWelcome, installedSourceIds } =
    useSourceContext();
  const [step, setStep] = useState<"select" | "done">("select");

  if (hasSeenWelcome) return null;

  const handleInstall = (sourceId: string) => {
    installSource(sourceId);
  };

  const handleFinish = () => {
    dismissWelcome();
  };

  const displayedSources = SOURCES.filter((s) => s.id !== "mangadex");

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg rounded-2xl border-2 border-[#311B56]/10 bg-[#FAF8F5] p-6 shadow-brutal-lg sm:p-8">
        {step === "select" && (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#A57CC6]/10">
                <FaStore className="text-[#A57CC6]" size={28} />
              </div>
              <h2 className="text-xl font-bold text-[#311B56] sm:text-2xl">
                Cài đặt nguồn truyện
              </h2>
              <p className="mt-2 text-sm text-[#311B56]/60">
                Chọn nguồn truyện bạn muốn cài đặt. Sau khi cài đặt, truyện từ
                nguồn đó sẽ hiển thị trên Trang chủ.
              </p>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              {displayedSources.map((source) => {
                const installed = installedSourceIds.includes(source.id);
                return (
                  <button
                    key={source.id}
                    onClick={() => handleInstall(source.id)}
                    disabled={installed}
                    className={`group flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                      installed
                        ? "border-emerald-200 bg-emerald-50"
                        : "border-[#311B56]/10 bg-white hover:border-[#A57CC6]/30 hover:shadow-brutal-sm"
                    }`}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold text-white"
                      style={{ backgroundColor: source.color }}
                    >
                      {source.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-[#311B56] group-hover:text-[#A57CC6]">
                        {source.name}
                      </div>
                      <div className="text-xs text-[#311B56]/50">
                        {source.description}
                      </div>
                    </div>
                    {installed ? (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                        <FaCheck className="text-emerald-600" size={12} />
                      </div>
                    ) : (
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#A57CC6]/10 text-[#A57CC6] transition-all group-hover:bg-[#A57CC6]/20">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => setStep("done")}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#A57CC6] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#8B5CF6]"
              >
                <FaRocket size={14} />
                Bắt đầu trải nghiệm
              </button>
              <button
                onClick={handleFinish}
                className="w-full rounded-xl py-2.5 text-sm font-medium text-[#311B56]/50 transition-all hover:bg-[#311B56]/5 hover:text-[#311B56]"
              >
                Bỏ qua
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <>
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50">
                <FaRocket className="text-emerald-500" size={28} />
              </div>
              <h2 className="text-xl font-bold text-[#311B56] sm:text-2xl">
                Sẵn sàng!
              </h2>
              <p className="mt-2 text-sm text-[#311B56]/60">
                Bạn đã cài đặt {installedSourceIds.length} nguồn truyện. Trang
                chủ sẽ hiển thị truyện từ các nguồn này.
              </p>
            </div>
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {SOURCES.filter((s) => installedSourceIds.includes(s.id)).map(
                (source) => (
                  <div
                    key={source.id}
                    className="flex items-center gap-1.5 rounded-lg border border-[#311B56]/10 bg-white px-3 py-1.5"
                  >
                    <div
                      className="flex h-5 w-5 items-center justify-center rounded text-[8px] font-bold text-white"
                      style={{ backgroundColor: source.color }}
                    >
                      {source.icon}
                    </div>
                    <span className="text-xs font-medium text-[#311B56]">
                      {source.name}
                    </span>
                  </div>
                ),
              )}
            </div>
            <button
              onClick={handleFinish}
              className="w-full rounded-xl bg-[#A57CC6] py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#8B5CF6]"
            >
              Vào Trang chủ
            </button>
          </>
        )}
      </div>
    </div>
  );
}
