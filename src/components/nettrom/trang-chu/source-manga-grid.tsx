"use client";

import { useSourceContext } from "@/contexts/source";
import { useSourceManga } from "@/hooks/sources/useSourceManga";
import { SOURCES } from "@/constants/sources";
import { FaExternalLinkAlt, FaSpinner } from "react-icons/fa";

function SourceSection({ sourceId }: { sourceId: string }) {
  const { mangas, isLoading } = useSourceManga(sourceId);
  const source = SOURCES.find((s) => s.id === sourceId);

  if (!source || sourceId === "mangadex") return null;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ backgroundColor: source.color }}
          >
            {source.icon}
          </div>
          <h2 className="text-lg font-bold text-[#311B56]">{source.name}</h2>
        </div>
        <a
          href={source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs font-medium text-[#A57CC6] transition-all hover:text-[#311B56]"
        >
          Xem thêm
          <FaExternalLinkAlt size={9} />
        </a>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <FaSpinner className="animate-spin text-[#A57CC6]" size={24} />
        </div>
      ) : mangas.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {mangas.slice(0, 12).map((manga) => (
            <a
              key={manga.id}
              href={manga.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="relative mb-2 overflow-hidden rounded-xl border-2 border-[#311B56]/10 bg-[#FAF8F5] shadow-brutal-sm transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-brutal">
                <div style={{ aspectRatio: "2/3" }}>
                  <img
                    src={manga.thumbnail}
                    alt={manga.title}
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/200x300?text=No+Image";
                    }}
                  />
                </div>
              </div>
              <h3 className="line-clamp-2 text-sm font-bold leading-tight text-[#311B56] transition-colors group-hover:text-[#A57CC6]">
                {manga.title}
              </h3>
              {manga.latestChapter && (
                <span className="mt-0.5 block font-mono text-[10px] font-semibold uppercase tracking-wider text-[#311B56]/40">
                  {manga.latestChapter.title}
                </span>
              )}
            </a>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-[#311B56]/10 p-8 text-center">
          <p className="text-sm text-[#311B56]/40">
            Không thể tải dữ liệu từ {source.name}
          </p>
          <a
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#A57CC6]"
          >
            Truy cập trực tiếp
            <FaExternalLinkAlt size={9} />
          </a>
        </div>
      )}
    </div>
  );
}

export default function SourceMangaGrid() {
  const { installedSources } = useSourceContext();
  const externalSources = installedSources.filter((s) => s.id !== "mangadex");

  if (externalSources.length === 0) return null;

  return (
    <div className="flex flex-col gap-10">
      {externalSources.map((source) => (
        <SourceSection key={source.id} sourceId={source.id} />
      ))}
    </div>
  );
}
