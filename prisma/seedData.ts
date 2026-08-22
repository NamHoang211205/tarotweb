import type { Suit, TarotCardData } from "../lib/cards";

const majorArcana: TarotCardData[] = [
  {
    id: "major-0",
    name: "Kẻ Khờ",
    nameEn: "The Fool",
    arcana: "major",
    symbol: "🃏",
    keywords: ["khởi đầu mới", "tự do", "phiêu lưu", "ngây thơ"],
    upright:
      "Một khởi đầu mới đang mở ra, tràn đầy sự tự do và khả năng. Hãy tin vào bản thân và dám bước đi dù chưa biết trước điều gì phía trước.",
    reversed:
      "Sự bốc đồng, thiếu chuẩn bị hoặc sợ hãi trước những rủi ro cần thiết. Có thể bạn đang hành động hấp tấp hoặc ngần ngại không dám bắt đầu.",
  },
  {
    id: "major-1",
    name: "Pháp Sư",
    nameEn: "The Magician",
    arcana: "major",
    symbol: "🎩",
    keywords: ["ý chí", "sáng tạo", "kỹ năng", "hành động"],
    upright:
      "Bạn có đủ mọi công cụ và nguồn lực cần thiết để biến ý tưởng thành hiện thực. Đây là lúc hành động với sự tự tin và tập trung.",
    reversed:
      "Tiềm năng chưa được khai thác, thao túng hoặc thiếu định hướng rõ ràng. Có thể bạn đang lãng phí năng lượng vào việc không đúng chỗ.",
  },
  {
    id: "major-2",
    name: "Nữ Tư Tế",
    nameEn: "The High Priestess",
    arcana: "major",
    symbol: "🌙",
    keywords: ["trực giác", "bí ẩn", "tiềm thức", "im lặng"],
    upright:
      "Hãy lắng nghe trực giác của mình. Có những điều chưa lộ rõ, câu trả lời nằm sâu bên trong chứ không phải ở logic bề mặt.",
    reversed:
      "Mất kết nối với trực giác, giữ bí mật gây hại, hoặc bỏ qua những tín hiệu nội tâm quan trọng.",
  },
  {
    id: "major-3",
    name: "Nữ Hoàng",
    nameEn: "The Empress",
    arcana: "major",
    symbol: "👑",
    keywords: ["sinh sôi", "nuôi dưỡng", "phong phú", "thiên nhiên"],
    upright:
      "Sự sung túc, sáng tạo và nuôi dưỡng đang nở rộ. Đây là thời điểm tốt để chăm sóc bản thân, mối quan hệ hoặc một dự án đang lớn dần.",
    reversed:
      "Sự trì trệ trong sáng tạo, phụ thuộc quá mức vào người khác, hoặc mất cân bằng giữa cho và nhận.",
  },
  {
    id: "major-4",
    name: "Hoàng Đế",
    nameEn: "The Emperor",
    arcana: "major",
    symbol: "🏛️",
    keywords: ["quyền lực", "cấu trúc", "kỷ luật", "ổn định"],
    upright:
      "Trật tự, kỷ luật và sự kiểm soát vững chắc sẽ dẫn đến thành công. Hãy xây dựng nền tảng chắc chắn bằng lý trí.",
    reversed:
      "Sự độc đoán, cứng nhắc quá mức hoặc mất kiểm soát. Có thể bạn đang bị kiểm soát hoặc đang cố kiểm soát quá tay.",
  },
  {
    id: "major-5",
    name: "Giáo Hoàng",
    nameEn: "The Hierophant",
    arcana: "major",
    symbol: "⛪",
    keywords: ["truyền thống", "niềm tin", "quy chuẩn", "học hỏi"],
    upright:
      "Tôn trọng truyền thống, tìm kiếm sự dẫn dắt từ những giá trị đã được kiểm chứng hoặc một người thầy đáng tin cậy.",
    reversed:
      "Nổi loạn chống lại quy chuẩn, tư duy độc lập, hoặc cảm thấy gò bó bởi những quy tắc cứng nhắc.",
  },
  {
    id: "major-6",
    name: "Tình Nhân",
    nameEn: "The Lovers",
    arcana: "major",
    symbol: "💞",
    keywords: ["tình yêu", "lựa chọn", "hài hòa", "kết nối"],
    upright:
      "Một mối quan hệ sâu sắc hoặc một lựa chọn quan trọng liên quan đến giá trị bản thân đang đến. Hãy hành động từ trái tim và sự chân thành.",
    reversed:
      "Bất hòa, lựa chọn sai lầm hoặc mất cân bằng trong một mối quan hệ. Có thể có sự thiếu chân thành hoặc xung đột giá trị.",
  },
  {
    id: "major-7",
    name: "Cỗ Xe",
    nameEn: "The Chariot",
    arcana: "major",
    symbol: "🏎️",
    keywords: ["ý chí", "chiến thắng", "quyết tâm", "kiểm soát"],
    upright:
      "Ý chí mạnh mẽ và sự quyết tâm sẽ giúp bạn vượt qua trở ngại và tiến về phía trước một cách dứt khoát.",
    reversed:
      "Mất phương hướng, thiếu kiểm soát hoặc xung đột nội tâm khiến bạn không thể tiến lên.",
  },
  {
    id: "major-8",
    name: "Sức Mạnh",
    nameEn: "Strength",
    arcana: "major",
    symbol: "🦁",
    keywords: ["can đảm", "kiên nhẫn", "từ bi", "nội lực"],
    upright:
      "Sức mạnh thật sự đến từ sự kiên nhẫn, lòng trắc ẩn và khả năng làm chủ cảm xúc chứ không phải vũ lực.",
    reversed:
      "Nghi ngờ bản thân, thiếu tự chủ hoặc để cảm xúc, nỗi sợ chi phối hành động.",
  },
  {
    id: "major-9",
    name: "Ẩn Sĩ",
    nameEn: "The Hermit",
    arcana: "major",
    symbol: "🏮",
    keywords: ["nội tâm", "cô độc", "tìm kiếm", "chiêm nghiệm"],
    upright:
      "Đây là lúc lùi lại, suy ngẫm một mình để tìm ra câu trả lời nội tâm trước khi tiếp tục con đường.",
    reversed:
      "Cô lập quá mức, cô đơn không mong muốn, hoặc né tránh việc đối diện với chính mình.",
  },
  {
    id: "major-10",
    name: "Bánh Xe Số Mệnh",
    nameEn: "Wheel of Fortune",
    arcana: "major",
    symbol: "☸️",
    keywords: ["vận mệnh", "chu kỳ", "bước ngoặt", "thay đổi"],
    upright:
      "Một bước ngoặt của số phận đang đến. Chu kỳ cũ kết thúc, mở ra cơ hội và vận may mới.",
    reversed:
      "Vận rủi tạm thời, cảm giác mất kiểm soát trước những thay đổi ngoài ý muốn, hoặc một chu kỳ xấu lặp lại.",
  },
  {
    id: "major-11",
    name: "Công Lý",
    nameEn: "Justice",
    arcana: "major",
    symbol: "⚖️",
    keywords: ["công bằng", "sự thật", "nhân quả", "quyết định"],
    upright:
      "Sự công bằng và lẽ phải sẽ được thực thi. Mọi hành động đều có hệ quả tương xứng — hãy quyết định dựa trên sự thật.",
    reversed:
      "Bất công, thiên vị, hoặc trốn tránh trách nhiệm với hậu quả do chính mình gây ra.",
  },
  {
    id: "major-12",
    name: "Người Treo Ngược",
    nameEn: "The Hanged Man",
    arcana: "major",
    symbol: "🙃",
    keywords: ["buông bỏ", "góc nhìn mới", "hy sinh", "tạm dừng"],
    upright:
      "Hãy tạm dừng và nhìn vấn đề từ một góc độ hoàn toàn khác. Buông bỏ đôi khi lại là cách tiến về phía trước.",
    reversed:
      "Trì hoãn không cần thiết, chống cự sự thay đổi, hoặc hy sinh vô ích không mang lại giá trị gì.",
  },
  {
    id: "major-13",
    name: "Tử Thần",
    nameEn: "Death",
    arcana: "major",
    symbol: "🕯️",
    keywords: ["kết thúc", "chuyển hoá", "buông bỏ", "tái sinh"],
    upright:
      "Một giai đoạn đang kết thúc để nhường chỗ cho sự chuyển hoá và khởi đầu mới. Đừng sợ buông bỏ những gì đã lỗi thời.",
    reversed:
      "Chống lại sự thay đổi cần thiết, mắc kẹt trong quá khứ, hoặc sợ hãi trước một kết thúc không thể tránh khỏi.",
  },
  {
    id: "major-14",
    name: "Điều Độ",
    nameEn: "Temperance",
    arcana: "major",
    symbol: "🕊️",
    keywords: ["cân bằng", "hoà hợp", "kiên nhẫn", "trung dung"],
    upright:
      "Sự cân bằng, kiên nhẫn và pha trộn hài hoà giữa các thái cực sẽ mang lại kết quả bền vững.",
    reversed:
      "Mất cân bằng, thái quá, hoặc thiếu kiên nhẫn dẫn đến xung đột và căng thẳng.",
  },
  {
    id: "major-15",
    name: "Quỷ Dữ",
    nameEn: "The Devil",
    arcana: "major",
    symbol: "😈",
    keywords: ["ràng buộc", "cám dỗ", "vật chất", "nỗi sợ"],
    upright:
      "Bạn đang bị ràng buộc bởi thói quen xấu, cám dỗ vật chất hoặc nỗi sợ hãi tự giới hạn bản thân.",
    reversed:
      "Giải phóng bản thân khỏi những ràng buộc độc hại, nhận ra và cắt đứt một sự phụ thuộc không lành mạnh.",
  },
  {
    id: "major-16",
    name: "Tòa Tháp",
    nameEn: "The Tower",
    arcana: "major",
    symbol: "🗼",
    keywords: ["đổ vỡ", "biến động", "thức tỉnh", "sự thật bất ngờ"],
    upright:
      "Một biến động đột ngột phá vỡ nền tảng cũ, gây xáo trộn nhưng cũng mở đường cho sự thật và tái thiết.",
    reversed:
      "Tránh né một khủng hoảng sắp xảy ra, hoặc sợ hãi thay đổi đến mức cố giữ lại thứ đã mục nát.",
  },
  {
    id: "major-17",
    name: "Ngôi Sao",
    nameEn: "The Star",
    arcana: "major",
    symbol: "⭐",
    keywords: ["hy vọng", "cảm hứng", "chữa lành", "niềm tin"],
    upright:
      "Sau giông bão là hy vọng. Đây là thời điểm chữa lành, lấy lại niềm tin và cảm hứng cho tương lai.",
    reversed:
      "Mất niềm tin, tuyệt vọng tạm thời, hoặc cảm thấy ước mơ trở nên xa vời.",
  },
  {
    id: "major-18",
    name: "Mặt Trăng",
    nameEn: "The Moon",
    arcana: "major",
    symbol: "🌕",
    keywords: ["ảo giác", "sợ hãi", "tiềm thức", "mơ hồ"],
    upright:
      "Mọi thứ chưa rõ ràng, có thể có ảo giác hoặc nỗi sợ vô hình. Hãy thận trọng và lắng nghe trực giác nhiều hơn lý trí lúc này.",
    reversed:
      "Sự thật dần được hé lộ, nỗi sợ và hoang mang bắt đầu tan biến khi bạn đối diện với chúng.",
  },
  {
    id: "major-19",
    name: "Mặt Trời",
    nameEn: "The Sun",
    arcana: "major",
    symbol: "☀️",
    keywords: ["niềm vui", "thành công", "sức sống", "rõ ràng"],
    upright:
      "Niềm vui, thành công và sự rõ ràng đang chiếu sáng con đường của bạn. Đây là lá bài của hạnh phúc và kết quả tốt đẹp.",
    reversed:
      "Niềm vui bị trì hoãn, thiếu tự tin tạm thời, hoặc thành công chưa trọn vẹn như mong đợi.",
  },
  {
    id: "major-20",
    name: "Phán Xét",
    nameEn: "Judgement",
    arcana: "major",
    symbol: "📯",
    keywords: ["thức tỉnh", "tha thứ", "đánh giá lại", "gọi tên"],
    upright:
      "Một sự thức tỉnh hoặc lời kêu gọi quan trọng đang đến, thúc đẩy bạn nhìn lại và tha thứ để tiến lên phiên bản tốt hơn của chính mình.",
    reversed:
      "Tự phán xét bản thân quá khắt khe, trốn tránh trách nhiệm, hoặc bỏ lỡ một lời kêu gọi thay đổi quan trọng.",
  },
  {
    id: "major-21",
    name: "Thế Giới",
    nameEn: "The World",
    arcana: "major",
    symbol: "🌍",
    keywords: ["hoàn thành", "toàn vẹn", "thành tựu", "kết thúc trọn vẹn"],
    upright:
      "Một chu kỳ hoàn thành trọn vẹn, thành tựu đạt được. Đây là lá bài của sự viên mãn và hoàn thiện.",
    reversed:
      "Một dự án hoặc chu kỳ chưa hoàn tất, cảm giác thiếu trọn vẹn hoặc trì hoãn kết thúc.",
  },
];

