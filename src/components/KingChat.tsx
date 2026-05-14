"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { King, Dynasty } from "@/data/dynasties";
import { initKingEngine, queryKing, isEngineReadyFor } from "@/lib/crewx";
import type { ProgressReport } from "@/lib/crewx";

interface ChatMessage {
  role: "user" | "king";
  text: string;
}

type EngineState =
  | { status: "idle" }
  | { status: "loading"; label: string; pct: number }
  | { status: "ready" }
  | { status: "error"; message: string };

export default function KingChat({
  king,
  dynasty,
  onClose,
}: {
  king: King;
  dynasty: Dynasty;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [engine, setEngine] = useState<EngineState>(
    isEngineReadyFor(king.id) ? { status: "ready" } : { status: "idle" },
  );
  const [streamText, setStreamText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, streamText]);

  useEffect(() => {
    if (engine.status === "ready") inputRef.current?.focus();
  }, [engine.status]);

  const startEngine = useCallback(async () => {
    setEngine({ status: "loading", label: "초기화 중...", pct: 0 });
    try {
      await initKingEngine(king, dynasty, (report: ProgressReport) => {
        setEngine({
          status: "loading",
          label: report.text ?? "모델 로딩 중...",
          pct: Math.round((report.progress ?? 0) * 100),
        });
      });
      setEngine({ status: "ready" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "알 수 없는 오류";
      setEngine({ status: "error", message: msg });
    }
  }, [king, dynasty]);

  const suggestedTopics = getSuggestedTopics(king);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setInput("");
      setMessages((prev) => [...prev, { role: "user", text }]);
      setLoading(true);
      setStreamText("");

      try {
        const reply = await queryKing(text, (partial) => {
          setStreamText(partial);
        });
        setMessages((prev) => [...prev, { role: "king", text: reply }]);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "알 수 없는 오류";
        setMessages((prev) => [...prev, { role: "king", text: `⚠️ 오류: ${msg}` }]);
      } finally {
        setLoading(false);
        setStreamText("");
        inputRef.current?.focus();
      }
    },
    [loading],
  );

  return (
    <ChatShell king={king} onClose={onClose}>
      {engine.status === "idle" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <div style={{ fontSize: "2rem" }}>👑</div>
          <div style={{ fontFamily: "var(--hand)", fontSize: "1.1rem" }}>
            {king.name}과 대화하기
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--color-ink-2)", lineHeight: 1.8 }}>
            브라우저에서 AI 모델을 로딩합니다 (WebGPU)
            <br />
            첫 실행 시 모델 다운로드가 필요합니다
          </div>
          <button
            onClick={startEngine}
            style={{
              marginTop: "0.5rem",
              padding: "0.5rem 1.5rem",
              fontSize: "0.85rem",
              border: "none",
              borderRadius: "999px",
              background: "var(--color-ink)",
              color: "var(--color-paper)",
              cursor: "pointer",
              fontFamily: "var(--hand)",
            }}
          >
            대화 시작
          </button>
          <div style={{ fontSize: "0.7rem", color: "var(--color-ink-3)", marginTop: "0.25rem" }}>
            Chrome 113+ / Edge 113+ 필요
          </div>
        </div>
      )}

      {engine.status === "loading" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6">
          <div style={{ fontFamily: "var(--hand)", fontSize: "1rem" }}>
            모델 준비 중...
          </div>
          <div style={{ width: "100%", maxWidth: "18rem" }}>
            <div
              style={{
                height: "6px",
                background: "var(--color-paper)",
                borderRadius: "3px",
                border: "1px solid var(--color-line)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${engine.pct}%`,
                  background: "var(--color-accent-2)",
                  borderRadius: "3px",
                  transition: "width 0.3s",
                }}
              />
            </div>
            <div
              className="flex justify-between mt-1"
              style={{ fontSize: "0.7rem", color: "var(--color-ink-3)" }}
            >
              <span style={{ maxWidth: "80%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {engine.label}
              </span>
              <span>{engine.pct}%</span>
            </div>
          </div>
        </div>
      )}

      {engine.status === "error" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4 text-center">
          <div style={{ fontSize: "2rem" }}>⚠️</div>
          <div style={{ fontFamily: "var(--hand)", fontSize: "1rem", color: "var(--color-accent)" }}>
            초기화 실패
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--color-ink-2)" }}>
            {engine.message}
          </div>
          <div style={{ fontSize: "0.7rem", color: "var(--color-ink-3)", lineHeight: 1.7 }}>
            WebGPU 지원 브라우저가 필요합니다
            <br />
            chrome://flags/#enable-unsafe-webgpu 활성화 필요할 수 있음
          </div>
          <button
            onClick={startEngine}
            style={{
              marginTop: "0.5rem",
              padding: "0.4rem 1.2rem",
              fontSize: "0.8rem",
              border: "1.5px solid var(--color-line)",
              borderRadius: "999px",
              background: "var(--color-paper)",
              cursor: "pointer",
              fontFamily: "var(--hand)",
            }}
          >
            다시 시도
          </button>
        </div>
      )}

      {engine.status === "ready" && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3" style={{ fontSize: "0.85rem" }}>
            {messages.length === 0 && !loading && (
              <div className="flex flex-col gap-3">
                <div style={{ color: "var(--color-ink-2)", fontSize: "0.8rem", textAlign: "center", marginTop: "0.5rem" }}>
                  {king.name}에게 질문하거나 논쟁을 시작해보세요
                </div>
                {suggestedTopics.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-2">
                    <div style={{ fontSize: "0.75rem", color: "var(--color-ink-3)", fontFamily: "var(--hand)" }}>
                      추천 주제
                    </div>
                    {suggestedTopics.map((topic, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(topic)}
                        className="text-left px-3 py-2 rounded transition-colors"
                        style={{
                          fontSize: "0.8rem",
                          border: "1px solid var(--color-line)",
                          background: "var(--color-paper)",
                          cursor: "pointer",
                          color: "var(--color-ink)",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "var(--color-paper-2)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-paper)"; }}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className="mb-3" style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
                <div
                  className="inline-block px-3 py-2 rounded-lg"
                  style={{
                    maxWidth: "85%",
                    textAlign: "left",
                    whiteSpace: "pre-wrap",
                    lineHeight: 1.7,
                    ...(msg.role === "user"
                      ? { background: "var(--color-accent-2)", color: "#fff", borderBottomRightRadius: "4px" }
                      : { background: "var(--color-paper-2)", border: "1px solid var(--color-line)", borderBottomLeftRadius: "4px", fontFamily: "'Gowun Dodum', sans-serif" }),
                  }}
                >
                  {msg.role === "king" && (
                    <div style={{ fontSize: "0.7rem", color: "var(--color-accent)", fontFamily: "var(--hand)", marginBottom: "0.25rem" }}>
                      {king.name}
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="mb-3">
                <div
                  className="inline-block px-3 py-2 rounded-lg"
                  style={{
                    background: "var(--color-paper-2)",
                    border: "1px solid var(--color-line)",
                    fontFamily: "'Gowun Dodum', sans-serif",
                    fontSize: "0.85rem",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                    maxWidth: "85%",
                  }}
                >
                  <div style={{ fontSize: "0.7rem", color: "var(--color-accent)", fontFamily: "var(--hand)", marginBottom: "0.25rem" }}>
                    {king.name}
                  </div>
                  {streamText || (
                    <span style={{ color: "var(--color-ink-3)" }}>
                      생각 중<span className="thinking-dots"><span>.</span><span>.</span><span>.</span></span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 flex gap-2" style={{ borderTop: "1px solid var(--color-line)" }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) sendMessage(input);
              }}
              placeholder={`${king.name}에게 질문...`}
              disabled={loading}
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                fontSize: "0.85rem",
                border: "1.5px solid var(--color-line)",
                borderRadius: "6px",
                background: "var(--color-paper)",
                color: "var(--color-ink)",
                outline: "none",
                fontFamily: "'Gowun Dodum', sans-serif",
              }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              style={{
                padding: "0.5rem 1rem",
                fontSize: "0.85rem",
                border: "1.5px solid var(--color-line)",
                borderRadius: "6px",
                background: loading || !input.trim() ? "var(--color-paper-2)" : "var(--color-ink)",
                color: loading || !input.trim() ? "var(--color-ink-3)" : "var(--color-paper)",
                cursor: loading || !input.trim() ? "default" : "pointer",
                fontFamily: "var(--hand)",
              }}
            >
              전송
            </button>
          </div>
        </>
      )}
    </ChatShell>
  );
}

function ChatShell({ king, onClose, children }: { king: King; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="flex flex-col" style={{ height: "100%", background: "var(--color-paper)" }}>
      <div className="flex items-center justify-between px-4 py-2" style={{ borderBottom: "1px solid var(--color-line)", background: "var(--color-paper-2)" }}>
        <div style={{ fontFamily: "var(--hand)", fontSize: "1rem" }}>
          {king.name}과의 대화
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer", color: "var(--color-ink-2)", padding: "0.25rem" }}
        >
          ✕
        </button>
      </div>
      {children}
    </div>
  );
}

function getSuggestedTopics(king: King): string[] {
  const topics: string[] = [];
  if (king.events.length > 0) {
    const mainEvent = king.events[king.events.length > 1 ? 1 : 0];
    topics.push(`${mainEvent.year}년 "${mainEvent.text}"에 대해 말씀해 주시옵소서`);
  }
  if (king.failures.length > 0) {
    topics.push(`"${king.failures[0]}"에 대해 어떻게 생각하시나이까?`);
  }
  if (king.achievements.length > 0) {
    topics.push(`가장 자랑스러운 업적은 무엇이시옵니까?`);
  }
  return topics.slice(0, 3);
}
