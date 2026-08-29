import type { CSSProperties } from "react";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

type Star = { top: string; left: string; size: number; duration: number; delay: number };

const stars: Star[] = [
  { top: "6%", left: "10%", size: 2, duration: 3.4, delay: 0 },
  { top: "12%", left: "85%", size: 2, duration: 2.8, delay: 0.6 },
  { top: "22%", left: "45%", size: 2, duration: 3.6, delay: 1.2 },
  { top: "35%", left: "92%", size: 2, duration: 3.1, delay: 0.3 },
  { top: "48%", left: "5%", size: 2, duration: 4.0, delay: 1.6 },
  { top: "58%", left: "70%", size: 2, duration: 2.9, delay: 0.9 },
  { top: "68%", left: "18%", size: 2, duration: 3.3, delay: 0.2 },
  { top: "78%", left: "88%", size: 2, duration: 3.7, delay: 1.4 },
  { top: "88%", left: "40%", size: 2, duration: 2.6, delay: 0.7 },
  { top: "94%", left: "60%", size: 2, duration: 3.5, delay: 1.9 },
];

export default function AmbientStars() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10" aria-hidden>
      {stars.map((star, i) => {
        const style: CSSVars = {
          top: star.top,
          left: star.left,
          width: star.size,
          height: star.size,
          "--twinkle-duration": `${star.duration}s`,
          "--twinkle-delay": `${star.delay}s`,
          "--twinkle-min": 0.1,
          "--twinkle-max": 0.6,
        };
        return (
          <span
            key={`ambient-star-${i}`}
            className="landing-star absolute rounded-full bg-accent-soft"
            style={style}
          />
        );
      })}
    </div>
  );
}
