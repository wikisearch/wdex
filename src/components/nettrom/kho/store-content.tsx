"use client";

import { useState } from "react";
import { useSourceContext } from "@/contexts/source";
import { FaStore, FaRocket, FaCubes } from "react-icons/fa";
import SourceCard from "./source-card";

export default function StoreContent() {
  const { sources, installedSourceIds, installSource, uninstallSource } =
    useSourceContext();
  const [installing, setInstalling] = useState<string | null>(null);

  const handleInstall = async (sourceId: string) => {
    setInstalling(sourceId);
    await new Promise((r) => setTimeout(r, 600));
    installSource(sourceId);
    setInstalling(null);
  };

  const handleUninstall = (sourceId: string) => {
    uninstallSource(sourceId);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A57CC6]/10">
            <FaStore className="text-[#A57CC6]" size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#311B56]">Kho truyện</h1>
            <p className="text-sm text-[#311B56]/60">
              Cài đặt các nguồn truyện để hiển thị nội dung trên Trang chủ
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((source) => (
          <SourceCard
            key={source.id}
            source={source}
            isInstalled={installedSourceIds.includes(source.id)}
            onInstall={() => handleInstall(source.id)}
            onUninstall={() => handleUninstall(source.id)}
            installing={installing === source.id}
          />
        ))}
      </div>

      {installedSourceIds.length > 0 && (
        <div className="rounded-2xl border-2 border-[#311B56]/10 bg-[#FAF8F5] p-6 shadow-brutal-sm">
          <div className="mb-4 flex items-center gap-2">
            <FaRocket className="text-[#A57CC6]" size={16} />
            <h2 className="font-bold text-[#311B56]">Nguồn đã cài đặt</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {sources
              .filter((s) => installedSourceIds.includes(s.id))
              .map((source) => (
                <div
                  key={source.id}
                  className="flex items-center gap-2 rounded-lg border border-[#311B56]/10 bg-white px-3 py-2"
                >
                  <div
                    className="flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold text-white"
                    style={{ backgroundColor: source.color }}
                  >
                    {source.icon}
                  </div>
                  <span className="text-sm font-medium text-[#311B56]">
                    {source.name}
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl border-2 border-[#A57CC6]/10 bg-[#A57CC6]/5 p-6">
        <div className="flex items-start gap-3">
          <FaCubes className="mt-0.5 text-[#A57CC6]" size={18} />
          <div>
            <h3 className="font-bold text-[#311B56]">Cách thức hoạt động</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#311B56]/60">
              Mỗi nguồn truyện là một kho dữ liệu riêng biệt. Sau khi cài đặt,
              truyện từ nguồn đó sẽ xuất hiện trên Trang chủ. Bạn có thể cài đặt
              nhiều nguồn cùng lúc để có nhiều nội dung hơn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
