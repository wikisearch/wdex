import { MangadexApi } from "@/api";
import { User } from "@/types/mangadex";
import NewUpdates from "@/components/nettrom/trang-chu/new-updated-titles";
import TopTitles from "@/components/nettrom/common/top-titles-table";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { Constants } from "@/constants";
import Markdown from "@/components/nettrom/Markdown";
import { FaUser, FaEnvelope, FaCat, FaGlobe } from "react-icons/fa";
import { SiDiscord, SiX } from "react-icons/si";

export async function generateMetadata(
  { params }: { params: { groupId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.groupId;

  const previousImages = (await parent).openGraph?.images || [];
  const mdImage = {
    url: `https://og.mangadex.org/og-image/group/${id}`,
    width: 1200,
    height: 630,
  };
  try {
    const {
      data: { data: group },
    } = await MangadexApi.Group.getGroupId(id, {
      includes: [
        MangadexApi.Static.Includes.LEADER,
        MangadexApi.Static.Includes.MEMBER,
      ],
    });

    return {
      title: `Nhóm dịch ${group.attributes.name} - Đọc ngay tại ${Constants.APP_NAME}`,
      description: `${group.attributes.description}`,
      metadataBase: new URL(Constants.APP_URL),
      openGraph: {
        images: [mdImage],
      },
      twitter: {
        images: [mdImage],
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    title: "Đọc ngay tại NetTrom",
    description: "NetTrom - Website Trộm Truyện Văn Minh",
    metadataBase: new URL(Constants.APP_URL),
    openGraph: {
      images: [...previousImages],
    },
  };
}

export default async function NhomDich({
  params,
}: {
  params: { groupId: string };
}) {
  const id = params.groupId;
  const {
    data: { data: group },
  } = await MangadexApi.Group.getGroupId(id, {
    includes: [
      MangadexApi.Static.Includes.LEADER,
      MangadexApi.Static.Includes.MEMBER,
    ],
  });
  if (!group) return notFound();

  const leaders = group.relationships.filter(
    (r) => r.type === "leader",
  ) as unknown as User[];

  const members = group.relationships.filter(
    (r) => r.type === "member",
  ) as unknown as User[];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <article className="rounded-xl border border-border/10 bg-card p-6 shadow-soft md:p-8">
          <div className="mb-6 border-b border-border/10 pb-4">
            <h1 className="flex items-center gap-3 text-xl font-bold text-foreground">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <FaUser size={16} />
              </span>
              Nhóm dịch: {group.attributes.name}
            </h1>
            {group.attributes.focusedLanguages && (
              <p className="mt-2 text-sm text-muted-foreground">
                Ngôn ngữ:{" "}
                {group.attributes.focusedLanguages
                  .map((l) => l.toUpperCase())
                  .join("; ")}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-6">
            {leaders.length > 0 && (
              <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                <FaUser className="text-accent" size={14} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Nhóm trưởng:
                </span>
                <span>
                  {leaders.map((l) => l.attributes.username).join("; ")}
                </span>
              </div>
            )}
            {members.length > 0 && (
              <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                <FaUser className="text-accent" size={14} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Thành viên:
                </span>
                <span>
                  {members.map((l) => l.attributes.username).join("; ")}
                </span>
              </div>
            )}
            {group.attributes.contactEmail && (
              <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
                <FaEnvelope className="text-accent" size={14} />
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email:
                </span>
                <a
                  href={`mailto:${group.attributes.contactEmail}`}
                  className="transition-colors hover:text-accent"
                >
                  {group.attributes.contactEmail}
                </a>
              </div>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-accent/90 hover:shadow-soft-md active:scale-95"
              href={`https://mangadex.org/group/${group.id}`}
              target="_blank"
            >
              <FaCat />
              <span>MangaDex</span>
            </a>
            {group.attributes.website && (
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-border/20 bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-all duration-200 hover:border-accent/30 hover:text-accent hover:shadow-soft-md active:scale-95"
                href={group.attributes.website}
                target="_blank"
              >
                <FaGlobe />
                Website
              </a>
            )}
            {group.attributes.discord && (
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-border/20 bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-all duration-200 hover:border-accent/30 hover:text-accent hover:shadow-soft-md active:scale-95"
                href={`https://discord.gg/${group.attributes.discord}`}
                target="_blank"
              >
                <SiDiscord />
                Discord
              </a>
            )}
            {group.attributes.twitter && (
              <a
                className="inline-flex items-center gap-2 rounded-lg border border-border/20 bg-background px-5 py-2.5 text-sm font-semibold text-foreground shadow-soft transition-all duration-200 hover:border-accent/30 hover:text-accent hover:shadow-soft-md active:scale-95"
                href={group.attributes.twitter}
                target="_blank"
              >
                <SiX />
                Twitter
              </a>
            )}
          </div>

          <div className="mt-8">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
              <span className="h-1 w-4 rounded-full bg-accent" />
              Giới thiệu nhóm
            </h3>
            <div className="prose prose-sm max-w-none text-foreground/80">
              {group.attributes.description && (
                <Markdown content={group.attributes.description} />
              )}
            </div>
          </div>
        </article>
        <div className="mt-8">
          <NewUpdates title="Các chương mới đăng" groupId={group.id} />
        </div>
      </div>
      <div>
        <TopTitles groupId={group.id} />
      </div>
    </div>
  );
}
