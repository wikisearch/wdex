"use client";

import {
  FaCheck,
  FaPlus,
  FaExternalLinkAlt,
  FaSpinner,
  FaTrash,
} from "react-icons/fa";
import type { Source } from "@/constants/sources";

interface SourceCardProps {
  source: Source;
  isInstalled: boolean;
  onInstall: () => void;
  onUninstall: () => void;
  installing?: boolean;
}

export default function SourceCard({
  source,
  isInstalled,
  onInstall,
  onUninstall,
  installing,
}: SourceCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border-2 border-[#311B56]/10 bg-[#FAF8F5] p-6 shadow-brutal-sm transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal">
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl font-bold text-white shadow-brutal-sm"
          style={{ backgroundColor: source.color }}
        >
          {source.icon}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-bold text-[#311B56]">{source.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-[#311B56]/60">
            {source.description}
          </p>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#A57CC6] transition-all hover:text-[#311B56]"
          >
            <FaExternalLinkAlt size={10} />
            Truy cập trang
          </a>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 border-t border-[#311B56]/10 pt-4">
        {isInstalled ? (
          <>
            <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">
              <FaCheck size={10} />
              Đã cài đặt
            </div>
            {source.id !== "mangadex" && (
              <button
                onClick={onUninstall}
                className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500 transition-all hover:bg-red-100"
              >
                <FaTrash size={10} />
                Gỡ cài đặt
              </button>
            )}
          </>
        ) : (
          <button
            onClick={onInstall}
            disabled={installing}
            className="flex items-center gap-1.5 rounded-lg bg-[#A57CC6]/10 px-4 py-1.5 text-xs font-semibold text-[#A57CC6] transition-all hover:bg-[#A57CC6]/20 disabled:opacity-50"
          >
            {installing ? (
              <FaSpinner size={10} className="animate-spin" />
            ) : (
              <FaPlus size={10} />
            )}
            Cài đặt
          </button>
        )}
      </div>
    </div>
  );
}
