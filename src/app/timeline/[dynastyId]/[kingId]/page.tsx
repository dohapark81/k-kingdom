import type { Metadata } from "next";
import { dynasties, getDynasty, getKing } from "@/data/dynasties";
import KingTimeline from "@/components/KingTimeline";

export function generateStaticParams() {
  return dynasties.flatMap((d) =>
    d.kings.map((k) => ({ dynastyId: d.id, kingId: k.id })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dynastyId: string; kingId: string }>;
}): Promise<Metadata> {
  const { dynastyId, kingId } = await params;
  const dynasty = getDynasty(dynastyId);
  const king = getKing(dynastyId, kingId);
  if (!dynasty || !king) return {};
  const title = `${king.name} ${king.hanja ?? ""} — ${dynasty.name} ${king.order}대`;
  const description = `${dynasty.name} ${king.order}대 ${king.name}(재위 ${king.reignStart}–${king.reignEnd}). ${king.summary}. 주요 사건·업적·과오를 한눈에.`;
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default function Page() {
  return <KingTimeline />;
}
