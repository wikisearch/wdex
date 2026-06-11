"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Constants } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { FaBook, FaSync } from "react-icons/fa";

import FollowingList from "./following-list";
import FollowingSync from "./following-sync";

export default function FollowingView() {
  useAuth({
    middleware: "auth",
    redirectIfNotAuthenticated: Constants.Routes.loginWithRedirect(
      Constants.Routes.nettrom.following,
    ),
  });

  const params = useSearchParams();
  const [tab, setTab] = useState<"following" | "sync">(
    params.get("tab") === "sync" ? "sync" : "following",
  );

  return (
    <div>
      <div className="rounded-xl border border-border/10 bg-card p-6 shadow-soft md:p-8">
        <div className="mb-6 flex items-center gap-4 border-b border-border/10 pb-4">
          <button
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              tab === "following"
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            onClick={() => setTab("following")}
          >
            <FaBook size={14} />
            Đang theo dõi
          </button>
          <button
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              tab === "sync"
                ? "bg-accent/10 text-accent"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            onClick={() => setTab("sync")}
          >
            <FaSync size={14} />
            Đồng bộ
          </button>
        </div>
        {tab === "following" && <FollowingList />}
        {tab === "sync" && <FollowingSync />}
      </div>
    </div>
  );
}
