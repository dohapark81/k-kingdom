import type { Metadata } from "next";
import { dynasties, getDynasty } from "@/data/dynasties";
import DynastyTimeline from "@/components/DynastyTimeline";

export function generateStaticParams() {
  return dynasties.map((d) => ({ dynastyId: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dynastyId: string }>;
}): Promise<Metadata> {
  const { dynastyId } = await params;
  const dynasty = getDynasty(dynastyId);
  if (!dynasty) return {};
  const title = `${dynasty.name} ${dynasty.hanja ?? ""} — ${dynasty.kingCount}대 왕 타임라인`;
  const description = `${dynasty.name}(${dynasty.yearStart}–${dynasty.yearEnd}) ${dynasty.kingCount}대 왕의 재위 기간, 주요 사건, 업적과 과오를 세로 타임라인으로 한눈에.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function Page() {
  return <DynastyTimeline />;
}
