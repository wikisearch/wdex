"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import Skeleton from "react-loading-skeleton";
import { twMerge } from "tailwind-merge";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Navigation, Autoplay } from "swiper/modules";

import { useFeaturedTitles } from "@/hooks/mangadex";
import { useMangadex } from "@/contexts/mangadex";
import { Constants } from "@/constants";
import { Utils } from "@/utils";
import { ErrorDisplay } from "../error-display";

export default function FeaturedTitles() {
  const {
    mangaList: featuredTitles,
    isLoading,
    error,
    mutate,
  } = useFeaturedTitles();
  const { addMangas } = useMangadex();
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (featuredTitles.length > 0) addMangas(featuredTitles);
  }, [featuredTitles, addMangas]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b-2 border-[#311B56]/10 pb-4">
        <div className="flex items-center gap-4">
          <span className="flex h-8 w-8 items-center justify-center border-2 border-[#311B56] bg-[#311B56] text-xs font-bold text-[#FAF8F5] shadow-brutal-sm">
            ★
          </span>
          <div>
            <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#311B56]/50">
              Đề xuất
            </h2>
            <h3 className="text-xl font-black tracking-tight text-[#311B56] md:text-2xl">
              Truyện đề cử
            </h3>
          </div>
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            ref={prevRef}
            className="flex h-9 w-9 items-center justify-center border-2 border-[#311B56] bg-[#FAF8F5] text-[#311B56] shadow-brutal-sm transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            <FaChevronLeft size={12} />
          </button>
          <button
            ref={nextRef}
            className="flex h-9 w-9 items-center justify-center border-2 border-[#311B56] bg-[#FAF8F5] text-[#311B56] shadow-brutal-sm transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            <FaChevronRight size={12} />
          </button>
        </div>
      </div>
      <div>
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5 xl:grid-cols-5 xl:gap-5">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                className={twMerge(
                  `item`,
                  index > 2 && index <= 4 ? "hidden md:block" : "",
                  index > 4 ? "hidden xl:block" : "",
                )}
                key={index}
              >
                <div className="w-full border-2 border-ink/10 bg-cream shadow-brutal-sm">
                  <Skeleton
                    height="280px"
                    baseColor="#F5F0EB"
                    highlightColor="#FAF8F5"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (
                swiper.params.navigation &&
                typeof swiper.params.navigation === "object"
              ) {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            slidesPerView={2}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 24,
              },
            }}
            spaceBetween={24}
            loop
          >
            {featuredTitles.map((manga) => {
              const title = Utils.Mangadex.getMangaTitle(manga);
              return (
                <SwiperSlide key={manga.id}>
                  <div className="group cursor-pointer">
                    <Link
                      href={Constants.Routes.nettrom.manga(manga.id)}
                      title={title}
                      className="block"
                    >
                      <div className="relative w-full border-2 border-[#311B56]/10 bg-[#FAF8F5] shadow-brutal-sm transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-brutal">
                        <div className="relative w-full overflow-hidden">
                          <div
                            className="relative w-full"
                            style={{
                              aspectRatio: `${Constants.Nettrom.MANGA_COVER_RATIO}`,
                            }}
                          >
                            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#311B56]/80 via-[#311B56]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <img
                              src={Utils.Mangadex.getCoverArt(manga, 512)}
                              alt={title}
                              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                        </div>
                        <div className="border-t-2 border-[#311B56]/10 px-3 py-3">
                          <h3 className="line-clamp-1 text-sm font-bold text-[#311B56]">
                            {title}
                          </h3>
                          <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#311B56]/40">
                            {Utils.Date.formatNowDistance(
                              new Date(manga.attributes.updatedAt),
                            )}{" "}
                            trước
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        {error && <ErrorDisplay error={error} refresh={mutate} />}
        {!isLoading && !error && featuredTitles.length === 0 && (
          <div className="border-2 border-ink/10 bg-cream px-6 py-8 text-center shadow-brutal-sm">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-ink/40">
              Không có truyện đề xuất
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
