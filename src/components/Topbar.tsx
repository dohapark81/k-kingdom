"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontSizeControl } from "@/components/FontSizeProvider";

const navItems = [
  { label: "홈", href: "/" },
  { label: "왕조별", href: "/timeline/goryeo" },
  { label: "비교", href: "/compare" },
];

export default function Topbar({ onSearchOpen }: { onSearchOpen?: () => void }) {
  const pathname = usePathname();

  return (
    <header
      className="flex items-center gap-6 px-6 py-3 border-b flex-shrink-0"
      style={{
        borderColor: "var(--color-line)",
        background: "var(--color-paper)",
        fontFamily: "var(--hand)",
      }}
    >
      <Link
        href="/"
        className="font-bold no-underline"
        style={{ fontFamily: "var(--hand)", color: "var(--color-ink)", fontSize: "1.6rem" }}
      >
        한국역사 ⌁ 타임라인
      </Link>

      <nav className="flex gap-4" style={{ fontSize: "1.15rem" }}>
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="no-underline px-1 pb-0.5"
              style={{
                color: isActive ? "var(--color-accent)" : "var(--color-ink)",
                borderBottom: isActive
                  ? "2px solid var(--color-accent)"
                  : "2px solid transparent",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="ml-auto flex gap-4 items-center">
        <FontSizeControl />
        <button
          onClick={onSearchOpen}
          className="flex items-center gap-2 border rounded-full px-3.5 py-1.5 cursor-pointer"
          style={{
            borderColor: "var(--color-line)",
            background: "var(--color-paper)",
            fontFamily: "var(--hand)",
            fontSize: "0.95rem",
          }}
        >
          🔍 검색
          <kbd
            className="ml-1 px-1.5 py-0.5 rounded"
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
      </div>
    </header>
  );
}
