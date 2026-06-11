"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Constants } from "@/constants";
import { FaHome, FaSearch, FaHistory, FaStore } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

const navItems = [
  {
    icon: FaHome,
    path: Constants.Routes.nettrom.index,
    id: "home",
    label: "Trang chủ",
  },
  {
    icon: FaSearch,
    path: Constants.Routes.nettrom.search,
    id: "search",
    label: "Tìm kiếm",
  },
  {
    icon: FaStore,
    path: Constants.Routes.nettrom.store,
    id: "store",
    label: "Kho",
  },
  {
    icon: BiSolidCategory,
    path: Constants.Routes.nettrom.following,
    id: "following",
    label: "Theo dõi",
  },
  {
    icon: FaHistory,
    path: Constants.Routes.nettrom.history,
    id: "history",
    label: "Lịch sử",
  },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-5 left-1/2 z-[900] flex h-[68px] w-[calc(100%-32px)] max-w-[400px] -translate-x-1/2 items-center justify-around rounded-2xl border-2 border-[#311B56]/10 bg-[#FAF8F5]/90 px-2 shadow-[0_8px_32px_rgba(49,27,86,0.08)] backdrop-blur-xl lg:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          item.id === "home"
            ? pathname === item.path
            : pathname.startsWith(item.path);

        return (
          <Link
            key={item.id}
            href={item.path}
            title={item.label}
            className={`group relative flex flex-col items-center justify-center gap-0.5 rounded-xl px-4 py-2 transition-all duration-200 ${
              isActive
                ? "text-[#A57CC6]"
                : "text-[#311B56]/40 hover:text-[#311B56]/80"
            }`}
          >
            {isActive && (
              <span className="absolute inset-x-1 inset-y-0 rounded-xl bg-[#A57CC6]/10 transition-all duration-300" />
            )}
            <span className="relative flex items-center justify-center transition-all duration-200 group-hover:scale-110">
              <Icon size={20} />
            </span>
            <span className="relative text-[10px] font-semibold leading-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
