import { dynasties } from "@/data/dynasties";
import KingTimeline from "@/components/KingTimeline";

export function generateStaticParams() {
  return dynasties.flatMap((d) =>
    d.kings.map((k) => ({ dynastyId: d.id, kingId: k.id })),
  );
}

export default function Page() {
  return <KingTimeline />;
}
