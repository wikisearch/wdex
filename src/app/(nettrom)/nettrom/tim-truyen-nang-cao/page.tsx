import { Metadata } from "next";
import { Suspense } from "react";
import SearchMangaForm from "@/components/nettrom/tim-kiem/search-manga-form";
import MangaResults from "@/components/nettrom/tim-kiem/manga-results";
import { Constants } from "@/constants";
import { FaSearch } from "react-icons/fa";

export const metadata: Metadata = {
  title: `Tìm truyện đọc tại ${Constants.APP_NAME}`,
  metadataBase: new URL(Constants.APP_URL),
};

export default function AdvancedSearch() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-xl border border-border/10 bg-card p-6 shadow-soft md:p-8">
        <h1 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
            <FaSearch size={16} />
          </span>
          Tìm truyện nâng cao
        </h1>
        <Suspense>
          <SearchMangaForm />
        </Suspense>
      </section>
      <section className="rounded-xl border border-border/10 bg-card p-6 shadow-soft md:p-8">
        <Suspense>
          <MangaResults />
        </Suspense>
      </section>
    </div>
  );
}
