"use client";

import useSWR from "swr";
import type { SourceManga } from "@/types/source";

interface SourceMangaResponse {
  sourceId: string;
  mangas: SourceManga[];
  page: number;
}

export function useSourceManga(sourceId: string, page: number = 1) {
  const { data, error, isLoading } = useSWR<SourceMangaResponse>(
    sourceId ? `/api/sources/${sourceId}?page=${page}` : null,
    (url: string) => fetch(url).then((res) => res.json()),
    { revalidateOnFocus: false, revalidateOnReconnect: false },
  );

  return {
    mangas: data?.mangas || [],
    isLoading,
    isError: !!error,
  };
}
