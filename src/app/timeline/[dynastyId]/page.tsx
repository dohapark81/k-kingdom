import { dynasties } from "@/data/dynasties";
import DynastyTimeline from "@/components/DynastyTimeline";

export function generateStaticParams() {
  return dynasties.map((d) => ({ dynastyId: d.id }));
}

export default function Page() {
  return <DynastyTimeline />;
}
