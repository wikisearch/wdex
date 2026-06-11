export interface SourceManga {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  latestChapter?: {
    title: string;
    url: string;
  };
  chapterCount?: number;
  rating?: number;
  description?: string;
}

export interface SourceMangaList {
  sourceId: string;
  mangas: SourceManga[];
}

export interface ScraperOptions {
  sourceId: string;
  page?: number;
}
