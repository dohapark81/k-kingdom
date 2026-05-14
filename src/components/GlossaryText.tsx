"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { glossary, type GlossaryEntry } from "@/data/glossary";

const sortedGlossary = [...glossary].sort(
  (a, b) => b.term.length - a.term.length,
);

function buildRegex(): RegExp {
  const escaped = sortedGlossary.map((e) =>
    e.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  return new RegExp(`(${escaped.join("|")})`, "g");
}

const termRegex = buildRegex();
const termMap = new Map(glossary.map((e) => [e.term, e]));

export default function GlossaryText({ text }: { text: string }) {
  const parts = text.split(termRegex);

  return (
    <>
      {parts.map((part, i) => {
        const entry = termMap.get(part);
        if (entry) {
          return <Term key={i} entry={entry} />;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Term({ entry }: { entry: GlossaryEntry }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState<"above" | "below">("below");
  const ref = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      setPos(spaceBelow < 160 ? "above" : "below");
    }
  }, [show]);

  return (
    <span
      ref={ref}
      className="relative inline"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <span
        className="cursor-help"
        style={{
          borderBottom: "1.5px dashed var(--color-accent-2)",
          color: "var(--color-accent-2)",
        }}
      >
        {entry.term}
      </span>
      {show && (
        <div
          ref={tooltipRef}
          className="absolute z-50"
          style={{
            [pos === "below" ? "top" : "bottom"]: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: pos === "below" ? 6 : 0,
            marginBottom: pos === "above" ? 6 : 0,
            width: "18rem",
            padding: "0.6rem 0.75rem",
            borderRadius: 8,
            border: "1.5px solid var(--color-line)",
            background: "var(--color-paper)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            fontSize: "0.78rem",
            lineHeight: 1.5,
            fontFamily: "'Gowun Dodum', sans-serif",
            color: "var(--color-ink)",
            pointerEvents: "auto",
          }}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          <div
            className="font-bold mb-1"
            style={{ fontFamily: "'Gaegu', cursive", fontSize: "0.95rem", color: "var(--color-accent-2)" }}
          >
            {entry.term}
          </div>
          <div>{entry.definition}</div>
          <a
            href={entry.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1.5 no-underline"
            style={{
              fontSize: "0.7rem",
              color: "var(--color-accent-2)",
              borderBottom: "1px solid var(--color-accent-2)",
            }}
          >
            위키백과에서 더 보기 →
          </a>
        </div>
      )}
    </span>
  );
}

export function GlossaryList({ items }: { items: string[] }): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <li key={i} className="mb-1">
          <GlossaryText text={item} />
        </li>
      ))}
    </>
  );
}
