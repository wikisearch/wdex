import Link from "next/link";
import { format } from "date-fns";
import { useChapterContext } from "@/contexts/chapter";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { DataLoader } from "@/components/DataLoader";
import { ChapterControlBar } from "./chapter-control-bar";
import { useMemo } from "react";
import { FaClock } from "react-icons/fa";
import RandomAlert from "./random-alert";

export default function ChapterControl() {
  const { manga, chapter, others, group } = useChapterContext();

  const mangaTitle = useMemo(() => {
    return Utils.Mangadex.getMangaTitle(manga);
  }, [manga]);
  const chapterTitle = useMemo(() => {
    return Utils.Mangadex.getChapterTitle(chapter);
  }, [chapter]);

  return (
    <DataLoader isLoading={!chapter} loadingText="Đang tải thông tin chương...">
      <div className="mx-auto max-w-[800px] p-4">
        <div className="rounded-xl border border-border/10 bg-card p-6 shadow-soft">
          <h1 className="mb-2 mt-0">
            <Link
              className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
              href={Constants.Routes.nettrom.manga(manga?.id || "")}
            >
              {mangaTitle}
            </Link>
          </h1>
          <p className="my-0 text-xl font-bold leading-none text-foreground">
            {chapterTitle}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <FaClock className="inline" size={12} />
            <span>
              Cập nhật lúc:{" "}
              {chapter &&
                format(
                  new Date(chapter.attributes.publishAt),
                  "HH:mm dd/MM/yyyy",
                )}
            </span>
            {group && (
              <span>
                bởi{" "}
                <Link
                  className="font-medium text-accent underline hover:text-accent/80"
                  href={Constants.Routes.nettrom.scanlationGroup(group.id)}
                >
                  {group.attributes.name}
                </Link>
              </span>
            )}
          </div>

          {others.length > 0 && (
            <div className="mt-4 rounded-xl border border-border/10 bg-muted/30 p-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Chuyển sang bản dịch nhóm khác
              </p>
              <div className="flex flex-wrap gap-2">
                {others.map((other, idx) => (
                  <Link
                    rel="nofollow"
                    key={other}
                    className="inline-block rounded-lg bg-accent/10 px-4 py-2 text-xs font-medium text-accent transition-all hover:bg-accent/20"
                    href={Constants.Routes.nettrom.chapter(other)}
                  >
                    Nhóm {idx}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div className="mt-4">
            <RandomAlert />
            <ChapterControlBar />
          </div>
        </div>
      </div>
    </DataLoader>
  );
}
