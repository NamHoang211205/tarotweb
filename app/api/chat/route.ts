import { NextRequest } from "next/server";
import { anthropic } from "@/lib/anthropic";

type ChatCard = {
  name: string;
  nameEn: string;
  reversed: boolean;
  positionLabel: string;
  meaning: string;
};

type ChatMessage = { role: "user" | "assistant"; content: string };

function buildSystemPrompt(spreadName: string, question: string | null | undefined, cards: ChatCard[]) {
  const cardLines = cards
    .map(
      (c, i) =>
        `${i + 1}. Vị trí "${c.positionLabel}": ${c.name} (${c.nameEn}) — ${
          c.reversed ? "Ngược" : "Xuôi"
        }\n   Ý nghĩa: ${c.meaning}`
    )
    .join("\n");

  return `Bạn là một người luận bài tarot giàu kinh nghiệm, giọng văn ấm áp, chân thành nhưng thẳng thắn. Luôn trả lời bằng tiếng Việt, độ dài vừa phải (khoảng 3-6 câu mỗi lượt).

Trải bài: "${spreadName}"
${question ? `Câu hỏi của người xem: "${question}"` : "Người xem không nêu câu hỏi cụ thể."}

Các lá đã rút:
${cardLines}

Nhiệm vụ của bạn:
- Nếu đây là yêu cầu đầu tiên, hãy đưa ra một luận giải tổng thể, liên kết các lá bài theo mạch câu chuyện logic của trải bài — không liệt kê rời rạc từng lá.
- Nếu người dùng hỏi tiếp, hãy trả lời dựa trên đúng bối cảnh trải bài ở trên, kết nối với câu hỏi mới của họ.
- Chỉ luận giải dựa trên ý nghĩa các lá bài đã cho ở trên — không tự bịa ý nghĩa khác cho lá bài.
- Trả lời bằng văn xuôi thuần, không dùng markdown (không **in đậm**, không dùng dấu *, không gạch đầu dòng) — tin nhắn sẽ hiển thị dưới dạng text thuần.`;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { spreadName, question, cards, history } = body as {
    spreadName: string;
    question?: string | null;
    cards: ChatCard[];
    history: ChatMessage[];
  };

  if (!spreadName || !Array.isArray(cards) || cards.length === 0) {
    return new Response("Missing required fields", { status: 400 });
  }

  const system = buildSystemPrompt(spreadName, question, cards);

  // The Anthropic API requires the message list to start with a "user" turn.
  // The client only ever sends real user/assistant turns (no user bubble for
  // the initial auto-triggered interpretation), so synthesize that opening
  // turn here whenever the history is empty or starts with "assistant".
  const rawHistory: ChatMessage[] = Array.isArray(history) ? history : [];
  const messages: ChatMessage[] =
    rawHistory.length === 0 || rawHistory[0].role !== "user"
      ? [{ role: "user", content: "Hãy đưa ra một luận giải tổng thể về trải bài này." }, ...rawHistory]
      : rawHistory;

  const anthropicStream = anthropic.messages.stream({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system,
    messages,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      anthropicStream.on("text", (textDelta) => {
        controller.enqueue(encoder.encode(textDelta));
      });
      anthropicStream.on("end", () => {
        controller.close();
      });
      anthropicStream.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      anthropicStream.abort();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
