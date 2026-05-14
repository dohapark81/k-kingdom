"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchKings, searchEvents, searchPeople } from "@/data/dynasties";

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const kingResults = query.length >= 1 ? searchKings(query) : [];
  const eventResults = query.length >= 1 ? searchEvents(query).slice(0, 5) : [];
  const peopleResults = query.length >= 1 ? searchPeople(query).slice(0, 4) : [];

  type FlatItem =
    | { type: "king"; data: (typeof kingResults)[0] }
    | { type: "event"; data: (typeof eventResults)[0] }
    | { type: "person"; data: (typeof peopleResults)[0] };

  const flatItems: FlatItem[] = [
    ...kingResults.map((d) => ({ type: "king" as const, data: d })),
    ...eventResults.map((d) => ({ type: "event" as const, data: d })),
    ...peopleResults.map((d) => ({ type: "person" as const, data: d })),
  ];

  const navigate = useCallback(
    (item: FlatItem) => {
      const dynastyId = item.data.dynasty.id;
      const kingId = item.data.king.id;
      router.push(`/timeline/${dynastyId}/${kingId}`);
      onClose();
    },
    [router, onClose],
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flatItems[activeIndex]) {
        navigate(flatItems[activeIndex]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, flatItems, activeIndex, navigate, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.3)" }}
      onClick={onClose}
    >
      <div
        className="w-full rounded-lg overflow-hidden"
        style={{
          maxWidth: "36rem",
          border: "1.5px solid var(--color-line)",
          background: "var(--color-paper)",
          boxShadow: "4px 4px 0 var(--color-ink)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='왕·사건·연도로 검색…'
            className="w-full border-0 border-b pb-2 outline-none"
            style={{
              borderColor: "var(--color-line)",
              fontFamily: "var(--hand)",
              background: "transparent",
              fontSize: "1.2rem",
            }}
          />
          <div
            className="mt-1.5"
            style={{
              fontFamily: "'Nanum Pen Script', cursive",
              color: "var(--color-ink-3)",
              fontSize: "0.8rem",
            }}
          >
            왕 · 사건 · 인물 · 연도 · 키워드 ↑↓ 이동, Enter 선택
          </div>
        </div>

        {query.length >= 1 && (
          <div className="px-4 pb-4 max-h-[24rem] overflow-y-auto">
            {kingResults.length > 0 && (
              <div className="mt-2">
                <div
                  className="pb-0.5 mb-1 border-b border-dashed"
                  style={{
                    fontFamily: "var(--hand)",
                    color: "var(--color-ink-2)",
                    borderColor: "var(--color-ink-3)",
                    fontSize: "0.8rem",
                  }}
                >
                  왕 · {kingResults.length}건
                </div>
                {kingResults.map((r, i) => {
                  const globalIdx = i;
                  return (
                    <div
                      key={r.king.id}
                      className="flex gap-2 py-1.5 px-1 rounded cursor-pointer items-center"
                      style={{
                        background:
                          activeIndex === globalIdx
                            ? "rgba(193,68,68,0.10)"
                            : "transparent",
                        fontFamily: "'Gowun Dodum', sans-serif",
                        fontSize: "0.85rem",
                      }}
                      onClick={() =>
                        navigate({ type: "king", data: r })
                      }
                      onMouseEnter={() => setActiveIndex(globalIdx)}
                    >
                      <span
                        className="font-bold min-w-[70px]"
                        style={{ fontFamily: "var(--hand)" }}
                      >
                        {r.king.name}
                      </span>
                      <span
                        className="text-[10px] min-w-[70px]"
                        style={{ color: "var(--color-ink-3)" }}
                      >
                        {r.king.reignStart}–{r.king.reignEnd}
                      </span>
                      <span
                        className="flex-1"
                        style={{ color: "var(--color-ink-2)" }}
                      >
                        {r.dynasty.name} {r.king.order}대 · {r.king.summary}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {eventResults.length > 0 && (
              <div className="mt-2">
                <div
                  className="pb-0.5 mb-1 border-b border-dashed"
                  style={{
                    fontFamily: "var(--hand)",
                    color: "var(--color-ink-2)",
                    borderColor: "var(--color-ink-3)",
                  }}
                >
                  사건 · {eventResults.length}건
                </div>
                {eventResults.map((r, i) => {
                  const globalIdx = kingResults.length + i;
                  return (
                    <div
                      key={`${r.king.id}-${r.year}-${i}`}
                      className="flex gap-2 py-1.5 px-1 rounded cursor-pointer items-center"
                      style={{
                        background:
                          activeIndex === globalIdx
                            ? "rgba(193,68,68,0.10)"
                            : "transparent",
                        fontFamily: "'Gowun Dodum', sans-serif",
                        fontSize: "0.85rem",
                      }}
                      onClick={() =>
                        navigate({ type: "event", data: r })
                      }
                      onMouseEnter={() => setActiveIndex(globalIdx)}
                    >
                      <span
                        className="font-bold min-w-[70px]"
                        style={{ fontFamily: "var(--hand)" }}
                      >
                        {r.text.slice(0, 12)}
                        {r.text.length > 12 ? "…" : ""}
                      </span>
                      <span
                        className="text-[10px] min-w-[70px]"
                        style={{ color: "var(--color-ink-3)" }}
                      >
                        {r.year}
                      </span>
                      <span
                        className="flex-1"
                        style={{ color: "var(--color-ink-2)" }}
                      >
                        {r.king.name} — {r.dynasty.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {peopleResults.length > 0 && (
              <div className="mt-2">
                <div
                  className="pb-0.5 mb-1 border-b border-dashed"
                  style={{
                    fontFamily: "var(--hand)",
                    color: "var(--color-ink-2)",
                    borderColor: "var(--color-ink-3)",
                  }}
                >
                  인물 · {peopleResults.length}건
                </div>
                {peopleResults.map((r, i) => {
                  const globalIdx =
                    kingResults.length + eventResults.length + i;
                  return (
                    <div
                      key={`${r.person}-${r.king.id}-${i}`}
                      className="flex gap-2 py-1.5 px-1 rounded cursor-pointer items-center"
                      style={{
                        background:
                          activeIndex === globalIdx
                            ? "rgba(193,68,68,0.10)"
                            : "transparent",
                        fontFamily: "'Gowun Dodum', sans-serif",
                        fontSize: "0.85rem",
                      }}
                      onClick={() =>
                        navigate({ type: "person", data: r })
                      }
                      onMouseEnter={() => setActiveIndex(globalIdx)}
                    >
                      <span
                        className="font-bold min-w-[70px]"
                        style={{ fontFamily: "var(--hand)" }}
                      >
                        {r.person}
                      </span>
                      <span
                        className="flex-1"
                        style={{ color: "var(--color-ink-2)" }}
                      >
                        {r.king.name} 시대 — {r.dynasty.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {flatItems.length === 0 && (
              <div
                className="text-center py-6"
                style={{
                  fontFamily: "'Nanum Pen Script', cursive",
                  color: "var(--color-ink-3)",
                  fontSize: 16,
                }}
              >
                &ldquo;{query}&rdquo;에 해당하는 결과가 없습니다.
              </div>
            )}
          </div>
        )}

        <div
          className="flex justify-between px-3 py-2 text-[11px] border-t"
          style={{
            fontFamily: "'Nanum Pen Script', cursive",
            color: "var(--color-ink-2)",
            borderColor: "var(--color-ink-3)",
            background: "var(--color-paper-2)",
          }}
        >
          <span>↑↓ 이동 · ↵ 열기</span>
          <span>Esc 닫기</span>
        </div>
      </div>
    </div>
  );
}
