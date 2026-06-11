"use client";

import useSWR from "swr/immutable";
import { useMemo } from "react";
import { MangadexApi } from "@/api";
import { ExtendManga, MangaList } from "@/types/mangadex";
import { Utils } from "@/utils";

function normalizeOptions(
  options: MangadexApi.Manga.GetSearchMangaRequestOptions,
) {
  const opts = { ...options };
  if (opts.title) {
    opts.title = encodeURIComponent(opts.title);
  }
  if (!opts.includes) {
    opts.includes = [MangadexApi.Static.Includes.COVER_ART];
  }
  if (opts.offset && opts.offset > 10000) {
    opts.offset = 10000 - (opts.limit || 10);
  }
  return opts;
}

function keyFromOptions(
  options: MangadexApi.Manga.GetSearchMangaRequestOptions,
): string {
  return JSON.stringify(normalizeOptions(options));
}

export default function useSearchManga(
  options: MangadexApi.Manga.GetSearchMangaRequestOptions,
  { enable }: { enable: boolean } = { enable: true },
) {
  const stableOptions = useMemo(() => normalizeOptions(options), [options]);

  const swrKey = useMemo(
    () => (enable ? keyFromOptions(options) : null),
    [enable, options],
  );

  const { data, error, isLoading, mutate } = useSWR(
    swrKey,
    () => MangadexApi.Manga.getSearchManga(stableOptions),
    {},
  );
  const successData =
    data && data.data.result === "ok" && (data.data as MangaList);

  const mangaList = useMemo(() => {
    if (successData)
      return successData.data.map(
        (m) => Utils.Mangadex.extendRelationship(m) as ExtendManga,
      );
    return [];
  }, [successData]);

  return { data: successData, error, isLoading, mangaList, mutate };
}
