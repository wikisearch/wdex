"use client";

import useRecentComments from "@/hooks/core/useRecentCommentList";
import { FaComment } from "react-icons/fa";
import Markdown from "../Markdown";
import { RecentCommentResponse } from "@/types";
import Link from "next/link";
import { Constants } from "@/constants";
import { Utils } from "@/utils";
import ReadMore from "../see-more";
import Skeleton from "react-loading-skeleton";
import { ErrorDisplay } from "../error-display";
import { Clock, ChevronRight, MessageSquare } from "lucide-react";

export default function RecentComments() {
  const { data, error, isLoading, mutate } = useRecentComments();
  return (
    <div className="border-2 border-[#311B56]/10 bg-[#FAF8F5] p-6 shadow-brutal md:p-8">
      <div className="mb-6 flex items-center gap-4">
        <span className="flex h-8 w-8 items-center justify-center border-2 border-[#311B56] bg-[#311B56] text-[#FAF8F5] shadow-brutal-sm">
          <FaComment size={14} />
        </span>
        <div>
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#311B56]/50">
            Cộng đồng
          </h2>
          <h3 className="text-lg font-black tracking-tight text-[#311B56] md:text-xl">
            Bình luận gần đây
          </h3>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading
          ? [...Array(5)].map((_, index) => <CommentSkeleton key={index} />)
          : data?.comments
              .slice(0, 5)
              .map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>

      {error && <ErrorDisplay error={error} refresh={mutate} />}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-3 border-2 border-[#311B56]/10 bg-[#F5F0EB] p-4 shadow-brutal-sm">
      <div className="flex items-center gap-3">
        <Skeleton
          width={40}
          height={40}
          baseColor="#F5F0EB"
          highlightColor="#FAF8F5"
        />
        <div className="flex w-full max-w-[200px] flex-col gap-1">
          <Skeleton
            className="h-4 w-3/4"
            baseColor="#F5F0EB"
            highlightColor="#FAF8F5"
          />
          <Skeleton
            className="h-3 w-1/2"
            baseColor="#F5F0EB"
            highlightColor="#FAF8F5"
          />
        </div>
      </div>
      <div>
        <Skeleton
          count={2}
          className="h-4 w-full"
          baseColor="#F5F0EB"
          highlightColor="#FAF8F5"
        />
      </div>
    </div>
  );
}

function Comment({ comment }: { comment: RecentCommentResponse }) {
  const type =
    comment.commentable_type === "App\\Models\\Chapter" ? "chapter" : "manga";

  const userBanned = comment.user.display_roles.includes(
    Constants.Roles.BANNED,
  );
  return (
    <div className="flex flex-col gap-3 border-2 border-[#311B56]/10 bg-[#F5F0EB]/50 p-4 shadow-brutal-sm transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-[#311B56]/30 hover:shadow-brutal">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            alt={comment.user.name}
            className={
              "size-10 shrink-0 border-2 border-[#311B56]/10 object-cover shadow-brutal-sm " +
              (userBanned ? "blur-sm" : "")
            }
            src={Utils.Url.getAvatarUrl(comment.user.avatar_path)}
            loading="lazy"
          />
          <div className="flex flex-col items-start gap-1">
            <div
              className={
                "text-sm font-bold text-[#311B56] " +
                (userBanned ? "text-[#311B56]/30 line-through" : "")
              }
              title={comment.user.name}
            >
              {comment.user.name}
            </div>
            <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[#311B56]/40">
              <Clock className="size-3" />
              {Utils.Date.formatNowDistance(new Date(comment.created_at))} trước
            </div>
          </div>
        </div>
      </div>

      <div className="break-words text-sm leading-relaxed text-[#311B56]/70">
        {userBanned ? (
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#311B56]/30">
            [ Bình luận đã bị xoá ]
          </div>
        ) : (
          <ReadMore maxHeight={150}>
            <Markdown content={comment.content} />
          </ReadMore>
        )}
      </div>

      <div className="flex items-center gap-2 border-t-2 border-[#311B56]/10 pt-3 font-mono text-[10px] font-bold uppercase tracking-wider text-[#311B56]/40">
        <MessageSquare className="size-3.5 shrink-0 opacity-70" />
        <div className="flex flex-wrap items-center gap-1.5 leading-snug">
          {comment.commentable.series && (
            <>
              <Link
                href={Constants.Routes.nettrom.manga(
                  comment.commentable.series.uuid,
                )}
                className="line-clamp-1 text-[#311B56]/60 transition-colors hover:text-[#311B56]"
                title={comment.commentable.series.title}
              >
                {comment.commentable.series.title}
              </Link>
              <ChevronRight className="size-3 shrink-0 opacity-50" />
            </>
          )}
          <Link
            href={
              type === "chapter"
                ? Constants.Routes.nettrom.chapter(comment.commentable.uuid)
                : Constants.Routes.nettrom.manga(comment.commentable.uuid)
            }
            className="line-clamp-1 text-[#311B56]/60 transition-colors hover:text-[#311B56]"
            title={comment.commentable.title}
          >
            {comment.commentable.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
