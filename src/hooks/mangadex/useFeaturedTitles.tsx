import { useMemo } from "react";
import { MangadexApi } from "@/api";
import useSearchManga from "./useSearchManga";
import { useSettingsContext } from "@/contexts/settings";

export default function useFeaturedTitles() {
  const { filteredLanguages, filteredContent, originLanguages } =
    useSettingsContext();

  const options = useMemo(() => {
    const createdAtSince = new Date(Date.now() - 30 * 24 * 3600 * 1000);
    return {
      includes: [
        MangadexApi.Static.Includes.COVER_ART,
        MangadexApi.Static.Includes.ARTIST,
        MangadexApi.Static.Includes.AUTHOR,
      ],
      order: {
        followedCount: MangadexApi.Static.Order.DESC,
      },
      contentRating: filteredContent as MangadexApi.Static.MangaContentRating[],
      hasAvailableChapters: "true" as const,
      availableTranslatedLanguage: filteredLanguages,
      originalLanguage: originLanguages,
      createdAtSince: createdAtSince.toISOString().slice(0, -13) + "00:00:00",
      limit: 12,
    };
  }, [filteredLanguages, filteredContent, originLanguages]);

  return useSearchManga(options, { enable: true });
}
