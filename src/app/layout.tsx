import type { Metadata } from "next";
import "./globals.css";
import { FontSizeProvider } from "@/components/FontSizeProvider";

export const metadata: Metadata = {
  title: "한국역사 타임라인 — 고려·조선",
  description: "고려 34대, 조선 27대 왕의 역사를 타임라인으로 한눈에. 왕을 따라 사건과 평가를 살펴보세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Gowun+Dodum&family=Nanum+Pen+Script&display=swap"
        />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ fontFamily: "'Gowun Dodum', sans-serif" }}
      >
        <FontSizeProvider>{children}</FontSizeProvider>
      </body>
    </html>
  );
}
