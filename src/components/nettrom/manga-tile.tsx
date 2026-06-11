import Link from "next/link";

import { Constants } from "@/constants";
import { ReadingHistory } from "@/types";
import { MangaStatistic } from "@/types/mangadex";
import { Utils } from "@/utils";
import Skeleton from "react-loading-skeleton";
import { FaStar, FaHeart } from "react-icons/fa";

const MangaTile = (props: {
  id: string;
  title: string;
  thumbnail: string;
  chapters: { id: string; title: string; subTitle: string }[];
  readedChapters?: ReadingHistory;
  mangaStatistic?: MangaStatistic;
  className?: string;
}) => {
  const readedChaptersId = props.readedChapters?.chapterId ?? null;
  return (
    <div className={props.className || ""}>
      <div className="group">
        <div className="relative mb-3 border-2 border-[#311B56]/10 bg-[#FAF8F5] shadow-brutal-sm transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-brutal">
          <Link
            title={props.title}
            href={Constants.Routes.nettrom.manga(props.id)}
          >
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "2/3" }}
            >
              <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#311B56]/80 via-[#311B56]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <img
                src={props.thumbnail}
                className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                alt={props.title}
                loading="lazy"
              />
              <div className="absolute left-2 top-2 z-[2] flex items-center gap-1 border-2 border-[#311B56]/20 bg-[#FAF8F5]/90 px-2 py-0.5 font-mono text-[10px] font-bold text-[#311B56] shadow-brutal-sm backdrop-blur-sm">
                <FaStar className="text-[#311B56]" size={9} />
                {Math.round(
                  (props.mangaStatistic?.rating?.bayesian || 0) * 10,
                ) / 10}
              </div>
            </div>
            <div className="border-t-2 border-[#311B56]/10 px-3 pb-3 pt-3">
              <h3 className="line-clamp-2 text-sm font-bold leading-tight text-[#311B56]">
                {props.title}
              </h3>
              <span className="mt-1.5 flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-[#311B56]/40">
                <span className="flex items-center gap-1">
                  <FaHeart size={8} />
                  {Utils.Number.formatViews(props.mangaStatistic?.follows || 0)}
                </span>
              </span>
            </div>
          </Link>
        </div>
        <figcaption>
          <ul className="flex flex-col gap-1">
            {props.chapters.map((chapter) => (
              <li
                className="flex items-center justify-between gap-x-2"
                key={chapter.id}
              >
                <Link
                  href={Constants.Routes.nettrom.chapter(chapter.id)}
                  title={chapter.title}
                  className={
                    "flex-grow overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-wider transition-all duration-200 " +
                    (readedChaptersId === chapter.id
                      ? "text-[#311B56]/30"
                      : "text-[#311B56]/60 hover:translate-x-0.5 hover:text-[#311B56]")
                  }
                >
                  {chapter.title}
                </Link>
                <span className="whitespace-nowrap font-mono text-[10px] text-[#311B56]/30">
                  {chapter.subTitle}
                </span>
              </li>
            ))}
          </ul>
        </figcaption>
      </div>
    </div>
  );
};

export const MangaTileSkeleton = () => {
  return (
    <div>
      <div className="border-2 border-[#311B56]/10 bg-[#FAF8F5] shadow-brutal-sm">
        <div className="relative w-full" style={{ aspectRatio: "2/3" }}>
          <Skeleton
            width="100%"
            height="100%"
            baseColor="#F5F0EB"
            highlightColor="#FAF8F5"
          />
        </div>
        <div className="border-t-2 border-[#311B56]/10 px-3 py-3">
          <h3 className="line-clamp-2 text-sm font-bold text-[#311B56]">
            <Skeleton baseColor="#F5F0EB" highlightColor="#FAF8F5" />
          </h3>
          <span className="mt-1.5 flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Skeleton
                width={40}
                baseColor="#F5F0EB"
                highlightColor="#FAF8F5"
              />
            </span>
          </span>
        </div>
      </div>
      <figcaption>
        <ul className="flex flex-col gap-1">
          {[...Array(3)].map((_, index) => (
            <li
              className="flex items-center justify-between gap-x-2"
              key={index}
            >
              <span className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[11px] font-bold uppercase tracking-wider text-[#311B56]/30">
                <Skeleton baseColor="#F5F0EB" highlightColor="#FAF8F5" />
              </span>
              <span className="whitespace-nowrap font-mono text-[10px] text-[#311B56]/30">
                <Skeleton baseColor="#F5F0EB" highlightColor="#FAF8F5" />
              </span>
            </li>
          ))}
        </ul>
      </figcaption>
    </div>
  );
};

export default MangaTile;
