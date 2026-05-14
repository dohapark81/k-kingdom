"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type FontSizeLevel = 1 | 2 | 3 | 4 | 5;

interface FontSizeContextType {
  level: FontSizeLevel;
  setLevel: (level: FontSizeLevel) => void;
  scale: number;
}

const scales: Record<FontSizeLevel, number> = {
  1: 0.85,
  2: 1,
  3: 1.2,
  4: 1.45,
  5: 1.7,
};

const labels: Record<FontSizeLevel, string> = {
  1: "작게",
  2: "보통",
  3: "크게",
  4: "더 크게",
  5: "최대",
};

const FontSizeContext = createContext<FontSizeContextType>({
  level: 3,
  setLevel: () => {},
  scale: 1.2,
});

export function useFontSize() {
  return useContext(FontSizeContext);
}

export function FontSizeProvider({ children }: { children: ReactNode }) {
  const [level, setLevel] = useState<FontSizeLevel>(3);

  useEffect(() => {
    const saved = localStorage.getItem("k-kingdom-font-level");
    if (saved && [1, 2, 3, 4, 5].includes(Number(saved))) {
      setLevel(Number(saved) as FontSizeLevel);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("k-kingdom-font-level", String(level));
    document.documentElement.style.fontSize = `${scales[level] * 16}px`;
  }, [level]);

  return (
    <FontSizeContext.Provider value={{ level, setLevel, scale: scales[level] }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function FontSizeControl() {
  const { level, setLevel } = useFontSize();

  return (
    <div className="flex items-center gap-1.5">
      <span
        style={{
          fontFamily: "'Gaegu', cursive",
          fontSize: "0.8rem",
          color: "var(--color-ink-2)",
        }}
      >
        가
      </span>
      {([1, 2, 3, 4, 5] as FontSizeLevel[]).map((l) => (
        <button
          key={l}
          onClick={() => setLevel(l)}
          title={labels[l]}
          className="rounded-full cursor-pointer transition-all"
          style={{
            width: l === level ? 28 : 22,
            height: l === level ? 28 : 22,
            border: l === level
              ? "2px solid var(--color-accent)"
              : "1.5px solid var(--color-ink-3)",
            background: l === level ? "var(--color-accent)" : "var(--color-paper)",
            color: l === level ? "var(--color-paper)" : "var(--color-ink-2)",
            fontFamily: "'Gaegu', cursive",
            fontSize: l === level ? "0.75rem" : "0.65rem",
            fontWeight: l === level ? 700 : 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {l}
        </button>
      ))}
      <span
        style={{
          fontFamily: "'Gaegu', cursive",
          fontSize: "1.1rem",
          color: "var(--color-ink-2)",
        }}
      >
        가
      </span>
    </div>
  );
}
