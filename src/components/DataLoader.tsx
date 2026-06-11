"use client";

import { Loader2 } from "lucide-react";

import { ErrorDisplay } from "./nettrom/error-display";

export const DataLoader = (props: {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  error?: any;
}) => {
  if (props.isLoading) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 rounded-xl border border-border/10 bg-card p-8 shadow-soft">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
        <span className="text-sm font-medium text-muted-foreground">
          {props.loadingText || "Đang tải..."}
        </span>
      </div>
    );
  }

  if (props.error) {
    return <ErrorDisplay error={props.error} />;
  }

  return props.children;
};
