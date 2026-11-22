// ============================================================
// src/components/Dashboard/PollutantCards.tsx
// Pollutant breakdown tiles with native SVG sparklines & micro-climate data
// Per EFFICIENCY.md §3: Lightweight inline SVG sparkline, zero chart library
// Per ACCESSIBILITY.md §1.1: Paired sr-only numerical description list
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo } from 'react';

import type { PollutantMeasurement } from '@/types';

import { AQICategory } from '@/types';
import { useAirAnalytics } from '@/hooks/useAirAnalytics';

const Sparkline = memo(function Sparkline({ values, color }: { values: number[]; color: string }) {
  const W = 160;
  const H = 36;
  const max = Math.max(...values, 1);
  const min = Math.min(...values);
  const range = max - min || 1;
  const step = values.length > 1 ? W / (values.length - 1) : W;

  const points = values.map((v, i) => ({
    x: i * step,
    y: H - ((v - min) / range) * (H - 6) - 3,
  }));

  const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="w-full h-9 overflow-visible">
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill={color} />
      ))}
    </svg>
  );
});

function getStatusBadge(status: AQICategory) {
  switch (status) {
    case AQICategory.Good:
      return { text: 'text-emerald-300', bg: 'bg-[#062d1f] border-emerald-800', stroke: '#10b981' };
    case AQICategory.Moderate:
      return { text: 'text-amber-300', bg: 'bg-[#2e1d08] border-amber-800', stroke: '#f59e0b' };
    case AQICategory.Poor:
      return { text: 'text-orange-300', bg: 'bg-[#2f1908] border-orange-800', stroke: '#f97316' };
    case AQICategory.VeryPoor:
    case AQICategory.Severe:
      return { text: 'text-red-300', bg: 'bg-[#331114] border-red-800', stroke: '#ef4444' };
  }
}

export const PollutantCards = memo(function PollutantCards() {
  const { selectedSector, pollutants } = useAirAnalytics();

  return (
    <section aria-label="Detailed Pollutant Measurements & Weather Metrics" className="flex flex-col gap-3">
      {/* WCAG 2.2 AA Twin Representation for Sparklines */}
      <div className="sr-only" aria-label="Pollutant 24-hour trend telemetry readings">
        <dl>
          {pollutants.map((p: PollutantMeasurement) => (
            <div key={`sr-pol-${p.type}`}>
              <dt>{p.type} current reading</dt>
              <dd>
                {p.value} {p.unit}, Status: {p.status}, WHO 24-hour safe guideline: {p.threshold} {p.unit},
                Historical trend values: {p.sparkline.join(', ')}.
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Main Grid: 5 Pollutant Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {pollutants.map((p: PollutantMeasurement) => {
          const badge = getStatusBadge(p.status);
          const isOverThreshold = p.value > p.threshold;

          return (
            <div
              key={p.type}
              role="article"
              aria-label={`${p.type} pollutant card`}
              className="bg-[#161b22] rounded border border-[#30363d] p-3 flex flex-col justify-between gap-2 hover:border-[#8b949e] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-white text-xs">{p.type}</h3>
                  <span className={`text-[10px] font-medium px-1.5 py-0.2 rounded border ${badge.bg} ${badge.text}`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-white font-mono">{p.value}</span>
                  <span className="text-[11px] text-slate-400">{p.unit}</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Safe: <span className={isOverThreshold ? 'text-amber-400 font-medium' : 'text-slate-300'}>{p.threshold} {p.unit}</span>
                </p>
              </div>

              {/* Native SVG Sparkline */}
              <div className="pt-1.5 border-t border-[#21262d]">
                <div className="flex items-center justify-between text-[9px] text-slate-500 mb-0.5">
                  <span>24h</span>
                  <span>Now</span>
                </div>
                <Sparkline values={p.sparkline} color={badge.stroke} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Micro-Climate & Inversion Diagnostics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#161b22] rounded border border-[#30363d] p-2.5">
        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">🌡️</span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Ambient Temperature</p>
            <p className="text-xs font-bold text-white">{selectedSector.temperature}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">💧</span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Humidity</p>
            <p className="text-xs font-bold text-white">{selectedSector.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">💨</span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Wind Speed</p>
            <p className="text-xs font-bold text-white">{selectedSector.windSpeed} km/h</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">⛰️</span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Inversion Risk</p>
            <p className={`text-xs font-bold ${selectedSector.inversionRisk === 'Critical' ? 'text-red-400' : 'text-amber-400'}`}>
              {selectedSector.inversionRisk}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
