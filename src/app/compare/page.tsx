"use client";

import { useState, useEffect } from "react";
import Topbar from "@/components/Topbar";
import SearchModal from "@/components/SearchModal";

interface HistoryRow {
  period: string;
  korea: { king: string; years: string; detail: string };
  china: { king: string; years: string; detail: string };
  west: { king: string; years: string; detail: string };
}

const comparisonData: HistoryRow[] = [
  {
    period: "14C 후반",
    korea: { king: "태조 이성계", years: "1392–1398", detail: "조선 개국" },
    china: { king: "홍무제 (주원장)", years: "1368–1398", detail: "명 건국" },
    west: { king: "백년전쟁 종반", years: "1337–1453", detail: "영국 vs 프랑스" },
  },
  {
    period: "15C 초",
    korea: { king: "태종", years: "1400–1418", detail: "6조 직계제" },
    china: { king: "영락제", years: "1402–1424", detail: "정화의 대항해" },
    west: { king: "잔다르크", years: "1429", detail: "오를레앙 해방" },
  },
  {
    period: "15C 중",
    korea: { king: "세종", years: "1418–1450", detail: "훈민정음 창제 (1443)" },
    china: { king: "선덕제 / 정통제", years: "1425–1449", detail: "토목의 변 (1449)" },
    west: { king: "구텐베르크 활자", years: "c. 1440–1450", detail: "인쇄혁명 ✨" },
  },
  {
    period: "15C 후반",
    korea: { king: "세조 / 성종", years: "1455–1494", detail: "경국대전 (1485)" },
    china: { king: "성화제", years: "1464–1487", detail: "명 중기 안정기" },
    west: { king: "콘스탄티노플 함락", years: "1453", detail: "동로마 멸망" },
  },
  {
    period: "16C 초",
    korea: { king: "연산군 / 중종", years: "1494–1544", detail: "갑자사화·중종반정" },
    china: { king: "홍치제 / 정덕제", years: "1487–1521", detail: "명 쇠퇴 시작" },
    west: { king: "콜럼버스 신대륙", years: "1492", detail: "대항해 시대" },
  },
  {
    period: "16C 중",
    korea: { king: "선조", years: "1567–1608", detail: "임진왜란 (1592)" },
    china: { king: "만력제", years: "1572–1620", detail: "만력 조선 원정" },
    west: { king: "루터 종교개혁", years: "1517", detail: "프로테스탄트" },
  },
  {
    period: "17C",
    korea: { king: "인조 / 효종", years: "1623–1659", detail: "병자호란 (1636)" },
    china: { king: "숭정제 → 순치제", years: "1627–1661", detail: "명 멸망, 청 건국" },
    west: { king: "30년 전쟁", years: "1618–1648", detail: "베스트팔렌 조약" },
  },
  {
    period: "18C",
    korea: { king: "영조 / 정조", years: "1724–1800", detail: "탕평책, 수원화성" },
    china: { king: "건륭제", years: "1735–1796", detail: "청 전성기" },
    west: { king: "프랑스 대혁명", years: "1789", detail: "계몽주의" },
  },
  {
    period: "19C",
    korea: { king: "고종", years: "1863–1907", detail: "대한제국, 을사늑약" },
    china: { king: "서태후 / 광서제", years: "1861–1908", detail: "아편전쟁, 청 몰락" },
    west: { king: "산업혁명 완성", years: "19C", detail: "제국주의" },
  },
];

