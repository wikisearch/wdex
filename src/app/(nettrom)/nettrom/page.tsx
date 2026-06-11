import FeaturedTitles from "@/components/nettrom/trang-chu/featured-titles";
import NewUpdates from "@/components/nettrom/trang-chu/new-updates";
import ReadingHistory from "@/components/nettrom/trang-chu/reading-history";
import RecentComments from "@/components/nettrom/trang-chu/recent-comments";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import SourceMangaGrid from "@/components/nettrom/trang-chu/source-manga-grid";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <FeaturedTitles />
      </section>
      <section>
        <SourceMangaGrid />
      </section>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="flex flex-col gap-12 lg:col-span-2">
          <NewUpdates />
        </div>
        <div className="flex flex-col gap-12">
          <ReadingHistory />
          <TopTitles />
          <RecentComments />
        </div>
      </div>
    </div>
  );
}
