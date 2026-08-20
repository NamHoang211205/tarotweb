import SpreadSelector from "@/components/SpreadSelector";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="text-center flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Chọn Kiểu Trải Bài</h1>
        <p className="text-foreground/70">
          Luyện tập xem bài tarot như một reader chuyên nghiệp — chọn kiểu trải phù hợp với câu hỏi của bạn.
        </p>
      </div>
      <SpreadSelector />
    </div>
  );
}
