import Link from "next/link";
import { chunk } from "lodash";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { FaHome, FaStore } from "react-icons/fa";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";

const navLinkClass =
  "group inline-flex h-10 w-full sm:w-max items-center justify-start sm:justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-semibold text-muted-foreground transition-all duration-200 hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/10 data-[state=open]:bg-accent/10 data-[state=open]:text-accent";

export default function MainNav() {
  return (
    <NavigationMenu className="w-full max-w-full justify-start">
      <NavigationMenuList className="w-full flex-col flex-wrap items-start justify-start gap-1 space-x-0 sm:flex-row sm:items-center [&>li]:w-full sm:[&>li]:w-auto">
        <NavigationMenuItem>
          <Link href={Constants.Routes.nettrom.index} legacyBehavior passHref>
            <NavigationMenuLink className={navLinkClass}>
              <FaHome className="mr-2" />
              Trang chủ
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={Constants.Routes.nettrom.following}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Theo dõi
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?order[followedCount]=desc#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Hot
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?order[rating]=desc#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Yêu thích
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?order[createdAt]=desc#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Mới cập nhật
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={Constants.Routes.nettrom.history} legacyBehavior passHref>
            <NavigationMenuLink className={navLinkClass}>
              Lịch sử
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={Constants.Routes.nettrom.store} legacyBehavior passHref>
            <NavigationMenuLink className={navLinkClass}>
              <FaStore className="mr-2" />
              Kho
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navLinkClass}>
            Thể loại
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[300px] grid-cols-2 gap-2 rounded-xl border border-border/10 bg-background/95 p-4 shadow-soft-lg backdrop-blur-xl md:w-[600px] md:grid-cols-4 lg:w-[800px]">
              {chunk(Constants.Nettrom.tags, 13).map((col, i) => (
                <ul key={i} className="flex flex-col space-y-1">
                  {col.map((tag) => (
                    <li key={tag.id}>
                      <Link
                        title={Utils.Mangadex.transLocalizedStr(
                          tag.attributes.description,
                        )}
                        href={`${Constants.Routes.nettrom.search}?includedTags=${tag.id}#results`}
                        legacyBehavior
                        passHref
                      >
                        <NavigationMenuLink className="block select-none space-y-1 rounded-lg p-2 leading-none text-muted-foreground no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent">
                          <div className="text-sm font-medium leading-none">
                            {Utils.Mangadex.transLocalizedStr(
                              tag.attributes.name,
                            )}
                          </div>
                        </NavigationMenuLink>
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href={Constants.Routes.nettrom.search} legacyBehavior passHref>
            <NavigationMenuLink className={navLinkClass}>
              Tìm truyện
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?publicationDemographic=josei&publicationDemographic=shoujo#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Con gái
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href={`${Constants.Routes.nettrom.search}?publicationDemographic=seinen&publicationDemographic=shounen#results`}
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navLinkClass}>
              Con trai
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <a
            href={Constants.Routes.hako}
            target="_blank"
            rel="noreferrer"
            className={navLinkClass}
          >
            Light Novel
          </a>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
