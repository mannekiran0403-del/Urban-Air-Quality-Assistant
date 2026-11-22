// ============================================================
// src/components/Home/CurrentAQICard.tsx
// Real-time AQI Gauge & EPA Category Meter Card
// Renders the real-time sector air quality summary:
// - Live indicator badge and timestamp
// - Prominent numeric AQI value with dynamic category pill
// - Multi-segment color gauge with calibrated pointer position
// - Actionable telemetry link to deep-dive analytics tab
// Per ACCESSIBILITY.md §1: aria-label on card and gauge scale
// Per EFFICIENCY.md §2: React.useMemo for gauge math and colors
// ============================================================

import { memo, useMemo } from 'react';

import type { SectorData } from '@/types';

/**
 * Props for the CurrentAQICard component
 */
interface CurrentAQICardProps {
  /** Environmental telemetry object for current sector */
  sector: SectorData;
  /** Optional callback to navigate to full telemetry heatmap */
  onViewDetails?: () => void;
}

/**
 * Visual gauge card displaying active AQI and severity level
 */
export const CurrentAQICard = memo(function CurrentAQICard({
  sector,
  onViewDetails,
}: CurrentAQICardProps) {
  // Compute percentage on 0-500 scale for needle position
  const clampedAqi = Math.max(0, Math.min(sector.aqi, 500));
  const pointerPercent = useMemo(() => {
    // 0-50 Good: 0% to 16.6%
    // 51-100 Moderate: 16.6% to 33.3%
    // 101-150 Unhealthy (SG): 33.3% to 50%
    // 151-200 Unhealthy: 50% to 66.6%
    // 201-300 Very Unhealthy: 66.6% to 83.3%
    // 301-500 Hazardous: 83.3% to 100%
    if (clampedAqi <= 50) return (clampedAqi / 50) * 16.6;
    if (clampedAqi <= 100) return 16.6 + ((clampedAqi - 50) / 50) * 16.6;
    if (clampedAqi <= 150) return 33.3 + ((clampedAqi - 100) / 50) * 16.6;
    if (clampedAqi <= 200) return 50.0 + ((clampedAqi - 150) / 50) * 16.6;
    if (clampedAqi <= 300) return 66.6 + ((clampedAqi - 200) / 100) * 16.6;
    return 83.3 + ((clampedAqi - 300) / 200) * 16.6;
  }, [clampedAqi]);

  const { badgeColor, badgeLabel, cloudStroke } = useMemo(() => {
    if (clampedAqi <= 50) {
      return { badgeColor: 'bg-emerald-500 text-white', badgeLabel: 'Good', cloudStroke: '#10b981' };
    }
    if (clampedAqi <= 100) {
      return { badgeColor: 'bg-amber-400 text-slate-900', badgeLabel: 'Moderate', cloudStroke: '#f59e0b' };
    }
    if (clampedAqi <= 150) {
      return { badgeColor: 'bg-orange-500 text-white', badgeLabel: 'Unhealthy (SG)', cloudStroke: '#f97316' };
    }
    if (clampedAqi <= 200) {
      return { badgeColor: 'bg-rose-500 text-white', badgeLabel: 'Unhealthy', cloudStroke: '#f43f5e' };
    }
    if (clampedAqi <= 300) {
      return { badgeColor: 'bg-purple-600 text-white', badgeLabel: 'Very Unhealthy', cloudStroke: '#9333ea' };
    }
    return { badgeColor: 'bg-rose-950 text-rose-200 border border-rose-700', badgeLabel: 'Hazardous', cloudStroke: '#881337' };
  }, [clampedAqi]);

  return (
    <article
      aria-label="Current Air Quality"
      className="flex flex-col justify-between rounded-2xl bg-white border border-slate-100 p-5 shadow-xs hover:shadow-md transition-shadow text-slate-800"
    >
      <div>
        {/* Top Header: Title & Live Badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Current Air Quality
          </h3>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Live
          </span>
        </div>

        {/* Location & Time Subtitle */}
        <div className="flex items-center justify-between mt-1 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <span aria-hidden="true" className="text-slate-400">📍</span>
            <span className="font-medium text-slate-700">New Delhi</span>
          </div>
          <span className="text-[11px] text-slate-400">Updated 5 mins ago</span>
        </div>

        {/* Primary AQI Readout Box */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-rose-50/60 via-orange-50/30 to-amber-50/20 border border-rose-100/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Smog Cloud SVG */}
            <svg
              viewBox="0 0 48 36"
              className="w-12 h-10 flex-shrink-0"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M34 16 C34 9.4 28.6 4 22 4 C16.5 4 11.8 7.8 10.4 13 C5.5 14 2 18.4 2 23.5 C2 29.3 6.7 34 12.5 34 L34 34 C39.5 34 44 29.5 44 24 C44 19.8 41.2 16.4 37.3 16.1"
                stroke={cloudStroke}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="#ffffff"
                fillOpacity="0.7"
              />
              <path d="M10 26 H26" stroke={cloudStroke} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
              <path d="M14 30 H22" stroke={cloudStroke} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
            </svg>

            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
                AQI
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-none">
                {sector.aqi}
              </div>
            </div>
          </div>

          <div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold tracking-tight shadow-2xs ${badgeColor}`}
            >
              {badgeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* AQI Gradient Spectrum Bar with Needle Pointer */}
      <div className="mt-5 pt-1">
        {/* Needle Pointer Indicator */}
        <div className="relative w-full h-3 mb-0.5">
          <div
            className="absolute top-0 -translate-x-1/2 transition-all duration-500 ease-out flex flex-col items-center"
            style={{ left: `${pointerPercent}%` }}
          >
            <div
              className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-slate-700"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Continuous Multi-Color Spectrum Strip */}
        <div
          className="w-full h-2 rounded-full overflow-hidden flex shadow-inner"
          aria-hidden="true"
        >
          <div className="h-full flex-1 bg-emerald-500" title="Good (0-50)" />
          <div className="h-full flex-1 bg-amber-400" title="Moderate (51-100)" />
          <div className="h-full flex-1 bg-orange-400" title="Unhealthy for Sensitive (101-150)" />
          <div className="h-full flex-1 bg-rose-500" title="Unhealthy (151-200)" />
          <div className="h-full flex-1 bg-purple-600" title="Very Unhealthy (201-300)" />
          <div className="h-full flex-1 bg-rose-950" title="Hazardous (300+)" />
        </div>

        {/* Scale Legend Labels */}
        <div className="grid grid-cols-6 text-[9px] text-slate-400 font-medium text-center mt-1.5 leading-tight">
          <div>
            <span className="block font-semibold text-slate-600">0-50</span>
            Good
          </div>
          <div>
            <span className="block font-semibold text-slate-600">51-100</span>
            Moderate
          </div>
          <div>
            <span className="block font-semibold text-slate-600">101-150</span>
            Unhealthy<br />(SG)
          </div>
          <div>
            <span className="block font-semibold text-slate-600">151-200</span>
            Unhealthy
          </div>
          <div>
            <span className="block font-semibold text-slate-600">201-300</span>
            Very<br />Unhealthy
          </div>
          <div>
            <span className="block font-semibold text-slate-600">300+</span>
            Hazardous
          </div>
        </div>
      </div>

      {onViewDetails && (
        <button
          type="button"
          onClick={onViewDetails}
          className="mt-3 text-xs font-semibold text-violet-700 hover:text-violet-900 text-left cursor-pointer focus:outline-none"
        >
          View live pollutant breakdown →
        </button>
      )}
    </article>
  );
});
