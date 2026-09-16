"use client";

import dynamic from "next/dynamic";

/* El diálogo (Base UI) solo se descarga en el cliente, y solo si hay video configurado. */
const VideoDialog = dynamic(
  () => import("@/components/sections/hero/VideoDialog").then((m) => m.VideoDialog),
  { ssr: false },
);

interface HeroVideoButtonProps {
  url: string;
  label: string;
}

export function HeroVideoButton(props: HeroVideoButtonProps) {
  return <VideoDialog {...props} />;
}
