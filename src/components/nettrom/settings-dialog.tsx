"use client";

import { MouseEvent, useCallback } from "react";

import { Button } from "./Button";
import MultiSelectDropdown from "./multiselect-dropdown";
import Iconify from "../iconify";
import { Slider } from "../shadcn/slider";
import { useSettingsContext } from "@/contexts/settings";
import useWindowSize from "@/hooks/useWindowSize";
import { useAuth } from "@/hooks/useAuth";

export default function SettingsDialog() {
  const {
    openDrawer,
    onCloseDrawer,
    filteredLanguages,
    filteredContent,
    originLanguages,
    dataSaver,
    maxImageWidth,
    onUpdateField,
    onReset,
    onUpdate,
  } = useSettingsContext();

  const { width: windowWidth } = useWindowSize();

  const { user } = useAuth();

  const handleBackdropClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLElement)?.id === "settings-backdrop") {
        onCloseDrawer();
      }
    },
    [onCloseDrawer],
  );

  if (!openDrawer) return null;

  return (
    <div
      id="settings-backdrop"
      className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40 p-4 backdrop-blur-md"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg animate-scale-in overflow-hidden rounded-xl border border-border/10 bg-card shadow-soft-lg">
        <div className="flex items-center justify-between border-b border-border/10 p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Iconify icon="mdi:cog" width={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Tuỳ chỉnh</h2>
              <p className="text-xs text-muted-foreground">
                Cài đặt trải nghiệm đọc truyện
              </p>
            </div>
          </div>
          <button
            onClick={onCloseDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Iconify icon="mdi:close" width={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto p-6">
          <div className="flex items-center justify-between rounded-xl border border-border/10 bg-muted/30 p-4 transition-all hover:border-accent/20">
            <div>
              <div className="text-sm font-semibold text-foreground">
                Tiết kiệm dữ liệu
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground">
                Giảm chất lượng ảnh để tải nhanh hơn
              </div>
            </div>
            <button
              className={`relative h-6 w-11 rounded-full border p-0.5 transition-colors duration-300 ${
                dataSaver
                  ? "border-accent/50 bg-accent/20"
                  : "border-border/30 bg-muted"
              }`}
              onClick={() =>
                onUpdateField("dataSaver", dataSaver ? false : true)
              }
            >
              <div
                className={`absolute top-[1px] h-[18px] w-[18px] rounded-full bg-foreground transition-all duration-300 ${
                  dataSaver ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          <div className="rounded-xl border border-border/10 bg-muted/30 p-4">
            <div className="mb-3 text-sm font-semibold text-foreground">
              Ngôn ngữ
            </div>
            <MultiSelectDropdown
              options={[
                { label: "Tiếng Anh", value: "en" },
                { label: "Tiếng Việt", value: "vi" },
              ]}
              selectedValues={filteredLanguages}
              onChange={(values) => onUpdateField("filteredLanguages", values)}
              anyLabel="Tất cả ngôn ngữ"
              language
            />
          </div>

          <div className="rounded-xl border border-border/10 bg-muted/30 p-4">
            <div className="mb-3 text-sm font-semibold text-foreground">
              Quốc gia
            </div>
            <MultiSelectDropdown
              options={[
                { label: "Nhật (manga)", value: "ja" },
                { label: "Hàn (manhwa)", value: "ko" },
                { label: "Trung (manhua)", value: "zh" },
                { label: "Việt Nam", value: "vi" },
              ]}
              selectedValues={originLanguages}
              onChange={(values) => onUpdateField("originLanguages", values)}
              anyLabel="Tất cả quốc gia"
              language
            />
          </div>

          <div className="rounded-xl border border-border/10 bg-muted/30 p-4">
            <div className="mb-3 text-sm font-semibold text-foreground">
              Phân loại nội dung
            </div>
            <MultiSelectDropdown
              options={[
                { label: "An toàn (Safe)", value: "safe" },
                { label: "Gợi ý (Suggestive)", value: "suggestive" },
                { label: "Khiêu dâm (Erotica)", value: "erotica" },
                { label: "Khiêu dâm (Pornographic)", value: "pornographic" },
              ]}
              selectedValues={filteredContent}
              onChange={(values) => onUpdateField("filteredContent", values)}
              anyLabel="Tất cả nội dung"
            />
          </div>

          <div className="rounded-xl border border-border/10 bg-muted/30 p-4">
            <div className="mb-3 text-sm font-semibold text-foreground">
              Kích thước ảnh tối đa
            </div>
            {maxImageWidth !== undefined && (
              <Slider
                value={[maxImageWidth]}
                onValueChange={([v]) => onUpdateField("maxImageWidth", v)}
                max={1200}
                step={50}
              />
            )}
            <div className="mt-1 text-right text-xs text-muted-foreground">
              {maxImageWidth ?? 0}px
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-border/10 p-6">
          <Button variant="outline" onClick={onReset}>
            Mặc định
          </Button>
          <Button onClick={onCloseDrawer}>Áp dụng</Button>
        </div>
      </div>
    </div>
  );
}
