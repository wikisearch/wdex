"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Constants } from "@/constants";
import { FaHome, FaSearch, FaHistory, FaStore } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

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
  {
    icon: FaStore,
    path: Constants.Routes.nettrom.store,
    id: "store",
    label: "Kho",
  },
];

export default function SidebarNav() {
  const pathname = usePathname();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDark(isDark);
  }, []);

  const toggleDark = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");
    setDark(html.classList.contains("dark"));
  };

  return (
    <nav className="fixed left-0 top-0 z-[800] flex h-full w-[76px] flex-col items-center gap-1.5 border-r border-[#311B56]/10 bg-[#FAF8F5]/80 px-3 py-5 backdrop-blur-xl max-lg:hidden">
      <Link
        href={Constants.Routes.nettrom.index}
        className="mb-8 flex h-10 w-10 items-center justify-center"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#311B56]/20 bg-[#FAF8F5] shadow-brutal-sm transition-all duration-300 hover:shadow-brutal">
          <img
            src={"/images/logo.png"}
            alt="Logo"
            className="h-5 w-5 object-contain brightness-0 hue-rotate-[262deg] saturate-[135%]"
          />
        </div>
      </Link>
      <div className="flex w-full flex-col items-center gap-0.5">
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
              className={`group relative flex w-full flex-col items-center gap-0.5 rounded-xl px-3 py-2.5 transition-all duration-200 ${
                isActive
                  ? "text-[#A57CC6]"
                  : "text-[#311B56]/40 hover:text-[#311B56]/80"
              }`}
            >
              {isActive && (
                <span className="absolute inset-x-1 inset-y-0 rounded-xl bg-[#A57CC6]/10 transition-all duration-300" />
              )}
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 group-hover:scale-110">
                <Icon size={20} />
              </span>
              <span className="relative text-[10px] font-semibold leading-tight tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
      <div className="mt-auto flex flex-col items-center gap-2">
        <div className="mx-auto h-px w-8 bg-[#311B56]/10" />
        <button
          onClick={toggleDark}
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#311B56]/40 transition-all duration-200 hover:bg-[#311B56]/5 hover:text-[#311B56]/80"
          title={dark ? "Chế độ sáng" : "Chế độ tối"}
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
