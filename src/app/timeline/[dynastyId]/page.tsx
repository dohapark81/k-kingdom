"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import SearchModal from "@/components/SearchModal";
import KingPanel from "@/components/KingPanel";
import { dynasties, getDynasty } from "@/data/dynasties";

export default function DynastyTimelinePage() {
  const params = useParams();
  const router = useRouter();
  const dynastyId = params.dynastyId as string;
  const dynasty = getDynasty(dynastyId);

  const [hoveredKingId, setHoveredKingId] = useState<string | null>(null);
  const [selectedKingId, setSelectedKingId] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (dynasty && dynasty.kings.length > 0 && !selectedKingId) {
      setSelectedKingId(dynasty.kings[0].id);
    }
  }, [dynasty, selectedKingId]);

  if (!dynasty) {
    return (
      <div className="min-h-screen" style={{ background: "var(--color-paper)" }}>
        <Topbar onSearchOpen={() => setSearchOpen(true)} />
        <div className="p-10 text-center" style={{ fontFamily: "'Gaegu', cursive", fontSize: "1.5rem" }}>
          왕조를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  const activeKingId = hoveredKingId || selectedKingId;
  const activeKing = dynasty.kings.find((k) => k.id === activeKingId);

  return (
    <div className="h-screen flex flex-col" style={{ background: "var(--color-paper)" }}>
      <Topbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="flex-1 grid" style={{ gridTemplateColumns: "1fr 26rem", minHeight: 0 }}>
        <div className="overflow-y-auto px-10 pt-7 pb-10">
          {/* Dynasty tabs */}
          <div className="flex gap-2 mb-7 flex-wrap">
            {dynasties.map((d) => (
              <Link
                key={d.id}
                href={`/timeline/${d.id}`}
                className="flex-1 min-w-[5rem] text-center px-3 py-2.5 rounded no-underline transition-colors"
                style={{
                  fontFamily: "'Gaegu', cursive",
                  fontSize: "1rem",
                  border: "1.5px solid var(--color-line)",
                  background:
                    d.id === dynastyId
                      ? "var(--color-ink)"
                      : "var(--color-paper)",
                  color:
                    d.id === dynastyId
                      ? "var(--color-paper)"
                      : "var(--color-ink)",
                }}
              >
                {d.name}
              </Link>
            ))}
          </div>

          {/* Dynasty header */}
          <div
            className="mb-1"
            style={{
              fontFamily: "'Nanum Pen Script', cursive",
              color: "var(--color-ink-2)",
              fontSize: "1rem",
            }}
          >
            홈 › 왕조별 › <b style={{ color: "var(--color-ink)" }}>{dynasty.name}</b>
          </div>
          <h1
            className="font-bold m-0"
            style={{ fontFamily: "'Gaegu', cursive", fontSize: "2.2rem" }}
          >
            {dynasty.name}{" "}
            {dynasty.hanja && (
              <span className="font-normal" style={{ color: "var(--color-ink-2)", fontSize: "1.4rem" }}>
                {dynasty.hanja}
              </span>
            )}
          </h1>
          <div
            className="mb-6"
            style={{
              fontFamily: "'Nanum Pen Script', cursive",
              color: "var(--color-ink-2)",
              fontSize: "1.1rem",
            }}
          >
            {dynasty.yearStart < 0 ? `BC ${Math.abs(dynasty.yearStart)}` : dynasty.yearStart} – {dynasty.yearEnd}
            {dynasty.capital && ` · 수도: ${dynasty.capital}`}
            {` · ${dynasty.kingCount}대`}
          </div>

          {/* Vertical timeline */}
          <div className="grid" style={{ gridTemplateColumns: "7rem 1fr" }}>
            <div />
            <div className="relative">
              <div
                className="absolute top-1 bottom-0"
                style={{ left: "-3.6rem", width: 2, background: "var(--color-line)" }}
              />

              {dynasty.kings.map((king) => {
                const isActive = king.id === activeKingId;
                return (
                  <div
                    key={king.id}
                    className="relative cursor-pointer transition-colors"
                    style={{
                      padding: "0.8rem 0 1.2rem",
                      background: isActive
                        ? `${dynasty.bgColor.replace("0.08", "0.12").replace("0.06", "0.10")}`
                        : "transparent",
                      borderRadius: isActive ? 6 : 0,
                      paddingLeft: isActive ? "0.6rem" : 0,
                    }}
                    onMouseEnter={() => setHoveredKingId(king.id)}
                    onMouseLeave={() => setHoveredKingId(null)}
                    onClick={() => {
                      setSelectedKingId(king.id);
                      router.push(`/timeline/${dynastyId}/${king.id}`, { scroll: false });
                    }}
                  >
                    <div
                      className="absolute rounded-full"
                      style={{
                        left: "-4rem",
                        top: "1.1rem",
                        width: isActive ? 18 : 16,
                        height: isActive ? 18 : 16,
                        background: isActive
                          ? "var(--color-accent)"
                          : king.highlight
                            ? dynasty.color
                            : "var(--color-paper)",
                        border: `2px solid ${isActive ? "var(--color-accent)" : "var(--color-line)"}`,
                        transition: "all 0.15s",
                      }}
                    />

                    <span
                      className="absolute text-right"
                      style={{
                        left: "-7rem",
                        top: "0.9rem",
                        width: "6rem",
                        fontSize: "0.9rem",
                        fontFamily: "'Nanum Pen Script', cursive",
                        color: "var(--color-ink-2)",
                      }}
                    >
                      {king.reignStart}–{king.reignEnd}
                    </span>

                    <div
                      className="font-bold"
                      style={{
                        fontSize: "1.3rem",
                        fontFamily: "'Gaegu', cursive",
                        color: isActive ? "var(--color-accent)" : "var(--color-ink)",
                      }}
                    >
                      {king.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        fontFamily: "'Gowun Dodum', sans-serif",
                        color: "var(--color-ink-2)",
                      }}
                    >
                      제{king.order}대 · {king.summary}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <aside
          className="overflow-y-auto"
          style={{
            borderLeft: "1.5px solid var(--color-line)",
            background: "var(--color-paper-2)",
          }}
        >
          {activeKing ? (
            <KingPanel king={activeKing} dynasty={dynasty} />
          ) : (
            <div
              className="p-6 text-center"
              style={{
                fontFamily: "'Nanum Pen Script', cursive",
                color: "var(--color-ink-3)",
                fontSize: "1.1rem",
                paddingTop: "40%",
              }}
            >
              왕을 선택하거나 호버하면<br />
              상세 정보가 여기에 표시됩니다.
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
