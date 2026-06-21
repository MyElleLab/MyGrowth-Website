"use client";

import { useEffect, useState } from "react";

const ROWS = 7;
const COLS = 20;
const TOTAL = ROWS * COLS;

type Intensity = 0 | 1 | 2 | 3 | 4;

const intensityColors: Record<Intensity, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const intensityGlow: Record<Intensity, string> = {
  0: "none",
  1: "none",
  2: "none",
  3: "0 0 6px rgba(57,211,83,0.3)",
  4: "0 0 10px rgba(57,211,83,0.6), 0 0 20px rgba(57,211,83,0.2)",
};

function randomIntensity(): Intensity {
  const r = Math.random();
  if (r < 0.25) return 0;
  if (r < 0.45) return 1;
  if (r < 0.65) return 2;
  if (r < 0.85) return 3;
  return 4;
}

export default function HeatmapAnimation() {
  const [cells, setCells] = useState<Intensity[]>(Array(TOTAL).fill(0));
  const [animated, setAnimated] = useState<boolean[]>(Array(TOTAL).fill(false));

  useEffect(() => {
    const targets = Array.from({ length: TOTAL }, () => randomIntensity());

    targets.forEach((intensity, i) => {
      const delay = (i % COLS) * 60 + Math.floor(i / COLS) * 30 + Math.random() * 200;
      setTimeout(() => {
        setCells((prev) => {
          const next = [...prev];
          next[i] = intensity;
          return next;
        });
        setAnimated((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, delay);
    });
  }, []);

  const CELL_SIZE = 16;
  const GAP = 3;
  const STEP = CELL_SIZE + GAP;
  const WIDTH = COLS * STEP - GAP;
  const HEIGHT = ROWS * STEP - GAP;

  return (
    <div className="w-full flex justify-center overflow-hidden">
      <div
        className="relative"
        style={{ maxWidth: WIDTH, width: "100%" }}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{ width: "100%", height: "auto" }}
          aria-hidden="true"
        >
          {cells.map((intensity, i) => {
            const col = i % COLS;
            const row = Math.floor(i / COLS);
            const x = col * STEP;
            const y = row * STEP;
            const isAnimated = animated[i];

            return (
              <rect
                key={i}
                x={x}
                y={y}
                width={CELL_SIZE}
                height={CELL_SIZE}
                rx="3"
                fill={intensityColors[intensity]}
                style={{
                  transition: isAnimated
                    ? "fill 0.4s ease, filter 0.4s ease"
                    : "none",
                  filter:
                    intensity >= 3
                      ? intensity === 4
                        ? "drop-shadow(0 0 4px rgba(57,211,83,0.7))"
                        : "drop-shadow(0 0 2px rgba(57,211,83,0.4))"
                      : "none",
                }}
              />
            );
          })}
        </svg>

        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #0d1117, transparent)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-8 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #0d1117, transparent)",
          }}
        />
      </div>
    </div>
  );
}
