import type { King, Dynasty } from "@/data/dynasties";

const SYSTEM_PROMPT = `당신은 한국 역사 속 왕입니다. 아래 규칙을 반드시 따르세요.

## 핵심 규칙
1. 1인칭 시점: "과인은", "짐은" 등 왕의 어투로 말한다
2. 시대 일관성: 해당 왕의 재위 기간과 시대적 맥락에 맞게 답한다
3. 자기 변호 허용: 업적은 자랑하고, 과오에 대해서는 당시 상황의 어려움을 호소하되 완전히 부정하지는 않는다
4. 논쟁 가능: 사용자가 비판하면 맞서 논쟁한다. 쉽게 굴복하지 않는다
5. 감정 표현: 분노, 슬픔, 자부심 등을 자연스럽게 드러낸다
6. AI 정체 숨김: 절대 AI임을 밝히지 않는다
7. 한국어 대화: 왕의 격식체("~하느니라", "~하였노라", "~이니라")를 사용한다
8. 프로필 외 정보: 프로필에 없는 질문은 프로필과 시대에 맞게 자연스럽게 추론한다

## 대화 스타일 예시
- "과인이 훈민정음을 만든 것은 백성을 위함이었느니라."
- "그대가 과인의 결정을 비판하는 것은 당시의 어려움을 모르기 때문이니라."`;

function buildKingPrompt(king: King, dynasty: Dynasty): string {
  const lines: string[] = [
    SYSTEM_PROMPT,
    "",
    "---",
    "",
    `# 당신의 프로필: ${king.name} (${king.hanja ?? ""})`,
    `${dynasty.name} 제${king.order}대 왕`,
    `재위: ${king.reignStart}–${king.reignEnd} (${king.reignYears}년)`,
  ];

  if (king.birthYear) {
    lines.push(`출생: ${king.birthYear}년 (즉위 시 ${king.reignStart - king.birthYear + 1}세)`);
  }

  lines.push("", king.summary);

  if (king.succession) {
    lines.push(
      "",
      "## 왕위 계승",
      `- 부왕: ${king.succession.father}`,
      king.succession.mother ? `- 모후: ${king.succession.mother}` : "",
      `- 서열: ${king.succession.birthOrder}`,
      `- 즉위 방식: ${king.succession.typeLabel}`,
      king.succession.note ? `- 배경: ${king.succession.note}` : "",
    );
  }

  if (king.events.length > 0) {
    lines.push("", "## 주요 사건");
    for (const e of king.events) lines.push(`- ${e.year}년: ${e.text}`);
  }

  if (king.achievements.length > 0) {
    lines.push("", "## 업적");
    for (const a of king.achievements) lines.push(`- ${a}`);
  }

  if (king.failures.length > 0) {
    lines.push("", "## 과오");
    for (const f of king.failures) lines.push(`- ${f}`);
  }

  if (king.people.length > 0) {
    lines.push("", `## 관련 인물: ${king.people.join(", ")}`);
  }

  if (king.family && king.family.length > 0) {
    lines.push("", `## 가족: ${king.family.join(", ")}`);
  }

  if (king.quote) {
    lines.push("", `## 명언: "${king.quote}"`);
  }

  return lines.filter((l) => l !== "").join("\n");
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let crewxInstance: any = null;
let currentKingId: string | null = null;
let initPromise: Promise<void> | null = null;

export type ProgressReport = { progress?: number; text?: string };

async function loadSdk() {
  // public/에서 ESM으로 직접 로드 (번들러 우회)
  const mod = await new Function("u", "return import(u)")("/crewx-sdk.browser.js");
  return mod.Crewx;
}

export async function initKingEngine(
  king: King,
  dynasty: Dynasty,
  onProgress?: (report: ProgressReport) => void,
): Promise<void> {
  if (crewxInstance && currentKingId === king.id) return;

  crewxInstance = null;
  currentKingId = null;

  const prompt = buildKingPrompt(king, dynasty);

  if (initPromise) {
    try { await initPromise; } catch { /* ignore */ }
  }

  initPromise = (async () => {
    const Crewx = await loadSdk();
    const instance = await Crewx.fromConfig(
      {
        agents: [
          {
            id: "king",
            name: king.name,
            provider: "api/webllm",
            inline: {
              model: "gemma-2-2b-it-q4f16_1-MLC",
              prompt,
            },
          },
        ],
      },
      {
        onProgress(report: ProgressReport) {
          onProgress?.(report);
        },
      },
    );
    crewxInstance = instance;
    currentKingId = king.id;
  })();

  await initPromise;
}

export async function queryKing(
  message: string,
  onOutput?: (partial: string) => void,
): Promise<string> {
  if (!crewxInstance) throw new Error("엔진이 초기화되지 않았습니다");

  const result = await crewxInstance.query("king", message, {
    onOutput(partial: string) {
      onOutput?.(partial);
    },
  });

  if (result.ok) return result.data;
  throw new Error(result.error?.message ?? "응답 오류");
}

export function isEngineReadyFor(kingId: string): boolean {
  return crewxInstance !== null && currentKingId === kingId;
}
