"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import {
  FaExclamationTriangle,
  FaExternalLinkAlt,
  FaStar,
  FaHeart,
  FaComment,
} from "react-icons/fa";

import { useMangadex } from "@/contexts/mangadex";
import { AppApi, MangadexApi } from "@/api";
import Iconify from "@/components/iconify";
import { useSeriesInfo } from "@/hooks/core";
import { Utils } from "@/utils";
import ChapterList from "./chapter-list";
import { Constants } from "@/constants";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { Button } from "../Button";
import { DataLoader } from "@/components/DataLoader";
import { useChapterList } from "@/hooks/mangadex";
import { useSettingsContext } from "@/contexts/settings";
import { ExtendManga } from "@/types/mangadex";

import FirstChapterButton from "./first-chapter-button";
import ExternalLinks from "./external-links";
import Markdown from "../Markdown";
import { Alert } from "../Alert";

export default function Manga({
  mangaId,
  prefetchedManga,
}: {
  mangaId: string;
  prefetchedManga: ExtendManga;
}) {
  const { mangas, updateMangas, updateMangaStatistics, mangaStatistics } =
    useMangadex();
  const { filteredLanguages, filteredContent } = useSettingsContext();
  const manga = mangas[mangaId] || prefetchedManga;
  const { data: seriesInfo, mutate } = useSeriesInfo(mangaId);
  const title = Utils.Mangadex.getMangaTitle(manga);
  const altTitles = Utils.Mangadex.getMangaAltTitles(manga);
  const url = Constants.Routes.nettrom.manga(mangaId);
  const [page, setPage] = useState(0);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const { data, chapters, error } = useChapterList(mangaId, {
    offset: page * Constants.Mangadex.CHAPTER_LIST_LIMIT,
    translatedLanguage: filteredLanguages,
  });
  const chapterListData = useMemo(() => data?.data, [data]);
  const router = useRouter();

  const shouldBlock = useMemo(() => {
    return (
      (!filteredContent.includes(
        MangadexApi.Static.MangaContentRating.PORNOGRAPHIC,
      ) &&
        manga.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.PORNOGRAPHIC) ||
      (!filteredContent.includes(
        MangadexApi.Static.MangaContentRating.EROTICA,
      ) &&
        manga.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.EROTICA)
    );
  }, [filteredContent, manga.attributes.contentRating]);

  const handleLogin = () => {
    router.push(Constants.Routes.loginWithRedirect(window.location.pathname));
  };

  const followManga = useCallback(async () => {
    try {
      const { followed } = await AppApi.Series.followOrUnfollow(mangaId);
      toast(followed ? "Theo dõi thành công" : "Bỏ theo dõi thành công");
      await mutate();
    } catch {
      toast("Đã có lỗi xảy ra");
    }
  }, [mutate, mangaId]);

  useEffect(() => {
    updateMangas({
      ids: [mangaId],
      includes: [
        MangadexApi.Static.Includes.ARTIST,
        MangadexApi.Static.Includes.AUTHOR,
      ],
    });
    updateMangaStatistics({ manga: [mangaId] });
  }, [mangaId]);

  if (shouldBlock)
    return (
      <div className="rounded-xl border border-border/10 bg-card p-8 text-center shadow-soft">
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <FaExclamationTriangle size={40} />
          </div>
          <p className="text-lg font-bold text-foreground">
            Truyện có thể có nội dung phản cảm
          </p>
          <p className="text-sm text-muted-foreground">
            wdex phát hiện truyện có thể có nội dung không phù hợp với thiết lập
            của bạn.
          </p>
          <Button
            icon={<FaExternalLinkAlt />}
            onClick={() =>
              window.open(`https://mangadex.org/title/${mangaId}`, "_blank")
            }
          >
            Đọc trên MangaDex
          </Button>
        </div>
      </div>
    );

  return (
    <DataLoader
      isLoading={!manga}
      loadingText="[ ĐANG TẢI THÔNG TIN TRUYỆN... ]"
      error={error}
    >
      {/* Hero Section Container */}
      <div className="mb-8 overflow-hidden rounded-xl border border-border/10 bg-card shadow-soft md:mb-12">
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[280px_1fr]">
            {/* Left Column: Cover Art */}
            <div className="mx-auto flex w-[240px] shrink-0 flex-col gap-4 md:mx-0 md:w-full">
              <div className="overflow-hidden rounded-xl border border-border/10 shadow-soft-md">
                <AspectRatio ratio={Constants.Nettrom.MANGA_COVER_RATIO}>
                  <img
                    className="h-full w-full object-cover"
                    src={Utils.Mangadex.getCoverArt(manga, 512)}
                    alt={title}
                  />
                </AspectRatio>
              </div>
              {/* Action Buttons */}
              <div className="flex flex-col justify-between gap-3 md:mb-0">
                <FirstChapterButton mangaId={mangaId} />
                {seriesInfo &&
                  (seriesInfo.followed !== null ? (
                    <Button
                      className={`w-full ${
                        seriesInfo.followed
                          ? "!border-destructive/30 !text-destructive hover:!bg-destructive/5"
                          : ""
                      }`}
                      icon={
                        <Iconify
                          icon={
                            seriesInfo.followed ? "fa:times-circle" : "fa:heart"
                          }
                        />
                      }
                      variant="outline"
                      onClick={followManga}
                    >
                      {seriesInfo.followed ? "Bỏ theo dõi" : "Theo dõi"}
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      icon={<Iconify icon="fa:heart" />}
                      variant="outline"
                      onClick={handleLogin}
                    >
                      Đăng nhập để theo dõi
                    </Button>
                  ))}
              </div>
            </div>

            {/* Right Column: Meta Info */}
            <div className="flex flex-col">
              {/* Title */}
              <h1 className="text-2xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
                {title}
              </h1>

              {/* Toggleable Info Section */}
              <div
                className={`flex flex-col ${showMoreInfo ? "flex" : "hidden md:flex"}`}
              >
                {/* Alt titles if exist */}
                {altTitles.length > 0 && (
                  <div className="mb-4 mt-2 flex flex-wrap gap-2 text-sm">
                    <span className="font-semibold text-muted-foreground">
                      Tên khác:
                    </span>
                    <span className="text-muted-foreground/80">
                      {altTitles.join(", ")}
                    </span>
                  </div>
                )}

                {/* Stats Bar */}
                <div className="mb-5 mt-3 flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-lg border border-border/20 bg-muted/30 px-3 py-1.5 text-sm font-semibold text-foreground">
                    <FaStar className="text-yellow-500" size={14} />
                    <span>
                      {mangaStatistics[mangaId]?.rating.bayesian.toFixed(2) ||
                        6}{" "}
                      / 10
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-border/20 bg-muted/30 px-3 py-1.5 text-sm font-semibold text-foreground">
                    <FaHeart className="text-red-400" size={14} />
                    <span>
                      {Utils.Number.formatViews(
                        mangaStatistics[mangaId]?.follows || 0,
                      )}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5 rounded-lg border border-border/20 bg-muted/30 px-3 py-1.5 text-sm font-semibold text-foreground">
                    <FaComment className="text-blue-400" size={14} />
                    <span>
                      {Utils.Number.formatViews(seriesInfo?.comment_count || 0)}
                    </span>
                  </span>
                </div>

                {/* Info Grid */}
                <div className="mb-6 grid grid-cols-1 gap-y-3 text-sm">
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Tác giả
                    </span>
                    <span className="text-foreground">
                      {manga?.author?.attributes
                        ? manga?.author?.attributes.name
                        : "N/A"}{" "}
                      <span className="text-muted-foreground/40">/</span>{" "}
                      {manga?.artist?.attributes
                        ? manga?.artist?.attributes.name
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Tình trạng
                    </span>
                    <span className="flex items-center gap-1.5 capitalize text-foreground">
                      {Utils.Mangadex.translateStatus(manga?.attributes.status)}
                      {manga?.attributes.year && (
                        <span className="rounded-md border border-border/20 bg-muted/30 px-2 py-0.5 text-xs font-medium">
                          {manga.attributes.year}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Ngôn ngữ
                    </span>
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Iconify
                        icon={`circle-flags:lang-${manga.attributes.originalLanguage}`}
                      />
                      {Utils.Mangadex.translateISOLanguage(
                        manga.attributes.originalLanguage,
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-28 shrink-0 font-medium text-muted-foreground">
                      Nội dung
                    </span>
                    <span className="text-foreground">
                      {Utils.Mangadex.translateContentRating(
                        manga?.attributes.contentRating,
                      )}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="mt-0.5 w-28 shrink-0 font-medium text-muted-foreground">
                      Nguồn
                    </span>
                    {manga && (
                      <div className="flex-1">
                        <ExternalLinks
                          links={manga.attributes.links}
                          mangaId={manga.id}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Genres / Tags */}
                <div className="mb-4 flex flex-wrap gap-2 md:mb-8">
                  {manga?.attributes.tags.map((tag) => (
                    <Link
                      key={tag.id}
                      href={`${Constants.Routes.nettrom.search}?includedTags=${tag.id}`}
                      className="rounded-lg border border-border/20 bg-muted/30 px-3 py-1.5 text-xs font-medium text-foreground/80 shadow-soft transition-all duration-200 hover:border-accent/30 hover:bg-accent/5 hover:text-accent hover:shadow-soft-md"
                    >
                      {tag.attributes.name.en}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Toggle Button */}
              <Button
                variant="ghost"
                className="mt-2 w-full md:hidden"
                onClick={() => setShowMoreInfo(!showMoreInfo)}
              >
                {showMoreInfo ? (
                  <>
                    <Iconify icon="fa:angle-up" /> Ẩn bớt
                  </>
                ) : (
                  <>
                    <Iconify icon="fa:angle-down" /> Xem thêm thông tin
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <article>
        {(manga.attributes.contentRating ===
          MangadexApi.Static.MangaContentRating.PORNOGRAPHIC ||
          manga.attributes.contentRating ===
            MangadexApi.Static.MangaContentRating.EROTICA) && (
          <div className="mb-6">
            <Alert title="Phát hiện truyện có thể có nội dung phản cảm theo đánh giá của MangaDex. wdex không chịu trách nhiệm với nội dung của truyện." />
          </div>
        )}
        <div
          className={`mb-8 rounded-xl border border-border/10 bg-card p-6 shadow-soft md:p-8 ${showMoreInfo ? "block" : "hidden md:block"}`}
        >
          <div className="mb-5 flex items-center justify-between border-b border-border/10 pb-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
              <i className="fa fa-align-left text-accent"></i>
              Tóm tắt nội dung
            </h2>
            <div className="text-xs text-muted-foreground">
              <i className="fa fa-clock mr-1.5" />
              Cập nhật:{" "}
              {manga?.attributes?.updatedAt
                ? Utils.Date.formatNowDistance(
                    new Date(manga?.attributes?.updatedAt),
                  )
                : ""}{" "}
              trước
            </div>
          </div>
          <div className="w-full text-sm leading-relaxed text-foreground/80">
            {
              <Markdown
                content={
                  manga?.attributes?.description.vi ||
                  manga?.attributes?.description.en ||
                  ""
                }
              />
            }
            <p className="mt-4 text-muted-foreground/60">
              Truyện tranh{" "}
              <Link
                href={url}
                className="font-semibold text-accent hover:underline"
              >
                {title}
              </Link>{" "}
              được cập nhật nhanh và đầy đủ nhất tại{" "}
              <Link
                href={"/"}
                className="font-semibold text-accent hover:underline"
              >
                {Constants.APP_NAME}
              </Link>
              . Bạn đọc đừng quên để lại bình luận và chia sẻ, ủng hộ{" "}
              {Constants.APP_NAME} ra các chương mới nhất của truyện{" "}
              <Link
                href={url}
                className="font-semibold text-accent hover:underline"
              >
                {title}
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-border/10 bg-card p-6 shadow-soft md:p-8">
          <ChapterList
            mangaId={mangaId}
            page={page}
            onPageChange={setPage}
            data={chapterListData}
            items={chapters}
          />
        </div>
      </article>
    </DataLoader>
  );
}
