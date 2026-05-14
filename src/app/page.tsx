"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Topbar from "@/components/Topbar";
import SearchModal from "@/components/SearchModal";
import { dynasties } from "@/data/dynasties";

const eraColors: Record<string, string> = {
  goryeo: "rgba(193,68,68,0.06)",
  joseon: "rgba(60,60,60,0.06)",
};

const quickKings = [
  { label: "★ 세종", dynastyId: "joseon", kingId: "sejong", hot: true },
  { label: "태조 왕건", dynastyId: "goryeo", kingId: "taejo-goryeo" },
  { label: "광종", dynastyId: "goryeo", kingId: "gwangjong" },
  { label: "현종(고려)", dynastyId: "goryeo", kingId: "hyeonjong-goryeo" },
  { label: "공민왕", dynastyId: "goryeo", kingId: "gongmin" },
  { label: "태종", dynastyId: "joseon", kingId: "taejong" },
  { label: "정조", dynastyId: "joseon", kingId: "jeongjo" },
  { label: "영조", dynastyId: "joseon", kingId: "yeongjo" },
  { label: "광해군", dynastyId: "joseon", kingId: "gwanghae" },
  { label: "고종", dynastyId: "joseon", kingId: "gojong" },
];

const themes = [
  "개혁군주 모음",
  "외세 침입",
  "사화·옥사",
  "여왕",
  "최장 재위",
  "함께 본 동시대 세계",
];

