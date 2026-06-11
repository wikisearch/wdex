"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

import { MangadexApi } from "@/api";
import { DataLoader } from "@/components/DataLoader";
import { TooltipComponent } from "@/components/shadcn/tooltip";
import { Constants } from "@/constants";
import { useSearchManga } from "@/hooks/mangadex";
import useDebounce from "@/hooks/useDebounce";
import { Utils } from "@/utils";
import Link from "next/link";
import { Input } from "@/components/shadcn/input";
import { Button } from "@/components/shadcn/button";

export default function SearchInput() {
  const params = useSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState(params.get("title") || "");
  const deboucedTitle = useDebounce(title, 500);
  const { mangaList, isLoading, error } = useSearchManga(
    {
      title: deboucedTitle,
      includes: [
        MangadexApi.Static.Includes.ARTIST,
        MangadexApi.Static.Includes.AUTHOR,
        MangadexApi.Static.Includes.COVER_ART,
      ],
    },
    { enable: !!deboucedTitle },
  );

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const options = Utils.Mangadex.normalizeParams(params);
    options.title = title;
    clearTitle();
    router.push(Utils.Url.getSearchNetTromUrl(options));
  };

  const clearTitle = useCallback(() => setTitle(""), [setTitle]);

  const wrapperRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    function handleClickOutside(event: globalThis.MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        clearTitle();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [clearTitle]);

  return (
    <form
      ref={wrapperRef}
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-sm items-center"
    >
      <div className="relative w-full">
        <Input
          type="text"
          placeholder="Tìm truyện..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="h-9 border-2 border-[#311B56]/10 bg-[#F5F0EB]/50 pr-9 text-[#311B56] placeholder:text-[#311B56]/30 focus-visible:border-[#A57CC6]/30 focus-visible:ring-1 focus-visible:ring-[#A57CC6]/20"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-9 w-9 px-2 py-2 text-[#311B56]/50 hover:bg-transparent hover:text-[#311B56]"
          onClick={handleSubmit as any}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      {title && (
        <div className="absolute left-0 top-full z-50 mt-2 max-h-[450px] w-full overflow-hidden rounded-xl border-2 border-[#311B56]/10 bg-[#FAF8F5]/95 text-[#311B56] shadow-brutal backdrop-blur-xl transition-all duration-300 ease-out md:w-[400px] lg:w-[500px]">
          <div className="flex items-center justify-between border-b-2 border-[#311B56]/10 bg-[#F5F0EB]/50 px-4 py-3">
            <div>
              <h3 className="text-sm font-bold text-[#311B56]">
                Kết quả tìm kiếm
              </h3>
              <p className="text-xs text-[#311B56]/50">
                {isLoading ? "Đang tìm kiếm..." : `${mangaList.length} kết quả`}
              </p>
            </div>
            <button
              type="button"
              onClick={clearTitle}
              className="flex h-6 w-6 items-center justify-center rounded-md text-[#311B56]/50 transition-colors hover:bg-[#311B56]/5 hover:text-[#311B56]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="scrollbar max-h-[360px] overflow-y-auto">
            <DataLoader isLoading={isLoading} error={error}>
              {mangaList.length > 0 ? (
                <ul className="m-0 list-none p-0">
                  {mangaList.map((manga) => {
                    const title = Utils.Mangadex.getMangaTitle(manga);
                    const altTitles = Utils.Mangadex.getMangaAltTitles(manga);
                    const cover = Utils.Mangadex.getCoverArt(manga);
                    const tags = manga.attributes.tags.map(
                      (t) => t.attributes.name.en,
                    );

                    return (
                      <li
                        key={manga.id}
                        className="border-b-2 border-[#311B56]/5 transition-colors duration-150 last:border-b-0 hover:bg-[#A57CC6]/5"
                      >
                        <Link
                          href={Constants.Routes.nettrom.manga(manga.id)}
                          onClick={clearTitle}
                          className="block p-3 text-inherit no-underline"
                        >
                          <div className="flex gap-3">
                            <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg border-2 border-[#311B56]/10 shadow-brutal-sm">
                              <img
                                className="h-full w-full object-cover"
                                src={cover}
                                alt={title}
                                loading="lazy"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h3 className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold text-[#311B56]">
                                <TooltipComponent
                                  size="xl"
                                  content={title}
                                  side="top"
                                >
                                  <span>{title}</span>
                                </TooltipComponent>
                              </h3>
                              {altTitles.length > 0 && (
                                <p className="mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-[#311B56]/50">
                                  {altTitles.join(", ")}
                                </p>
                              )}
                              <div className="mb-1.5 text-xs text-[#311B56]/50">
                                {manga.author?.attributes?.name && (
                                  <span className="mb-0.5 block overflow-hidden text-ellipsis whitespace-nowrap">
                                    Tác giả: {manga.author.attributes.name}
                                  </span>
                                )}
                                {manga.artist?.attributes?.name && (
                                  <span className="mb-0.5 block overflow-hidden text-ellipsis whitespace-nowrap">
                                    Họa sĩ: {manga.artist.attributes.name}
                                  </span>
                                )}
                              </div>
                              {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {tags.slice(0, 3).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="rounded-md bg-[#F5F0EB] px-2 py-0.5 text-[10px] font-medium text-[#311B56]/50"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              ) : !isLoading ? (
                <div className="px-4 py-8 text-center">
                  <h3 className="mb-1 text-sm font-bold text-[#311B56]">
                    Không tìm thấy truyện
                  </h3>
                  <p className="text-xs text-[#311B56]/50">
                    Thử tìm kiếm với từ khóa khác
                  </p>
                </div>
              ) : null}
            </DataLoader>
          </div>

          {mangaList.length > 0 && (
            <div className="border-t-2 border-[#311B56]/10 bg-[#F5F0EB]/50 px-4 py-2.5 text-center">
              <p className="text-xs text-[#311B56]/50">
                Nhấn Enter để tìm kiếm nâng cao
              </p>
            </div>
          )}
        </div>
      )}
    </form>
  );
}
