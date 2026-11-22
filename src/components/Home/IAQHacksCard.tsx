// ============================================================
// src/components/Home/IAQHacksCard.tsx
// Indoor Air Quality (IAQ) Essential Hacks & Visualizer Card
// Renders practical indoor air optimization rules:
// - Illustrated HEPA scrubber and botanical graphic
// - Actionable verification checklist (humidity, filtration, sealing)
// - Science-calibrated guidance on micro-particulate mitigation
// Per ACCESSIBILITY.md §1: aria-label on card and decorative SVGs hidden
// Per EFFICIENCY.md §2: React.memo with immutable checklist definitions
// ============================================================

import { memo } from 'react';

const IAQ_HACKS = [
  'Use a HEPA air purifier',
  'Keep doors and windows sealed during high AQI',
  'Reduce indoor smoke and dust',
  'Clean filters regularly',
  'Maintain indoor humidity (40-60%)',
];

/**
 * Visual card displaying essential indoor air quality hacks and hardware checklist
 */
export const IAQHacksCard = memo(function IAQHacksCard() {
  return (
    <article
      aria-label="Indoor Air Quality Hacks"
      className="flex flex-col justify-between rounded-2xl bg-white border border-slate-100 p-5 shadow-xs hover:shadow-md transition-shadow text-slate-800"
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-sm flex-shrink-0"
            aria-hidden="true"
          >
            🏠
          </span>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Indoor Air Quality Hacks
          </h3>
        </div>

        {/* Split Layout: Image on Left + Checklist on Right */}
        <div className="mt-4 flex flex-col sm:flex-row items-center gap-4">
          {/* Left: Illustrated Purifier & Houseplant Graphic */}
          <div className="w-full sm:w-32 h-36 rounded-xl bg-gradient-to-b from-sky-50/80 to-slate-100 border border-slate-200/60 flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0 shadow-2xs">
            {/* Houseplant behind */}
            <svg
              viewBox="0 0 60 70"
              className="absolute -right-1 top-2 w-14 h-16 opacity-75"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Plant Pot */}
              <path d="M15 50 L20 68 L40 68 L45 50 Z" fill="#b45309" />
              {/* Leaves */}
              <path d="M30 50 Q 15 30 10 20 Q 25 25 30 50 Z" fill="#15803d" />
              <path d="M30 50 Q 40 25 50 15 Q 45 35 30 50 Z" fill="#16a34a" />
              <path d="M30 50 Q 30 15 32 8 Q 38 25 30 50 Z" fill="#22c55e" />
            </svg>

            {/* Modern Cylindrical HEPA Purifier Graphic */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Top Cap with Soft Glow */}
              <div className="w-12 h-2.5 rounded-t-full bg-slate-200 border border-slate-300 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-sky-400 animate-ping opacity-75" />
              </div>
              {/* Body Cylinder */}
              <div className="w-14 h-20 rounded-b-lg bg-white border border-slate-300 shadow-sm flex flex-col items-center justify-between py-1.5">
                {/* Digital LED Air Quality ring */}
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                  <span className="text-[7px] font-bold text-emerald-600">012</span>
                </div>
                {/* 360-degree Air intake perforation grilles */}
                <div className="space-y-0.5 px-1.5 w-full">
                  <div className="h-0.5 bg-slate-200 rounded-full w-full" />
                  <div className="h-0.5 bg-slate-200 rounded-full w-5/6 mx-auto" />
                  <div className="h-0.5 bg-slate-200 rounded-full w-full" />
                  <div className="h-0.5 bg-slate-200 rounded-full w-4/5 mx-auto" />
                </div>
                <span className="text-[8px] font-semibold text-slate-400 tracking-wider">
                  HEPA H13
                </span>
              </div>
            </div>

            {/* Clean air wave indicator */}
            <div className="absolute top-1 left-2 text-[10px] text-sky-600 font-bold">
              💨 99.97%
            </div>
          </div>

          {/* Right: Checklist with Green Circle Checkmarks */}
          <div className="flex-1 w-full space-y-2">
            {IAQ_HACKS.map(hack => (
              <div key={hack} className="flex items-start gap-2">
                <span
                  className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 shadow-2xs"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-xs font-medium text-slate-700 leading-snug">
                  {hack}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>DIY Corsi-Rosenthal blueprints available</span>
        <span className="text-sky-600 font-semibold cursor-pointer">CADR guide →</span>
      </div>
    </article>
  );
});
