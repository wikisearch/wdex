import { Constants } from "@/constants";
import { useChapterContext } from "@/contexts/chapter";
import { useSettingsContext } from "@/contexts/settings";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import useScrollOffset from "@/hooks/useScrollOffset";
import Link from "next/link";
import { FC } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaEllipsisV,
  FaList,
} from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { Select } from "../Select";

export const ChapterControlBar: FC<{}> = () => {
  const { canNext, canPrev, next, prev, chapters, goTo, chapterId, manga } =
    useChapterContext();
  const { onToggleDrawer } = useSettingsContext();
  const scrollDirection = useScrollDirection();
  const { isAtBottom, isAtTop } = useScrollOffset();

  return (
    <>
      <div
        className={twMerge(
          "fixed bottom-0 left-0 z-10 mx-auto flex w-full translate-y-0 flex-nowrap items-center justify-center gap-x-1 p-2 transition-all duration-500",
          scrollDirection === "down" && !isAtBottom && "translate-y-full",
        )}
      >
        <div className="flex w-full items-center gap-2 rounded-xl border border-border/10 bg-card/95 p-2 shadow-soft-lg backdrop-blur-xl sm:max-w-[600px] sm:p-2.5">
          <Button
            disabled={isAtTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            icon={<FaArrowUp />}
            className="h-10 w-10 shrink-0 [&_svg]:size-4"
          />
          <Link href={Constants.Routes.nettrom.manga(manga?.id || "")}>
            <Button
              variant={"ghost"}
              className="h-10 w-10 shrink-0 [&_svg]:size-4"
              icon={<FaList />}
            />
          </Link>
          <Button
            disabled={!canPrev}
            onClick={() => prev()}
            icon={<FaArrowLeft />}
            className="h-10 w-10 shrink-0 disabled:opacity-30 [&_svg]:size-4"
          />
          <Select
            classNames={{
              trigger: "h-10 grow",
              content: "max-h-[500px] w-[95vw] sm:w-full",
            }}
            value={chapterId || "Đang tải..."}
            onValueChange={(value) => {
              goTo(value);
            }}
            items={chapters.map((item) => {
              return {
                label:
                  item.volume !== "none"
                    ? item.chapter !== "none"
                      ? `Tập ${item.volume} Chương ${item.chapter}`
                      : `Oneshot Tập ${item.volume}`
                    : item.chapter !== "none"
                      ? `Chương ${item.chapter}`
                      : "Oneshot",
                value: item.id,
              };
            })}
          />
          <Button
            disabled={!canNext}
            icon={<FaArrowRight />}
            onClick={() => next()}
            className="h-10 w-10 shrink-0 disabled:opacity-30 [&_svg]:size-4"
          />
          <Button
            onClick={onToggleDrawer}
            variant={"ghost"}
            className="h-10 w-10 shrink-0 [&_svg]:size-4"
            icon={<FaEllipsisV />}
          />
        </div>
      </div>
    </>
  );
};
