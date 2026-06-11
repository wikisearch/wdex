"use client";

import { useState } from "react";
import { FaFilter } from "react-icons/fa";

import LastestChapters from "./new-updated-titles";
import LastChapterUpdatedTitles from "./last-chapter-updated-titles";

export default function NewUpdates() {
  const [filtered, setFiltered] = useState(false);

  return (
    <div className="border-2 border-[#311B56]/10 bg-[#FAF8F5] p-6 shadow-brutal md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-[#311B56] bg-[#311B56] text-[#FAF8F5] shadow-brutal-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </span>
          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#311B56]/50">
              Cập nhật
            </h2>
            <h3 className="text-lg font-black tracking-tight text-[#311B56] md:text-xl">
              {filtered ? "Chương mới lọc" : "Truyện mới cập nhật"}
            </h3>
          </div>
        </div>
        <button
          onClick={() => setFiltered((prev) => !prev)}
          className={
            "flex h-9 w-9 items-center justify-center border-2 border-[#311B56] bg-[#FAF8F5] text-[#311B56] shadow-brutal-sm transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none " +
            (filtered ? "bg-[#311B56] text-[#FAF8F5]" : "")
          }
          title="Lọc theo cài đặt"
        >
          <FaFilter size={12} />
        </button>
      </div>

      {filtered ? <LastestChapters /> : <LastChapterUpdatedTitles />}
    </div>
  );
}
