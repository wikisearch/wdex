"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  FaBook,
  FaBug,
  FaCaretDown,
  FaCat,
  FaCog,
  FaGithub,
  FaHistory,
  FaHome,
  FaPencilAlt,
  FaSignOutAlt,
  FaUser,
  FaSearch,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/shadcn/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/shadcn/sheet";
import { Skeleton } from "@/components/shadcn/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";
import { useSettingsContext } from "@/contexts/settings";

import MainNav from "./main-nav";
import SearchInput from "../common/search-input";
import { Sun, Moon } from "lucide-react";

const menuItemClassName = "w-full cursor-pointer";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openMobileSearch, setOpenMobileSearch] = useState(false);
  const pathname = usePathname();
  const params = useSearchParams();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setOpenMenu(false);
    setOpenMobileSearch(false);
  }, [pathname, params]);

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
    <header
      className="relative sticky top-0 z-50 flex min-h-16 w-full items-center border-b border-[#311B56]/5 bg-[#FAF8F5]/80 shadow-[0_1px_3px_rgba(49,27,86,0.04)] backdrop-blur-xl"
      id="header"
    >
      {openMobileSearch && (
        <div className="absolute inset-x-0 top-full border-b border-[#311B56]/10 bg-[#FAF8F5]/95 p-3 backdrop-blur-md md:hidden">
          <SearchInput />
        </div>
      )}

      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            className="flex items-center space-x-2"
            title="Truyện tranh online"
            href={Constants.Routes.nettrom.index}
          >
            <img
              alt="Logo NetTrom"
              src={"/images/logo.png"}
              className="w-[120px] brightness-0 hue-rotate-[262deg] saturate-[135%] md:w-[150px]"
            />
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-1 sm:space-x-2">
          <div className="hidden max-w-sm flex-1 md:flex">
            <SearchInput />
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#311B56]/40 transition-all hover:bg-[#311B56]/5 hover:text-[#311B56]/80 md:hidden"
            aria-label="Search"
            onClick={() => setOpenMobileSearch((prev) => !prev)}
          >
            <FaSearch className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={toggleDark}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#311B56]/40 transition-all hover:bg-[#311B56]/5 hover:text-[#311B56]/80 max-lg:hidden"
            aria-label={dark ? "Chế độ sáng" : "Chế độ tối"}
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            title="MangaDex"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#311B56]/40 transition-all hover:bg-[#311B56]/5 hover:text-[#311B56]/80"
            href="https://mangadex.org/"
            target="_blank"
            rel="noreferrer"
          >
            <FaCat className="h-4 w-4 text-[#FF6740]" />
          </a>

          <AuthDropdown desktop />

          <Sheet open={openMenu} onOpenChange={setOpenMenu}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-xl text-[#311B56]/40 transition-all hover:bg-[#311B56]/5 hover:text-[#311B56]/80 md:hidden"
                aria-label="Menu"
              >
                <FaBars className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="flex w-[300px] flex-col border-[#311B56]/10 bg-[#FAF8F5]/95 p-0 text-[#311B56] backdrop-blur-xl sm:w-[400px]"
            >
              <SheetTitle className="sr-only">Menu Của NetTrom</SheetTitle>
              <div className="border-b border-[#311B56]/10 p-4">
                <Link
                  className="flex items-center space-x-2"
                  title="Truyện tranh online"
                  href={Constants.Routes.nettrom.index}
                  onClick={() => setOpenMenu(false)}
                >
                  <img
                    alt="Logo NetTrom"
                    src={"/images/logo.png"}
                    className="w-[120px] brightness-0 hue-rotate-[262deg] saturate-[135%]"
                  />
                </Link>
              </div>
              <div className="px-4 py-3">
                <SearchInput />
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto">
                <div className="px-2">
                  <MainNav />
                </div>
              </div>
              <div className="border-t border-[#311B56]/10 p-4">
                <div className="mb-3">
                  <AuthDropdown />
                </div>
                <button
                  onClick={toggleDark}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#311B56]/60 transition-all hover:bg-[#A57CC6]/10 hover:text-[#A57CC6]"
                >
                  {dark ? <Sun size={16} /> : <Moon size={16} />}
                  {dark ? "Chế độ sáng" : "Chế độ tối"}
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function AuthDropdown({ desktop }: { desktop?: boolean }) {
  const { user, logout } = useAuth();
  const { onToggleDrawer } = useSettingsContext();

  if (user === undefined)
    return (
      <div className={desktop ? "hidden md:flex" : "flex"}>
        <Skeleton className="h-9 w-[120px] rounded-xl" />
      </div>
    );

  return (
    <div className={desktop ? "hidden md:flex" : "flex"}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-9 items-center gap-2 rounded-xl border-2 border-[#311B56]/10 px-3 py-1.5 text-sm font-medium text-[#311B56]/80 shadow-brutal-sm outline-none transition-all hover:border-[#311B56]/30 hover:text-[#311B56]">
            <FaUser className="min-w-4 text-[#311B56]/50" size={14} />
            <span className="max-w-[120px] truncate">
              {user?.name || "Tài khoản"}
            </span>
            <FaCaretDown className="opacity-50" size={10} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-xl border-2 border-[#311B56]/10 bg-[#FAF8F5]/95 p-1.5 shadow-brutal backdrop-blur-xl"
          align="end"
        >
          {user ? (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href={Constants.Routes.dashboard.index}
                  className={menuItemClassName}
                >
                  <FaHome size={14} />
                  Trang cá nhân
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className={menuItemClassName}
                  href={Constants.Routes.nettrom.following}
                >
                  <FaBook size={14} />
                  Truyện theo dõi
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#311B56]/10" />
            </>
          ) : (
            <>
              <DropdownMenuItem asChild>
                <Link
                  className={menuItemClassName}
                  href={Constants.Routes.login}
                >
                  <FaUser size={14} />
                  Đăng nhập
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className={menuItemClassName}
                  href={Constants.Routes.signup}
                >
                  <FaPencilAlt size={14} />
                  Đăng ký
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#311B56]/10" />
            </>
          )}
          <DropdownMenuItem asChild>
            <Link
              className={menuItemClassName}
              href={Constants.Routes.nettrom.history}
            >
              <FaHistory size={14} />
              Lịch sử
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className={menuItemClassName}
              href={Constants.Routes.report}
              target="_blank"
            >
              <FaBug size={14} />
              Báo lỗi
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link
              className={menuItemClassName}
              href={Constants.Routes.github}
              target="_blank"
            >
              <FaGithub size={14} />
              GitHub
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button className={menuItemClassName} onClick={onToggleDrawer}>
              <FaCog size={14} /> Cài đặt
            </button>
          </DropdownMenuItem>
          {user && (
            <>
              <DropdownMenuSeparator className="bg-[#311B56]/10" />
              <DropdownMenuItem asChild>
                <button className={menuItemClassName} onClick={logout}>
                  <FaSignOutAlt size={14} />
                  Đăng xuất
                </button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
