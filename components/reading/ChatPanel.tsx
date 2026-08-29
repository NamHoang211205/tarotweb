"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { DrawnCard } from "@/lib/draw";
import type { SpreadDef } from "@/lib/spreads";
import ChatBubble from "./ChatBubble";

export type ChatMessage = { role: "user" | "assistant"; content: string };

type Props = {
  spread: SpreadDef;
  drawnCards: DrawnCard[];
  question: string;
  messages: ChatMessage[];
  onMessagesChange: (messages: ChatMessage[]) => void;
};

export default function ChatPanel({ spread, drawnCards, question, messages, onMessagesChange }: Props) {
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const hasStarted = useRef(false);

  async function sendToAI(nextMessages: ChatMessage[]) {
    setStreaming(true);
    onMessagesChange(nextMessages);

    const chatCards = drawnCards.map((d, i) => ({
      name: d.card.name,
      nameEn: d.card.nameEn,
      reversed: d.reversed,
      positionLabel: spread.positions[i]?.label ?? "",
      meaning: d.reversed ? d.card.reversed : d.card.upright,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          spreadName: spread.name,
          question: question || null,
          cards: chatCards,
          history: nextMessages,
        }),
      });

      if (!res.body) {
        setStreaming(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";
      let working = [...nextMessages, { role: "assistant" as const, content: "" }];
      onMessagesChange(working);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantContent += decoder.decode(value, { stream: true });
        working = [...nextMessages, { role: "assistant" as const, content: assistantContent }];
        onMessagesChange(working);
      }
    } finally {
      setStreaming(false);
    }
  }

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;
    sendToAI([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleSend(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || streaming) return;
    const nextMessages = [...messages, { role: "user" as const, content: input.trim() }];
    setInput("");
    sendToAI(nextMessages);
  }

  return (
    <div className="rounded-2xl border border-border bg-linear-to-b from-background-alt/50 to-background-alt/20 p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-accent-soft">🔮</span>
        <h3 className="font-display text-lg font-semibold text-foreground">Ask the Reader</h3>
      </div>

      <div className="flex flex-col gap-3 max-h-[28rem] overflow-y-auto">
        {messages.length === 0 && streaming && <ChatBubble role="assistant" content="" pending />}
        {messages.map((m, i) => (
          <ChatBubble
            key={i}
            role={m.role}
            content={m.content}
            pending={streaming && i === messages.length - 1 && m.role === "assistant"}
          />
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2 pt-2 border-t border-border-soft">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a follow-up..."
          disabled={streaming}
          className="flex-1 rounded-lg bg-background/60 border border-border px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-faint/70 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/40 transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="rounded-lg bg-linear-to-b from-accent to-accent-dim text-background font-semibold px-5 text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          Send
        </button>
      </form>
    </div>
  );
}
