import Link from "next/link";
import { spreads, type SpreadId } from "@/lib/spreads";
import ReadingForm from "@/components/ReadingForm";

type Props = {
  searchParams: Promise<{ spread?: string }>;
};

export default async function ReadingPage({ searchParams }: Props) {
  const { spread: spreadParam } = await searchParams;
  const spread = spreadParam && spreadParam in spreads ? spreads[spreadParam as SpreadId] : null;

  if (!spread) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-center flex flex-col gap-4">
        <p className="text-foreground/80">Kiểu trải bài không hợp lệ.</p>
        <Link href="/" className="text-accent underline">
          Quay lại chọn kiểu trải bài
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-6">
      <div className="text-center flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground">{spread.name}</h1>
        <p className="text-foreground/70 text-sm">{spread.description}</p>
      </div>
      <ReadingForm spread={spread} />
    </div>
  );
}
