"use client";

import Link from "next/link";
import { Clock, BookOpen, Trash2 } from "lucide-react";

import useReadingHistory from "@/hooks/useReadingHistory";
import { Constants } from "@/constants";

export default function HistoryList() {
  const { history, removeHistory } = useReadingHistory();

  const historyEntries = Object.entries(history);

  if (historyEntries.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border/20 py-24 text-center sm:py-32">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-muted">
          <Clock className="h-8 w-8 text-muted-foreground/50" />
        </div>
        <p className="text-lg font-semibold text-foreground">Chưa có lịch sử</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">
          Bạn chưa đọc truyện nào gần đây. Hãy khám phá và đọc thử vài bộ truyện
          nhé!
        </p>
        <Link
          href={Constants.Routes.nettrom.index}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-accent/90 hover:shadow-soft-md active:scale-95"
        >
          <BookOpen className="h-4 w-4" />
          Khám phá ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4 2xl:grid-cols-5">
      {historyEntries.map(([mangaId, manga]) => (
        <div
          key={mangaId}
          className="group relative flex flex-col overflow-hidden rounded-xl border border-border/10 bg-card shadow-soft transition-all duration-300 hover:shadow-soft-md"
        >
          <Link
            title={manga.mangaTitle}
            href={Constants.Routes.nettrom.manga(mangaId)}
            className="relative block aspect-[2/3] w-full overflow-hidden"
          >
            <img
              alt={manga.mangaTitle}
              src={manga.cover}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeHistory(mangaId);
              }}
              className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 text-white/80 shadow-soft backdrop-blur-sm transition-all duration-200 hover:bg-red-500 hover:text-white"
              title="Xóa khỏi lịch sử"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-8">
              <h3 className="line-clamp-2 text-sm font-semibold leading-tight text-white drop-shadow-sm">
                {manga.mangaTitle}
              </h3>
            </div>
          </Link>

          <div className="flex items-center gap-1.5 border-t border-border/10 bg-muted/20 px-3 py-2 text-xs text-muted-foreground/60">
            <BookOpen className="h-3 w-3 shrink-0" />
            <span className="truncate">{manga.chapterTitle}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
