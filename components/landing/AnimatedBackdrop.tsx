import type { CSSProperties } from "react";

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

type Star = { top: string; left: string; size: number; duration: number; delay: number };
type FloatingCard = {
  top: string;
  left: string;
  rotate: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
};
type Orb = {
  top: string;
  left: string;
  size: number;
  color: string;
  x: number;
  y: number;
  duration: number;
};

const stars: Star[] = [
  { top: "8%", left: "12%", size: 3, duration: 3.2, delay: 0 },
  { top: "14%", left: "78%", size: 2, duration: 2.6, delay: 0.4 },
  { top: "22%", left: "20%", size: 2, duration: 3.8, delay: 1.1 },
  { top: "5%", left: "70%", size: 2, duration: 2.9, delay: 0.7 },
  { top: "30%", left: "88%", size: 3, duration: 3.4, delay: 0.2 },
  { top: "40%", left: "6%", size: 2, duration: 4.1, delay: 1.4 },
  { top: "18%", left: "22%", size: 2, duration: 3.1, delay: 1.8 },
  { top: "48%", left: "92%", size: 2, duration: 2.7, delay: 0.9 },
  { top: "62%", left: "15%", size: 3, duration: 3.6, delay: 0.3 },
  { top: "70%", left: "82%", size: 2, duration: 2.9, delay: 1.6 },
  { top: "80%", left: "40%", size: 2, duration: 3.3, delay: 0.6 },
  { top: "88%", left: "65%", size: 3, duration: 4.0, delay: 1.2 },
  { top: "55%", left: "48%", size: 2, duration: 3.5, delay: 2.0 },
  { top: "35%", left: "60%", size: 2, duration: 2.5, delay: 0.5 },
  { top: "3%", left: "25%", size: 2, duration: 3.0, delay: 1.9 },
  { top: "92%", left: "20%", size: 2, duration: 2.8, delay: 0.8 },
];

const floatingCards: FloatingCard[] = [
  { top: "14%", left: "8%", rotate: -12, size: 64, duration: 7, delay: 0, symbol: "✦" },
  { top: "62%", left: "5%", rotate: 8, size: 52, duration: 8.5, delay: 1.2, symbol: "☾" },
  { top: "20%", left: "88%", rotate: 10, size: 58, duration: 7.8, delay: 0.6, symbol: "✧" },
  { top: "68%", left: "90%", rotate: -8, size: 50, duration: 6.5, delay: 1.8, symbol: "✦" },
];

const orbs: Orb[] = [
  { top: "10%", left: "15%", size: 420, color: "rgba(169,125,216,0.16)", x: 40, y: -30, duration: 14 },
  { top: "55%", left: "80%", size: 380, color: "rgba(201,162,75,0.12)", x: -35, y: 25, duration: 16 },
  { top: "75%", left: "20%", size: 320, color: "rgba(63,191,174,0.12)", x: 25, y: -20, duration: 12 },
];

export default function AnimatedBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="landing-ring absolute top-1/2 left-1/2 w-160 h-160 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-soft/10" />
      <div className="landing-ring-reverse absolute top-1/2 left-1/2 w-120 h-120 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/10" />

      {orbs.map((orb, i) => {
        const style: CSSVars = {
          top: orb.top,
          left: orb.left,
          width: orb.size,
          height: orb.size,
          background: orb.color,
          "--orb-x": `${orb.x}px`,
          "--orb-y": `${orb.y}px`,
          "--orb-duration": `${orb.duration}s`,
        };
        return (
          <div key={`orb-${i}`} className="landing-orb absolute rounded-full blur-3xl" style={style} />
        );
      })}

      {stars.map((star, i) => {
        const style: CSSVars = {
          top: star.top,
          left: star.left,
          width: star.size,
          height: star.size,
          "--twinkle-duration": `${star.duration}s`,
          "--twinkle-delay": `${star.delay}s`,
        };
        return (
          <span
            key={`star-${i}`}
            className="landing-star absolute rounded-full bg-accent-soft"
            style={style}
          />
        );
      })}

      {floatingCards.map((card, i) => {
        const style: CSSVars = {
          top: card.top,
          left: card.left,
          width: card.size,
          height: card.size * 1.5,
          fontSize: card.size * 0.35,
          "--float-rot": `${card.rotate}deg`,
          "--float-duration": `${card.duration}s`,
          "--float-delay": `${card.delay}s`,
        };
        return (
          <div
            key={`card-${i}`}
            className="landing-float-card hidden sm:flex absolute rounded-lg border border-accent-soft/25 bg-linear-to-br from-background-alt/40 to-background/20 items-center justify-center text-accent-soft/40"
            style={style}
          >
            {card.symbol}
          </div>
        );
      })}
    </div>
  );
}
