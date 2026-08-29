const zodiacGlyphs = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

// Evenly place the 12 glyphs around a circle of the given radius.
function glyphPosition(index: number, radius: number) {
  const angle = (index / zodiacGlyphs.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 200 + Math.cos(angle) * radius,
    y: 200 + Math.sin(angle) * radius,
  };
}

export default function MysticWheel() {
  return (
    <div className="relative w-full max-w-[17rem] sm:max-w-sm lg:max-w-md aspect-square mx-auto" aria-hidden>
      {/* Soft glow behind the wheel */}
      <div className="absolute inset-[15%] rounded-full bg-accent/10 blur-3xl" />

      <svg viewBox="0 0 400 400" className="relative w-full h-full">
        {/* Outer ring carrying the zodiac glyphs — rotates slowly */}
        <g className="svg-spin" style={{ transformOrigin: "200px 200px" }}>
          {/* Filled band so the zodiac ring reads as a solid disc, not floating marks */}
          <circle
            cx="200"
            cy="200"
            r="175"
            fill="none"
            stroke="var(--background-alt)"
            strokeOpacity="0.75"
            strokeWidth="34"
          />
          <circle cx="200" cy="200" r="192" fill="none" stroke="var(--accent)" strokeOpacity="0.8" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="158" fill="none" stroke="var(--accent)" strokeOpacity="0.55" strokeWidth="1" />
          {zodiacGlyphs.map((glyph, i) => {
            const { x, y } = glyphPosition(i, 175);
            return (
              <text
                key={glyph}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="21"
                fill="var(--accent)"
                fillOpacity="0.95"
              >
                {glyph}
              </text>
            );
          })}
          {/* Tick marks between the glyphs */}
          {zodiacGlyphs.map((_, i) => {
            const angle = ((i + 0.5) / zodiacGlyphs.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={`tick-${i}`}
                x1={200 + Math.cos(angle) * 158}
                y1={200 + Math.sin(angle) * 158}
                x2={200 + Math.cos(angle) * 192}
                y2={200 + Math.sin(angle) * 192}
                stroke="var(--accent)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* Inner ring with spokes — counter-rotates */}
        <g className="svg-spin-reverse" style={{ transformOrigin: "200px 200px" }}>
          <circle
            cx="200"
            cy="200"
            r="128"
            fill="none"
            stroke="var(--accent-soft)"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            return (
              <line
                key={`spoke-${i}`}
                x1={200 + Math.cos(angle) * 100}
                y1={200 + Math.sin(angle) * 100}
                x2={200 + Math.cos(angle) * 128}
                y2={200 + Math.sin(angle) * 128}
                stroke="var(--accent-soft)"
                strokeOpacity="0.45"
                strokeWidth="1"
              />
            );
          })}
        </g>

        {/* Static core */}
        <circle
          cx="200"
          cy="200"
          r="100"
          fill="var(--background-alt)"
          fillOpacity="0.75"
          stroke="var(--accent)"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <circle cx="200" cy="200" r="72" fill="none" stroke="var(--accent-teal)" strokeOpacity="0.45" strokeWidth="1" />

        {/* Sun rays at the centre */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const inner = i % 2 === 0 ? 30 : 24;
          const outer = i % 2 === 0 ? 58 : 46;
          return (
            <line
              key={`ray-${i}`}
              x1={200 + Math.cos(angle) * inner}
              y1={200 + Math.sin(angle) * inner}
              x2={200 + Math.cos(angle) * outer}
              y2={200 + Math.sin(angle) * outer}
              stroke="var(--accent)"
              strokeOpacity="0.55"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
        <circle cx="200" cy="200" r="22" fill="var(--accent)" fillOpacity="0.12" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1" />
        <text
          x="200"
          y="200"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="22"
          fill="var(--accent)"
          fillOpacity="0.8"
        >
          ✦
        </text>
      </svg>
    </div>
  );
}