export default function HomePage() {
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

  return (
    <div className="min-h-screen" style={{ background: "var(--color-paper)" }}>
      <Topbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Hero */}
      <section className="text-center pt-10 pb-5 px-10">
        <h1
          className="font-bold m-0 leading-none"
          style={{ fontFamily: "'Gaegu', cursive", fontSize: "3.2rem" }}
        >
          <span
            className="block font-normal mb-2"
            style={{
              fontFamily: "'Nanum Pen Script', cursive",
              color: "var(--color-ink-2)",
              fontSize: "1.2rem",
            }}
          >
            고려부터 조선까지
          </span>
          한국 왕조{" "}
          <span
            className="inline-block"
            style={{
              backgroundImage:
                "linear-gradient(transparent 85%, var(--color-ink) 85% 95%, transparent 95%)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              padding: "0 2px",
            }}
          >
            2,000년
          </span>
        </h1>
        <p
          className="mt-2"
          style={{
            fontFamily: "'Nanum Pen Script', cursive",
            color: "var(--color-ink-2)",
            fontSize: "1.2rem",
          }}
        >
          한 줄의 시간 위에서, 왕을 따라 사건과 평가를 한눈에.
        </p>

        {/* Search bar */}
        <button
          onClick={() => setSearchOpen(true)}
          className="mx-auto mt-4 max-w-[600px] w-full flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer text-left"
          style={{
            border: "1.5px solid var(--color-line)",
            background: "var(--color-paper)",
            boxShadow: "3px 3px 0 var(--color-ink)",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>🔍</span>
          <span
            className="flex-1"
            style={{
              fontFamily: "'Nanum Pen Script', cursive",
              color: "var(--color-ink-3)",
              fontSize: "1.05rem",
            }}
          >
            왕·사건·연도로 검색…
          </span>
          <kbd
            className="px-2 py-1 rounded"
            style={{
              fontSize: "0.75rem",
              border: "1px solid var(--color-ink-3)",
              background: "var(--color-paper-2)",
              fontFamily: "monospace",
            }}
          >
            ⌘K
          </kbd>
        </button>
      </section>

      {/* Era Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-10 lg:px-[60px] pt-7 pb-2">
        {dynasties.map((d) => (
          <Link
            key={d.id}
            href={`/timeline/${d.id}`}
            className="relative block rounded-[5px] p-4 no-underline transition-shadow hover:shadow-md"
            style={{
              border: "1.5px solid var(--color-line)",
              background: `linear-gradient(135deg, ${eraColors[d.id] || "transparent"}, var(--color-paper))`,
              color: "var(--color-ink)",
              minHeight: "8rem",
            }}
          >
            <span
              className="absolute top-2 right-3"
              style={{ fontFamily: "monospace", color: "var(--color-ink-3)", fontSize: "0.6rem" }}
            >
              /{d.id}
            </span>
            <div
              className="font-bold"
              style={{ fontFamily: "'Gaegu', cursive", fontSize: "1.5rem" }}
            >
              {d.name}
            </div>
            <div
              style={{ fontFamily: "'Gowun Dodum', sans-serif", color: "var(--color-ink-2)", fontSize: "0.8rem" }}
            >
              {d.yearStart < 0 ? `BC ${Math.abs(d.yearStart)}` : d.yearStart} – {d.yearEnd}
            </div>
            <div
              className="mt-2"
              style={{
                fontFamily: "'Nanum Pen Script', cursive",
                color: "var(--color-ink-2)",
                fontSize: "0.95rem",
              }}
            >
              {d.description}
            </div>
            <div
              className="absolute bottom-3 right-3"
              style={{ fontFamily: "'Gowun Dodum', sans-serif", color: "var(--color-ink-3)", fontSize: "0.7rem" }}
            >
              왕 {d.kingCount}명
            </div>
          </Link>
        ))}
      </section>

      {/* Quick links + Today in history */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 px-10 lg:px-[60px] py-5">
        <div>
          <h3
            className="m-0 mb-2 inline-block"
            style={{
              fontFamily: "'Gaegu', cursive",
              fontSize: "1.2rem",
              backgroundImage:
                "linear-gradient(transparent 85%, var(--color-ink) 85% 95%, transparent 95%)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              padding: "0 2px",
            }}
          >
            바로 가기
          </h3>
          <div className="flex flex-wrap gap-2">
            {quickKings.map((k) => (
              <Link
                key={k.kingId}
                href={`/timeline/${k.dynastyId}/${k.kingId}`}
                className="px-3 py-1.5 rounded-full no-underline transition-colors"
                style={{
                  fontFamily: "'Gaegu', cursive",
                  fontSize: "0.95rem",
                  border: "1.5px solid var(--color-line)",
                  background: k.hot
                    ? "var(--color-ink)"
                    : "var(--color-paper)",
                  color: k.hot ? "var(--color-paper)" : "var(--color-ink)",
                }}
              >
                {k.label}
              </Link>
            ))}
          </div>

          <h3
            className="mt-4 mb-2 inline-block"
            style={{
              fontFamily: "'Gaegu', cursive",
              fontSize: "1.2rem",
              backgroundImage:
                "linear-gradient(transparent 85%, var(--color-ink) 85% 95%, transparent 95%)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              padding: "0 2px",
            }}
          >
            테마로 둘러보기
          </h3>
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full"
                style={{
                  fontFamily: "'Gaegu', cursive",
                  fontSize: "0.95rem",
                  border: "1.5px solid var(--color-line)",
                  background: "var(--color-paper)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3
            className="m-0 mb-2 inline-block"
            style={{
              fontFamily: "'Gaegu', cursive",
              fontSize: "1.2rem",
              backgroundImage:
                "linear-gradient(transparent 85%, var(--color-ink) 85% 95%, transparent 95%)",
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              padding: "0 2px",
            }}
          >
            오늘의 한국사
          </h3>
          <div
            className="p-3 rounded-md"
            style={{
              border: "1.5px solid var(--color-line)",
              background: "var(--color-paper-2)",
            }}
          >
            {[
              { year: "1392", text: "이성계 즉위 (조선 건국 직전)", king: "태조" },
              { year: "1592", text: "임진왜란 한산도대첩 직전", king: "선조" },
              { year: "1796", text: "화성 완공", king: "정조" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-3 py-1.5"
                style={{
                  fontFamily: "'Gowun Dodum', sans-serif",
                  fontSize: "0.85rem",
                  borderBottom:
                    i < 2 ? "1px dashed var(--color-ink-3)" : "none",
                }}
              >
                <b
                  style={{ fontFamily: "'Gaegu', cursive", minWidth: "3.5rem" }}
                >
                  {item.year}
                </b>
                <span className="flex-1">{item.text}</span>
                <span style={{ color: "var(--color-ink-3)" }}>
                  → {item.king}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* URL guide */}
      <section
        className="mx-10 lg:mx-[60px] mb-6 p-3 rounded leading-relaxed"
        style={{
          fontFamily: "monospace",
          fontSize: "0.75rem",
          color: "var(--color-ink-2)",
          background: "var(--color-paper-2)",
          border: "1.5px dashed var(--color-line)",
        }}
      >
        <span
          className="block mb-1"
          style={{
            fontFamily: "'Gaegu', cursive",
            color: "var(--color-ink)",
            fontSize: "0.9rem",
          }}
        >
          URL로 바로 접근 — 공유·북마크 친화
        </span>
        /<b style={{ color: "var(--color-accent)" }}>joseon</b>/sejong &nbsp;·&nbsp;
        /<b style={{ color: "var(--color-accent)" }}>goryeo</b>/gwangjong &nbsp;·&nbsp;
        /timeline/<b style={{ color: "var(--color-accent)" }}>goguryeo</b>
      </section>
    </div>
  );
}
