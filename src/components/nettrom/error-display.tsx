"use client";

import { AxiosError } from "axios";
import { useCallback } from "react";

import { MangadexApi } from "@/api";

export const ErrorDisplay = (props: { error?: any; refresh?: Function }) => {
  const refreshPage = useCallback(() => {
    if (typeof window !== "undefined") window.location.reload();
  }, []);

  console.error(props.error);
  let errorMessage;
  const error = props.error;
  if (error instanceof AxiosError) {
    errorMessage = error.response?.data?.message || error.message;
  } else if (error instanceof MangadexApi.Utils.MangaDexError) {
    errorMessage = error.response?.data?.message || error.message;
  } else errorMessage = "Đã có lỗi xảy ra khi tải dữ liệu này";

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-2 border-[#311B56]/10 bg-[#FAF8F5] p-8 text-center shadow-brutal-sm">
      <div className="flex h-12 w-12 items-center justify-center border-2 border-[#311B56]/20 bg-[#F5F0EB] shadow-brutal-sm">
        <span className="text-lg font-black text-[#311B56]/40">!</span>
      </div>
      <span className="font-mono text-xs uppercase tracking-[0.15em] text-[#311B56]/40">
        {errorMessage}
      </span>
      <div className="flex items-center gap-3">
        {props.refresh && (
          <button
            className="border-2 border-[#311B56] bg-[#FAF8F5] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#311B56] shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
            onClick={() => props.refresh!()}
          >
            Tải lại dữ liệu
          </button>
        )}
        <button
          className="border-2 border-[#311B56] bg-[#311B56] px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FAF8F5] shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none"
          onClick={() => refreshPage()}
        >
          Tải lại trang
        </button>
      </div>
    </div>
  );
};
