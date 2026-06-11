"use client";

import Link from "next/link";
import { useEffect, useMemo } from "react";
import Skeleton from "react-loading-skeleton";

import { MangadexApi } from "@/api";
import { useMangadex } from "@/contexts/mangadex";
import { useSearchManga } from "@/hooks/mangadex";
import { FaClock, FaHeart, FaStar, FaTrophy } from "react-icons/fa";
import { ExtendManga } from "@/types/mangadex";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { ErrorDisplay } from "../error-display";

const MangaTile = (props: {
  manga: ExtendManga;
  title: string;
  order: number;
  hideCounter?: boolean;
  counter?: number;
  icon?: React.ReactNode;
}) => {
  const inTop3 = useMemo(() => {
    return props.order < 3;
  }, [props.order]);
  return (
    <li
      className="flex w-full gap-3 border-b-2 border-[#311B56]/10 py-3 last:border-0"
      key={props.manga.id}
    >
      <div className="flex w-full items-start gap-3">
        <span
          className={
            inTop3
              ? "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#311B56] bg-[#311B56] text-xs font-black text-[#FAF8F5]"
              : "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#311B56]/20 font-mono text-xs font-bold text-[#311B56]/40"
          }
        >
          {props.order + 1}
        </span>
        <Link
          className="relative w-11 shrink-0 overflow-hidden border-2 border-[#311B56]/10 shadow-brutal-sm transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
          title={props.title}
          href={Constants.Routes.nettrom.manga(props.manga.id)}
        >
          <div className="relative w-full" style={{ aspectRatio: "1" }}>
            <img
              className="h-full w-full object-cover"
              src={Utils.Mangadex.getCoverArt(props.manga)}
              alt={props.title}
              loading="lazy"
            />
          </div>
        </Link>
        <div className="min-w-0 grow">
          <h3>
            <Link
              href={Constants.Routes.nettrom.manga(props.manga.id)}
              className="line-clamp-2 text-sm font-bold text-[#311B56] transition hover:text-[#311B56]/60"
            >
              {props.title}
            </Link>
          </h3>
          {!props.hideCounter && (
            <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#311B56]/40">
              {props.icon}
              {Utils.Number.formatViews(props.counter || 0)}
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

const MangaTileSkeleton = (props: {
  order: number;
  hideCounter?: boolean;
  icon?: React.ReactNode;
  counter?: number;
}) => {
  const inTop3 = useMemo(() => {
    return props.order < 3;
  }, [props.order]);

  return (
    <li
      className="flex w-full gap-3 border-b-2 border-[#311B56]/10 py-3 last:border-0"
      key={props.order}
    >
      <div className="flex w-full items-start gap-3">
        <span
          className={
            inTop3
              ? "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#311B56]/20 bg-[#311B56]/10 text-xs font-black text-[#311B56]/30"
              : "flex h-7 w-7 shrink-0 items-center justify-center border-2 border-[#311B56]/20 font-mono text-xs font-bold text-[#311B56]/30"
          }
        >
          {props.order + 1}
        </span>
        <div className="relative w-11 shrink-0 overflow-hidden border-2 border-[#311B56]/10">
          <div className="relative w-full" style={{ aspectRatio: "1" }}>
            <Skeleton
              width="100%"
              height="100%"
              baseColor="#F5F0EB"
              highlightColor="#FAF8F5"
            />
          </div>
        </div>
        <div className="grow">
          <h3>
            <div className="line-clamp-2 text-sm font-bold text-[#311B56]">
              <Skeleton baseColor="#F5F0EB" highlightColor="#FAF8F5" />
            </div>
          </h3>
          {!props.hideCounter && (
            <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#311B56]/40">
              {props.icon}
              <Skeleton
                width={20}
                baseColor="#F5F0EB"
                highlightColor="#FAF8F5"
              />
            </span>
          )}
        </div>
      </div>
    </li>
  );
};

export default function TopTitles({ groupId }: { groupId?: string }) {
  const {
    mangaList: topMangaList,
    isLoading: topMangaListLoading,
    error: topMangaListError,
  } = useSearchManga({
    limit: 7,
    includes: [MangadexApi.Static.Includes.COVER_ART],
    order: {
      followedCount: MangadexApi.Static.Order.DESC,
    },
    contentRating: [
      MangadexApi.Static.MangaContentRating.SAFE,
      MangadexApi.Static.MangaContentRating.SUGGESTIVE,
    ],
    hasAvailableChapters: "true",
    availableTranslatedLanguage: ["vi"],
    group: groupId ? groupId : undefined,
  });
  const {
    mangaList: newMangaList,
    isLoading: newMangaListLoading,
    error: newMangaListError,
  } = useSearchManga({
    limit: 7,
    includes: [MangadexApi.Static.Includes.COVER_ART],
    order: {
      createdAt: MangadexApi.Static.Order.DESC,
    },
    contentRating: [
      MangadexApi.Static.MangaContentRating.SAFE,
      MangadexApi.Static.MangaContentRating.SUGGESTIVE,
    ],
    hasAvailableChapters: "true",
    availableTranslatedLanguage: ["vi"],
    group: groupId ? groupId : undefined,
  });
  const {
    mangaList: favoriteMangaList,
    isLoading: favoriteMangaListLoading,
    error: favoriteMangaListError,
  } = useSearchManga({
    limit: 7,
    includes: [MangadexApi.Static.Includes.COVER_ART],
    order: {
      rating: MangadexApi.Static.Order.DESC,
    },
    contentRating: [
      MangadexApi.Static.MangaContentRating.SAFE,
      MangadexApi.Static.MangaContentRating.SUGGESTIVE,
    ],
    hasAvailableChapters: "true",
    availableTranslatedLanguage: ["vi"],
    group: groupId ? groupId : undefined,
  });

  const { addMangas, updateMangaStatistics, mangaStatistics } = useMangadex();

  useEffect(() => {
    if (topMangaList.length > 0) {
      addMangas(topMangaList);
      updateMangaStatistics({ manga: topMangaList.map((m) => m.id) });
    }
  }, [topMangaList]);

  useEffect(() => {
    if (favoriteMangaList.length > 0) {
      addMangas(favoriteMangaList);
      updateMangaStatistics({ manga: favoriteMangaList.map((m) => m.id) });
    }
  }, [favoriteMangaList]);

  return (
    <div className="border-2 border-[#311B56]/10 bg-[#FAF8F5] p-6 shadow-brutal md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-[#311B56] bg-[#311B56] text-[#FAF8F5] shadow-brutal-sm">
            <FaTrophy size={14} />
          </span>
          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#311B56]/50">
              Bảng xếp hạng
            </h2>
            <h3 className="text-lg font-black tracking-tight text-[#311B56] md:text-xl">
              Truyện nổi bật
            </h3>
          </div>
        </div>
      </div>
      <Tabs defaultValue="top" className="w-full">
        <TabsList className="mb-6 inline-flex h-auto gap-1 border-2 border-[#311B56]/10 bg-[#F5F0EB] p-1 shadow-brutal-sm">
          <TabsTrigger
            value="top"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#311B56]/50 transition-all data-[state=active]:border-2 data-[state=active]:border-[#311B56] data-[state=active]:bg-[#311B56] data-[state=active]:text-[#FAF8F5] data-[state=active]:shadow-brutal-sm"
          >
            <FaStar size={11} />
            Top
          </TabsTrigger>
          <TabsTrigger
            value="favorite"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#311B56]/50 transition-all data-[state=active]:border-2 data-[state=active]:border-[#311B56] data-[state=active]:bg-[#311B56] data-[state=active]:text-[#FAF8F5] data-[state=active]:shadow-brutal-sm"
          >
            <FaHeart size={11} />
            Yêu thích
          </TabsTrigger>
          <TabsTrigger
            value="new"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#311B56]/50 transition-all data-[state=active]:border-2 data-[state=active]:border-[#311B56] data-[state=active]:bg-[#311B56] data-[state=active]:text-[#FAF8F5] data-[state=active]:shadow-brutal-sm"
          >
            <FaClock size={11} />
            Mới
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top">
          <ul className="flex flex-col gap-0.5">
            {topMangaListLoading
              ? [...Array(7)].map((_, index) => (
                  <MangaTileSkeleton
                    order={index}
                    key={index}
                    icon={<FaStar />}
                  />
                ))
              : topMangaList.map((manga, index) => {
                  const title = Utils.Mangadex.getMangaTitle(manga);
                  return (
                    <MangaTile
                      order={index}
                      key={manga.id}
                      title={title}
                      manga={manga}
                      icon={<FaStar />}
                      counter={mangaStatistics[manga.id]?.follows || 0}
                    />
                  );
                })}
            {topMangaListError && <ErrorDisplay error={topMangaListError} />}
          </ul>
        </TabsContent>
        <TabsContent value="favorite">
          <ul className="flex flex-col gap-0.5">
            {favoriteMangaListLoading
              ? [...Array(7)].map((_, index) => (
                  <MangaTileSkeleton
                    order={index}
                    key={index}
                    icon={<FaHeart />}
                  />
                ))
              : favoriteMangaList.map((manga, index) => {
                  const title = Utils.Mangadex.getMangaTitle(manga);
                  return (
                    <MangaTile
                      order={index}
                      key={manga.id}
                      title={title}
                      manga={manga}
                      icon={<FaHeart />}
                      counter={
                        Math.round(
                          (mangaStatistics[manga.id]?.rating?.bayesian || 0) *
                            10,
                        ) / 10
                      }
                    />
                  );
                })}
            {favoriteMangaListError && (
              <ErrorDisplay error={favoriteMangaListError} />
            )}
          </ul>
        </TabsContent>
        <TabsContent value="new">
          <ul className="flex flex-col gap-0.5">
            {newMangaListLoading
              ? [...Array(7)].map((_, index) => (
                  <MangaTileSkeleton
                    order={index}
                    key={index}
                    icon={<FaHeart />}
                  />
                ))
              : newMangaList.map((manga, index) => {
                  const title = Utils.Mangadex.getMangaTitle(manga);
                  return (
                    <MangaTile
                      order={index}
                      key={manga.id}
                      title={title}
                      manga={manga}
                      hideCounter
                    />
                  );
                })}
            {newMangaListError && <ErrorDisplay error={newMangaListError} />}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  );
}
