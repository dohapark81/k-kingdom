import type { Metadata } from "next";
import "./globals.css";
import { FontSizeProvider } from "@/components/FontSizeProvider";

const siteUrl = "https://dohapark81.github.io/k-kingdom";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "한국역사 타임라인 — 고려·조선 왕조",
    template: "%s | 한국역사 타임라인",
  },
  description:
    "고려 34대, 조선 27대 왕의 역사를 타임라인으로 한눈에. 왕별 주요 사건·업적·과오를 살펴보고, 동시대 세계사와 비교해보세요.",
  keywords: [
    "한국역사",
    "고려",
    "조선",
    "타임라인",
    "한국사",
    "왕조",
    "세종",
    "태조",
    "정조",
    "임진왜란",
    "훈민정음",
    "역사공부",
  ],
  authors: [{ name: "dohapark" }],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: siteUrl,
    siteName: "한국역사 타임라인",
    title: "한국역사 타임라인 — 고려·조선 왕조",
    description:
      "고려 34대, 조선 27대 왕의 역사를 타임라인으로 한눈에. 왕별 주요 사건·업적·과오, 동시대 세계사 비교.",
  },
  twitter: {
    card: "summary_large_image",
    title: "한국역사 타임라인 — 고려·조선 왕조",
    description:
      "고려 34대, 조선 27대 왕의 역사를 타임라인으로 한눈에.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <script
          type="importmap"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              imports: {
                "zod": "https://esm.run/zod",
                "js-yaml": "https://esm.run/js-yaml",
              },
            }),
          }}
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
