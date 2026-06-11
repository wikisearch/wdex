"use client";

import dynamic from "next/dynamic";

const SourceWelcomeDialog = dynamic(
  () => import("@/components/nettrom/layout/source-welcome-dialog"),
  { ssr: false },
);

export default function SourceDialogWrapper() {
  return <SourceWelcomeDialog />;
}
