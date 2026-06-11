import { Metadata } from "next";
import HistoryList from "@/components/nettrom/lich-su/history-list";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import { Constants } from "@/constants";
import { FaHistory } from "react-icons/fa";

export const metadata: Metadata = {
  title: `Lịch sử đọc truyện tại ${Constants.APP_NAME}`,
  metadataBase: new URL(Constants.APP_URL),
};

const isMaintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

export default function History() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-border/10 bg-card p-6 shadow-soft md:p-8">
          <h1 className="mb-6 flex items-center gap-3 text-xl font-bold text-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <FaHistory size={16} />
            </span>
            Lịch sử đọc truyện
          </h1>
          <HistoryList />
        </div>
      </div>
      {!isMaintenanceMode && (
        <div>
          <TopTitles />
        </div>
      )}
    </div>
  );
}
