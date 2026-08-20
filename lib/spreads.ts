export type SpreadId = "single" | "three" | "celtic-cross";

export type SpreadPosition = {
  label: string;
  description: string;
};

export type SpreadDef = {
  id: SpreadId;
  name: string;
  description: string;
  positions: SpreadPosition[];
};

export const spreads: Record<SpreadId, SpreadDef> = {
  single: {
    id: "single",
    name: "1 Lá Bài",
    description: "Rút một lá duy nhất để nắm bắt nhanh năng lượng hoặc câu trả lời cho câu hỏi hiện tại.",
    positions: [{ label: "Thông điệp", description: "Điều bạn cần biết ngay lúc này" }],
  },
  three: {
    id: "three",
    name: "3 Lá: Quá Khứ - Hiện Tại - Tương Lai",
    description: "Trải bài kinh điển để thấy dòng chảy của một tình huống theo thời gian.",
    positions: [
      { label: "Quá Khứ", description: "Nền tảng hoặc nguyên nhân dẫn đến hiện tại" },
      { label: "Hiện Tại", description: "Tình huống hoặc năng lượng hiện tại" },
      { label: "Tương Lai", description: "Xu hướng hoặc kết quả có thể xảy ra" },
    ],
  },
  "celtic-cross": {
    id: "celtic-cross",
    name: "Celtic Cross (10 Lá)",
    description: "Trải bài chuyên sâu, toàn diện cho một vấn đề phức tạp cần phân tích kỹ.",
    positions: [
      { label: "Hiện Tại", description: "Trung tâm của vấn đề" },
      { label: "Thử Thách", description: "Trở ngại hoặc xung đột trực tiếp" },
      { label: "Nền Tảng", description: "Gốc rễ, nguyên nhân sâu xa" },
      { label: "Quá Khứ Gần", description: "Sự kiện vừa qua ảnh hưởng đến hiện tại" },
      { label: "Mục Tiêu", description: "Điều bạn đang hướng tới hoặc mong muốn" },
      { label: "Tương Lai Gần", description: "Điều sắp xảy ra tiếp theo" },
      { label: "Bản Thân", description: "Thái độ, vai trò của bạn trong tình huống" },
      { label: "Ngoại Cảnh", description: "Ảnh hưởng từ môi trường, người xung quanh" },
      { label: "Hy Vọng & Nỗi Sợ", description: "Điều bạn hy vọng hoặc lo sợ về kết quả" },
      { label: "Kết Quả", description: "Kết quả cuối cùng nếu mọi thứ tiếp diễn như hiện tại" },
    ],
  },
};

export function getSpread(id: SpreadId): SpreadDef {
  return spreads[id];
}
