type Props = {
  role: "user" | "assistant";
  content: string;
  pending?: boolean;
};

export default function ChatBubble({ role, content, pending }: Props) {
  const isAssistant = role === "assistant";

  return (
    <div className={`flex gap-3 max-w-[85%] ${isAssistant ? "" : "self-end flex-row-reverse"}`}>
      <span
        className={`flex-none w-8 h-8 rounded-full border flex items-center justify-center text-sm ${
          isAssistant ? "border-accent-soft/40 bg-background-alt" : "border-border bg-background-alt/60"
        }`}
      >
        {isAssistant ? "🔮" : "🙂"}
      </span>
      <div
        className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
          isAssistant
            ? "bg-background-alt/70 border border-border-soft rounded-tl-sm text-foreground/90"
            : "bg-accent/10 border border-accent/25 rounded-tr-sm text-foreground"
        }`}
      >
        {content || (pending ? <span className="shimmer">...</span> : null)}
        {pending && content && <span className="shimmer">▍</span>}
      </div>
    </div>
  );
}
