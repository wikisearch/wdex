"use client";

import Link from "next/link";

import useReadingHistory from "@/hooks/useReadingHistory";

import { FaHistory } from "react-icons/fa";
import { Constants } from "@/constants";
import { useMemo } from "react";
import { MdChevronRight } from "react-icons/md";

export default function ReadingHistory() {
  const { history } = useReadingHistory();

  const historyEntries = useMemo(() => Object.entries(history), [history]);

  return (
    <div className="border-2 border-[#311B56]/10 bg-[#FAF8F5] p-6 shadow-brutal md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-[#311B56] bg-[#311B56] text-[#FAF8F5] shadow-brutal-sm">
            <FaHistory size={14} />
          </span>
          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#311B56]/50">
              Lịch sử
            </h2>
            <h3 className="text-lg font-black tracking-tight text-[#311B56] md:text-xl">
              Lịch sử đọc
            </h3>
          </div>
        </div>
        <Link
          className="flex h-8 items-center gap-1 border-2 border-[#311B56]/20 bg-[#FAF8F5] px-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#311B56]/50 shadow-brutal-sm transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#311B56] hover:shadow-brutal"
          href={Constants.Routes.nettrom.history}
        >
          Xem tất cả <MdChevronRight className="h-3 w-3" />
        </Link>
      </div>
      <ul className="grid grid-cols-4 gap-3">
        {historyEntries.slice(0, 4).map(([mangaId, manga]) => (
          <li className="group" key={mangaId}>
            <Link
              title={manga.mangaTitle}
              href={Constants.Routes.nettrom.manga(mangaId)}
            >
              <div className="w-full border-2 border-[#311B56]/10 shadow-brutal-sm transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-brutal">
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "2/3" }}
                >
                  <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#311B56]/80 via-[#311B56]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <img
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    alt={manga.mangaTitle}
                    src={manga.cover}
                    loading="lazy"
                  />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {historyEntries.length === 0 && (
        <div className="flex w-full items-center justify-center border-2 border-[#311B56]/10 bg-[#F5F0EB] px-6 py-12 shadow-brutal-sm">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#311B56]/40">
            Chưa có lịch sử đọc truyện
          </p>
        </div>
      )}
    </div>
  );
}