export default function ComparePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeRow, setActiveRow] = useState(2);

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
    <div className="h-screen flex flex-col" style={{ background: "var(--color-paper)" }}>
      <Topbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />

      <div className="px-8 pt-5 pb-2">
        <h1
          className="font-bold m-0"
          style={{ fontFamily: "'Gaegu', cursive", fontSize: "1.8rem" }}
        >
          같은 시대, 다른 나라{" "}
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
            동시 보기
          </span>
        </h1>
        <div
          style={{
            fontFamily: "'Nanum Pen Script', cursive",
            color: "var(--color-ink-2)",
            fontSize: "1rem",
          }}
        >
          한국 왕 옆에 그 당시 중국·서양의 통치자/사건을 나란히. 같은 행 = 같은 시기
        </div>
      </div>

      <div className="flex-1 mx-8 mb-4 overflow-hidden rounded-[5px]" style={{ border: "1.5px solid var(--color-line)" }}>
        <div className="grid h-full" style={{ gridTemplateColumns: "6rem 1fr 1fr 1fr" }}>
          {/* Time axis */}
          <div
            className="flex flex-col p-2.5 items-center"
            style={{ background: "var(--color-paper-2)" }}
          >
            <span
              className="mb-2"
              style={{ fontFamily: "'Gaegu', cursive", color: "var(--color-ink-2)", fontSize: "0.7rem" }}
            >
              동기화 축
            </span>
            {comparisonData.map((row, i) => (
              <div
                key={i}
                className="flex-1 flex items-center justify-center text-center w-full border-b border-dashed cursor-pointer"
                style={{
                  fontFamily: "'Gaegu', cursive",
                  fontSize: "0.85rem",
                  color: "var(--color-ink-2)",
                  borderColor: "var(--color-ink-3)",
                  background: i === activeRow ? "rgba(193,68,68,0.08)" : "transparent",
                  fontWeight: i === activeRow ? 700 : 400,
                }}
                onClick={() => setActiveRow(i)}
              >
                {row.period}
              </div>
            ))}
          </div>

          {/* Korea column */}
          <Column
            title="한국 · 조선"
            flagColor="rgba(193,68,68,0.18)"
            borderColor="var(--color-accent)"
            data={comparisonData.map((r) => r.korea)}
            activeRow={activeRow}
            onRowClick={setActiveRow}
          />

          {/* China column */}
          <Column
            title="중국 · 명/청"
            flagColor="rgba(212,168,71,0.20)"
            borderColor="var(--color-accent-3)"
            data={comparisonData.map((r) => r.china)}
            activeRow={activeRow}
            onRowClick={setActiveRow}
          />

          {/* West column */}
          <Column
            title="서양 · 유럽"
            flagColor="rgba(42,90,138,0.18)"
            borderColor="var(--color-accent-2)"
            data={comparisonData.map((r) => r.west)}
            activeRow={activeRow}
            onRowClick={setActiveRow}
            isLast
          />
        </div>
      </div>

      <div
        className="px-8 pb-4 flex gap-4"
        style={{
          fontFamily: "'Nanum Pen Script', cursive",
          color: "var(--color-ink-2)",
          fontSize: "0.85rem",
        }}
      >
        <span>· 한국 행을 클릭 → 모든 칼럼이 그 시기로 동기화</span>
        <span>· ✨는 한국과 직접 비교될 만한 사건</span>
      </div>
    </div>
  );
}

function Column({
  title,
  flagColor,
  borderColor,
  data,
  activeRow,
  onRowClick,
  isLast,
}: {
  title: string;
  flagColor: string;
  borderColor: string;
  data: { king: string; years: string; detail: string }[];
  activeRow: number;
  onRowClick: (i: number) => void;
  isLast?: boolean;
}) {
  return (
    <div
      className="flex flex-col px-3 py-2.5 overflow-y-auto"
      style={{
        borderRight: isLast ? "none" : "1.5px solid var(--color-line)",
      }}
    >
      <h3
        className="font-bold m-0 mb-1 flex items-center gap-1.5"
        style={{ fontFamily: "'Gaegu', cursive", fontSize: "1.1rem" }}
      >
        <span
          className="inline-block w-[22px] h-[16px] rounded-sm"
          style={{
            border: "1.5px solid var(--color-line)",
            background: flagColor,
          }}
        />
        {title}
      </h3>

      {data.map((item, i) => (
        <div
          key={i}
          className="flex-1 py-1.5 border-b border-dashed cursor-pointer pl-2 relative"
          style={{
            borderColor: "var(--color-ink-3)",
            borderLeft: `3px solid ${borderColor}`,
            background:
              i === activeRow
                ? `${flagColor.replace("0.18", "0.08").replace("0.20", "0.08")}`
                : "transparent",
          }}
          onClick={() => onRowClick(i)}
        >
          {i === activeRow && (
            <span
              className="absolute top-1 right-1.5 px-1.5 py-0 rounded-full"
              style={{
                fontFamily: "'Gaegu', cursive",
                fontSize: "0.65rem",
                border: "1px solid var(--color-line)",
                background: "var(--color-paper)",
              }}
            >
              현재 보기
            </span>
          )}
          <div
            className="font-bold"
            style={{ fontFamily: "'Gaegu', cursive", fontSize: "0.9rem" }}
          >
            {item.king}
          </div>
          <div
            style={{
              fontFamily: "'Gowun Dodum', sans-serif",
              color: "var(--color-ink-2)",
              fontSize: "0.75rem",
            }}
          >
            {item.years} · {item.detail}
          </div>
        </div>
      ))}
    </div>
  );
}
