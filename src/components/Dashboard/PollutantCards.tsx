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
      return { text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200', stroke: '#10b981' };
    case AQICategory.Moderate:
      return { text: 'text-amber-800', bg: 'bg-amber-50 border-amber-200', stroke: '#f59e0b' };
    case AQICategory.Poor:
      return { text: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', stroke: '#f97316' };
    case AQICategory.VeryPoor:
    case AQICategory.Severe:
      return { text: 'text-rose-700', bg: 'bg-rose-50 border-rose-200', stroke: '#ef4444' };
  }
}

export const PollutantCards = memo(function PollutantCards() {
  const { selectedSector, pollutants } = useAirAnalytics();

  return (
    <section aria-label="Detailed Pollutant Measurements & Weather Metrics" className="flex flex-col gap-4">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {pollutants.map((p: PollutantMeasurement) => {
          const badge = getStatusBadge(p.status);
          const isOverThreshold = p.value > p.threshold;

          return (
            <div
              key={p.type}
              role="article"
              aria-label={`${p.type} pollutant card`}
              className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs flex flex-col justify-between gap-3 hover:border-violet-200 hover:shadow-md transition-all text-slate-800"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-slate-900 text-xs tracking-tight">{p.type}</h3>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg} ${badge.text}`}>
                    {p.status}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-extrabold text-slate-900 font-mono">{p.value}</span>
                  <span className="text-xs text-slate-500 font-medium">{p.unit}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Safe: <span className={isOverThreshold ? 'text-amber-700 font-semibold' : 'text-slate-600 font-medium'}>{p.threshold} {p.unit}</span>
                </p>
              </div>

              {/* Native SVG Sparkline */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1">
                  <span>24h ago</span>
                  <span>Now</span>
                </div>
                <Sparkline values={p.sparkline} color={badge.stroke} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Micro-Climate & Inversion Diagnostics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-xs text-slate-800">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
            🌡️
          </span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Ambient Temperature</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedSector.temperature}°C</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
            💧
          </span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Humidity</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedSector.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
            💨
          </span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Wind Speed</p>
            <p className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedSector.windSpeed} km/h</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
            ⛰️
          </span>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Inversion Risk</p>
            <p className={`text-sm font-extrabold mt-0.5 ${selectedSector.inversionRisk === 'Critical' ? 'text-rose-600' : 'text-amber-600'}`}>
              {selectedSector.inversionRisk}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
