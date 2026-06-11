import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";
import type { SourceManga } from "@/types/source";

const SOURCE_CONFIG: Record<string, { baseUrl: string; listPath: string }> = {
  nettruyen: {
    baseUrl: "https://nettruyen.gg",
    listPath: "/trang-chu",
  },
  truyenqq: {
    baseUrl: "https://truyenqqko.com",
    listPath: "/",
  },
};

async function scrapeNetTruyen(page: number = 1): Promise<SourceManga[]> {
  const config = SOURCE_CONFIG.nettruyen;
  const url =
    page > 1 ? `${config.baseUrl}/trang-chu?page=${page}` : config.baseUrl;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) throw new Error(`NetTruyen responded with ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);
  const mangas: SourceManga[] = [];

  $(".item, article, .story-item, .thumb-item-flow").each((_, el) => {
    const link = $(el).find("a").first();
    const href = link.attr("href") || "";
    const title =
      link.attr("title") ||
      $(el).find("h3 a, .title a, .series-title a").text().trim();
    const img = $(el).find("img").first();
    const thumbnail = img.attr("data-src") || img.attr("src") || "";
    const id = href.split("/").pop() || href;

    if (!title) return;

    const chapterEl = $(el)
      .find(".chapter a, .last-chapter a, .chap a")
      .first();
    const latestChapter = chapterEl.length
      ? { title: chapterEl.text().trim(), url: chapterEl.attr("href") || "" }
      : undefined;

    mangas.push({
      id,
      title: title.trim(),
      thumbnail: thumbnail.startsWith("//") ? `https:${thumbnail}` : thumbnail,
      url: href.startsWith("http") ? href : `${config.baseUrl}${href}`,
      latestChapter,
    });
  });

  return mangas;
}

async function scrapeTruyenQQ(page: number = 1): Promise<SourceManga[]> {
  const config = SOURCE_CONFIG.truyenqq;
  const url = page > 1 ? `${config.baseUrl}/?page=${page}` : config.baseUrl;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });

  if (!res.ok) throw new Error(`TruyenQQ responded with ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);
  const mangas: SourceManga[] = [];

  $(".items .item, .list-main .item, .story-item, .book-item").each((_, el) => {
    const link = $(el).find("a").first();
    const href = link.attr("href") || "";
    const title =
      link.attr("title") ||
      $(el).find(".title a, h3 a, .book-name a").text().trim();
    const img = $(el).find("img").first();
    const thumbnail = img.attr("data-src") || img.attr("src") || "";
    const id = href.split("/").pop() || href;

    if (!title) return;

    const chapterEl = $(el)
      .find(".chapter a, .last-chapter a, .chap a")
      .first();
    const latestChapter = chapterEl.length
      ? { title: chapterEl.text().trim(), url: chapterEl.attr("href") || "" }
      : undefined;

    mangas.push({
      id,
      title: title.trim(),
      thumbnail: thumbnail.startsWith("//") ? `https:${thumbnail}` : thumbnail,
      url: href.startsWith("http") ? href : `${config.baseUrl}${href}`,
      latestChapter,
    });
  });

  return mangas;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { sourceId: string } },
) {
  const { sourceId } = params;
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);

  if (!SOURCE_CONFIG[sourceId]) {
    return NextResponse.json(
      { error: `Source "${sourceId}" not found` },
      { status: 404 },
    );
  }

  try {
    let mangas: SourceManga[] = [];

    if (sourceId === "nettruyen") {
      mangas = await scrapeNetTruyen(page);
    } else if (sourceId === "truyenqq") {
      mangas = await scrapeTruyenQQ(page);
    }

    return NextResponse.json({
      sourceId,
      mangas,
      page,
    });
  } catch (error) {
    console.error(`Error scraping ${sourceId}:`, error);
    return NextResponse.json(
      {
        sourceId,
        mangas: [],
        page,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