const suitInfo: Record<
  Suit,
  { name: string; nameEn: string; symbol: string; theme: string }
> = {
  wands: { name: "Gậy", nameEn: "Wands", symbol: "🔥", theme: "hành động, đam mê và sáng tạo" },
  cups: { name: "Cốc", nameEn: "Cups", symbol: "💧", theme: "cảm xúc, tình cảm và các mối quan hệ" },
  swords: { name: "Kiếm", nameEn: "Swords", symbol: "⚔️", theme: "tư duy, xung đột và sự thật" },
  pentacles: { name: "Tiền", nameEn: "Pentacles", symbol: "🪙", theme: "vật chất, công việc và tài chính" },
};

const rankData: {
  rank: string;
  rankEn: string;
  upright: (theme: string) => string;
  reversed: (theme: string) => string;
  keywords: string[];
}[] = [
  {
    rank: "Át",
    rankEn: "Ace",
    upright: (t) => `Một khởi đầu mới, tràn đầy tiềm năng trong lĩnh vực ${t}. Cơ hội thuần khiết đang mở ra.`,
    reversed: (t) => `Cơ hội bị bỏ lỡ hoặc khởi đầu chậm trễ trong lĩnh vực ${t}. Cần thêm thời gian để nắm bắt.`,
    keywords: ["khởi đầu", "tiềm năng", "cơ hội mới"],
  },
  {
    rank: "2",
    rankEn: "Two",
    upright: (t) => `Sự cân bằng và lựa chọn ban đầu liên quan đến ${t}. Bạn đang cân nhắc giữa hai hướng đi.`,
    reversed: (t) => `Mất cân bằng hoặc do dự kéo dài trong việc lựa chọn liên quan đến ${t}.`,
    keywords: ["lựa chọn", "cân bằng", "hợp tác"],
  },
  {
    rank: "3",
    rankEn: "Three",
    upright: (t) => `Sự phát triển và hợp tác bắt đầu mang lại kết quả trong ${t}.`,
    reversed: (t) => `Trì trệ trong hợp tác, kế hoạch liên quan đến ${t} chưa được như mong đợi.`,
    keywords: ["phát triển", "hợp tác", "tăng trưởng"],
  },
  {
    rank: "4",
    rankEn: "Four",
    upright: (t) => `Sự ổn định và nền tảng vững chắc đang được thiết lập trong ${t}.`,
    reversed: (t) => `Sự bất ổn hoặc gián đoạn tạm thời ảnh hưởng đến nền tảng của ${t}.`,
    keywords: ["ổn định", "nền tảng", "an toàn"],
  },
  {
    rank: "5",
    rankEn: "Five",
    upright: (t) => `Xung đột, thử thách hoặc cạnh tranh xuất hiện trong lĩnh vực ${t}.`,
    reversed: (t) => `Xung đột dần được giải quyết, hoặc bạn đang né tránh một mâu thuẫn cần đối mặt trong ${t}.`,
    keywords: ["xung đột", "thử thách", "cạnh tranh"],
  },
  {
    rank: "6",
    rankEn: "Six",
    upright: (t) => `Sự hài hoà và cân bằng trở lại sau giai đoạn khó khăn trong ${t}.`,
    reversed: (t) => `Mất cân bằng kéo dài, hoặc chậm trễ trong việc khôi phục hài hoà liên quan đến ${t}.`,
    keywords: ["hài hoà", "hồi phục", "hỗ trợ"],
  },
  {
    rank: "7",
    rankEn: "Seven",
    upright: (t) => `Sự kiên trì và đánh giá lại chiến lược cần thiết để tiến bộ trong ${t}.`,
    reversed: (t) => `Nghi ngờ bản thân hoặc thiếu kiên trì khiến tiến độ trong ${t} bị chững lại.`,
    keywords: ["kiên trì", "đánh giá", "nỗ lực"],
  },
  {
    rank: "8",
    rankEn: "Eight",
    upright: (t) => `Sự chuyển động nhanh chóng và tiến triển rõ rệt trong ${t}.`,
    reversed: (t) => `Cảm giác bị mắc kẹt, trì hoãn hoặc mất phương hướng trong ${t}.`,
    keywords: ["tiến triển", "chuyển động", "thay đổi"],
  },
  {
    rank: "9",
    rankEn: "Nine",
    upright: (t) => `Gần đạt được thành quả sau nỗ lực bền bỉ trong ${t}, dù còn chút lo lắng.`,
    reversed: (t) => `Kiệt sức hoặc lo âu quá mức trước áp lực liên quan đến ${t}.`,
    keywords: ["gần hoàn thành", "kiên cường", "lo lắng"],
  },
  {
    rank: "10",
    rankEn: "Ten",
    upright: (t) => `Kết quả trọn vẹn, chu kỳ hoàn tất trong lĩnh vực ${t}.`,
    reversed: (t) => `Gánh nặng kéo dài hoặc một chu kỳ trong ${t} khó khép lại như mong muốn.`,
    keywords: ["hoàn thành", "kết quả", "chu kỳ kết thúc"],
  },
  {
    rank: "Thị Đồng",
    rankEn: "Page",
    upright: (t) => `Một tin tức mới, sự tò mò hoặc năng lượng học hỏi liên quan đến ${t}.`,
    reversed: (t) => `Tin tức trì hoãn, thiếu kinh nghiệm hoặc hành động thiếu chín chắn liên quan đến ${t}.`,
    keywords: ["tin tức mới", "học hỏi", "tò mò"],
  },
  {
    rank: "Kỵ Sĩ",
    rankEn: "Knight",
    upright: (t) => `Hành động quyết liệt, sự thúc đẩy mạnh mẽ hướng tới mục tiêu trong ${t}.`,
    reversed: (t) => `Hành động hấp tấp, thiếu kiểm soát hoặc trì trệ không đúng lúc trong ${t}.`,
    keywords: ["hành động", "thúc đẩy", "quyết liệt"],
  },
  {
    rank: "Hoàng Hậu",
    rankEn: "Queen",
    upright: (t) => `Sự thấu hiểu, trưởng thành và khả năng làm chủ sâu sắc trong lĩnh vực ${t}.`,
    reversed: (t) => `Mất cân bằng cảm xúc hoặc thiếu tự tin khi làm chủ vấn đề liên quan đến ${t}.`,
    keywords: ["thấu hiểu", "trưởng thành", "làm chủ"],
  },
  {
    rank: "Vua",
    rankEn: "King",
    upright: (t) => `Sự làm chủ hoàn toàn, uy quyền và kinh nghiệm dày dặn trong lĩnh vực ${t}.`,
    reversed: (t) => `Lạm quyền, cứng nhắc hoặc thiếu trách nhiệm khi xử lý vấn đề liên quan đến ${t}.`,
    keywords: ["uy quyền", "làm chủ", "kinh nghiệm"],
  },
];

const minorArcana: TarotCardData[] = (Object.keys(suitInfo) as Suit[]).flatMap(
  (suit) => {
    const info = suitInfo[suit];
    return rankData.map((r, index) => ({
      id: `${suit}-${index + 1}`,
      name: `${r.rank} ${info.name}`,
      nameEn: `${r.rankEn} of ${info.nameEn}`,
      arcana: "minor" as const,
      suit,
      symbol: info.symbol,
      keywords: r.keywords,
      upright: r.upright(info.theme),
      reversed: r.reversed(info.theme),
    }));
  }
);

export const tarotDeck: TarotCardData[] = [...majorArcana, ...minorArcana];
