"use client";

import type { King, Dynasty } from "@/data/dynasties";
import GlossaryText from "@/components/GlossaryText";

export default function KingPanel({
  king,
  dynasty,
}: {
  king: King;
  dynasty: Dynasty;
}) {
  return (
    <div className="h-full overflow-y-auto p-6" style={{ fontFamily: "'Gowun Dodum', sans-serif" }}>
      <div className="flex gap-4 items-start">
        <div
          className="rounded flex-shrink-0 flex items-center justify-center"
          style={{
            width: "5rem",
            height: "6.2rem",
            fontSize: "0.65rem",
            border: "1.5px solid var(--color-line)",
            background: `linear-gradient(135deg, transparent calc(50% - 1px), var(--color-ink-3) 50%, transparent calc(50% + 1px)),
                         linear-gradient(45deg, transparent calc(50% - 1px), var(--color-ink-3) 50%, transparent calc(50% + 1px)),
                         var(--color-paper-2)`,
            color: "var(--color-ink-2)",
            fontFamily: "monospace",
          }}
        >
          어진
        </div>
        <div>
          <h3
            className="font-bold m-0"
            style={{ fontFamily: "var(--hand)", fontSize: "1.5rem" }}
          >
            {king.name} {king.hanja && <span className="font-normal" style={{ color: "var(--color-ink-2)", fontSize: "1.1rem" }}>{king.hanja}</span>}
          </h3>
          <div
            className="mt-0.5"
            style={{
              fontFamily: "'Nanum Pen Script', cursive",
              color: "var(--color-ink-2)",
              fontSize: "1rem",
            }}
          >
            {dynasty.name} {king.order}대 · 재위 {king.reignStart}–{king.reignEnd} · {king.reignYears}년
            {king.birthYear && (
              <span style={{ display: "block", fontSize: "0.85rem" }}>
                출생 {king.birthYear}년 · 즉위 시 {king.reignStart - king.birthYear + 1}세
              </span>
            )}
          </div>
          {king.tags && (
            <div className="flex gap-1.5 flex-wrap mt-2">
              {king.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full"
                  style={{
                    fontSize: "0.8rem",
                    border: `1.2px solid ${
                      tag.includes("★")
                        ? "var(--color-accent)"
                        : tag.includes("폭군") || tag.includes("폐위")
                          ? "var(--color-accent)"
                          : "var(--color-line)"
                    }`,
                    color: tag.includes("★") || tag.includes("폭군") || tag.includes("폐위")
                      ? "var(--color-accent)"
                      : "var(--color-ink)",
                    fontFamily: "var(--hand)",
                    background: "var(--color-paper)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {king.succession && (
        <div
          className="mt-4 p-3 rounded"
          style={{
            border: king.succession.legitimate
              ? "1.5px solid var(--color-accent-2)"
              : "1.5px dashed var(--color-ink-3)",
            background: king.succession.legitimate
              ? "rgba(42,90,138,0.06)"
              : "var(--color-paper-2)",
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className="px-2 py-0.5 rounded-full font-bold"
              style={{
                fontSize: "0.75rem",
                fontFamily: "var(--hand)",
                background: king.succession.legitimate ? "var(--color-accent-2)" : "var(--color-ink-3)",
                color: "var(--color-paper)",
              }}
            >
              {king.succession.legitimate ? "적통" : "비적통"}
            </span>
            <span
              className="font-bold"
              style={{
                fontSize: "0.85rem",
                fontFamily: "var(--hand)",
                color: king.succession.legitimate ? "var(--color-accent-2)" : "var(--color-ink-2)",
              }}
            >
              {king.succession.typeLabel}
            </span>
          </div>
          <div style={{ fontSize: "0.8rem", lineHeight: 1.7 }}>
            <div><b style={{ fontFamily: "var(--hand)" }}>부왕:</b> {king.succession.father}</div>
            {king.succession.mother && <div><b style={{ fontFamily: "var(--hand)" }}>모후:</b> {king.succession.mother}</div>}
            <div><b style={{ fontFamily: "var(--hand)" }}>서열:</b> {king.succession.birthOrder}</div>
            {king.succession.note && (
              <div
                className="mt-1 pt-1"
                style={{
                  borderTop: "1px dashed var(--color-ink-3)",
                  color: "var(--color-ink-2)",
                  fontSize: "0.75rem",
                }}
              >
                💡 {king.succession.note}
              </div>
            )}
          </div>
        </div>
      )}

      <Section title="주요 사건" count={`${king.events.length}건`}>
        <ul className="pl-4 m-0 leading-relaxed list-disc" style={{ fontFamily: "'Gowun Dodum', sans-serif", fontSize: "0.85rem" }}>
          {king.events.map((e, i) => {
            const age = king.birthYear ? e.year - king.birthYear + 1 : null;
            return (
              <li key={i} className="mb-1">
                <b style={{ fontFamily: "var(--hand)" }}>{e.year}</b>
                {age && age > 0 && (
                  <span style={{ color: "var(--color-ink-3)", fontSize: "0.75rem", marginLeft: 4 }}>
                    ({age}세)
                  </span>
                )}
                {" "}<GlossaryText text={e.text} />
              </li>
            );
          })}
        </ul>
      </Section>

      {king.achievements.length > 0 && (
        <Section title="⊕ 잘한 점" subtitle="업적" color="var(--color-accent-2)">
          <ul className="pl-4 m-0 leading-relaxed list-disc" style={{ fontSize: "0.85rem" }}>
            {king.achievements.map((a, i) => (
              <li key={i} className="mb-1"><GlossaryText text={a} /></li>
            ))}
          </ul>
        </Section>
      )}

      {king.failures.length > 0 && (
        <Section title="⊖ 못한 점" subtitle="과오" color="var(--color-accent)">
          <ul className="pl-4 m-0 leading-relaxed list-disc" style={{ fontSize: "0.85rem" }}>
            {king.failures.map((f, i) => (
              <li key={i} className="mb-1"><GlossaryText text={f} /></li>
            ))}
          </ul>
        </Section>
      )}

      {king.people.length > 0 && (
        <Section title="함께한 인물">
          <div className="flex gap-2 flex-wrap mt-1.5">
            {king.people.map((p) => (
              <span
                key={p}
                className="inline-flex items-center px-3 py-1 rounded-full"
                style={{
                  fontSize: "0.8rem",
                  border: "1.2px solid var(--color-line)",
                  fontFamily: "var(--hand)",
                  background: "var(--color-paper)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </Section>
      )}

      {king.family && king.family.length > 0 && (
        <Section title="가족 관계">
          <ul className="pl-4 m-0 leading-relaxed list-disc" style={{ fontSize: "0.85rem" }}>
            {king.family.map((f, i) => (
              <li key={i} className="mb-1">{f}</li>
            ))}
          </ul>
        </Section>
      )}

      {king.quote && (
        <div
          className="mt-5 pl-4 italic"
          style={{
            fontSize: "1.1rem",
            borderLeft: "3px solid var(--color-accent)",
            fontFamily: "'Nanum Pen Script', cursive",
            color: "var(--color-ink-2)",
          }}
        >
          &ldquo;{king.quote}&rdquo;
        </div>
      )}
    </div>
  );
}

function Section({
  title,
  subtitle,
  color,
  count,
  children,
}: {
  title: string;
  subtitle?: string;
  color?: string;
  count?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="mt-4 p-3 rounded-r"
      style={{
        borderLeft: `3px solid ${color || "var(--color-ink)"}`,
        background: "var(--color-paper-2)",
      }}
    >
      <div
        className="font-bold flex items-center gap-2"
        style={{
          fontSize: "0.95rem",
          fontFamily: "var(--hand)",
          color: color || "var(--color-ink)",
        }}
      >
        {title}
        {subtitle && (
          <span
            className="font-normal"
            style={{ color: "var(--color-ink-3)", fontFamily: "'Gowun Dodum', sans-serif", fontSize: "0.8rem" }}
          >
            {subtitle}
          </span>
        )}
        {count && (
          <span
            className="font-normal"
            style={{ color: "var(--color-ink-3)", fontFamily: "'Gowun Dodum', sans-serif", fontSize: "0.8rem" }}
          >
            {count}
          </span>
        )}
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
