// ============================================================
// src/components/Dashboard/AQIHeatmap.tsx
// Native SVG Urban AQI Heatmap & Micro-Sector Telemetry
// Per EFFICIENCY.md §3: Native SVG renderer, zero heavy chart libraries
// Per ACCESSIBILITY.md §1.1: Paired sr-only textual description list
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo } from 'react';

import type { SectorData } from '@/types';

import { useApp } from '@/context/AppContext';

function getCategoryColor(aqi: number): { fill: string; stroke: string; text: string; bg: string } {
  if (aqi <= 50) return { fill: '#10b981', stroke: '#10b981', text: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' };
  if (aqi <= 100) return { fill: '#f59e0b', stroke: '#f59e0b', text: 'text-amber-800', bg: 'bg-amber-50 border-amber-200' };
  if (aqi <= 200) return { fill: '#f97316', stroke: '#f97316', text: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' };
  if (aqi <= 300) return { fill: '#ef4444', stroke: '#ef4444', text: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };
  return { fill: '#881337', stroke: '#881337', text: 'text-rose-900', bg: 'bg-rose-100 border-rose-300' };
}

// Fixed coordinates on an 800x420 urban canvas grid
const SECTOR_COORDINATES: Record<string, { cx: number; cy: number; r: number; labelDx: number; labelDy: number }> = {
  'SEC-01': { cx: 400, cy: 210, r: 64, labelDx: 0, labelDy: 5 }, // CBD
  'SEC-02': { cx: 190, cy: 120, r: 54, labelDx: 0, labelDy: 5 }, // Green Belt
  'SEC-03': { cx: 640, cy: 130, r: 72, labelDx: 0, labelDy: 5 }, // Industrial North
  'SEC-04': { cx: 210, cy: 310, r: 52, labelDx: 0, labelDy: 5 }, // University
  'SEC-05': { cx: 580, cy: 300, r: 60, labelDx: 0, labelDy: 5 }, // Riverfront Transit
};

export const AQIHeatmap = memo(function AQIHeatmap() {
  const { sectors, selectedSectorId, setSelectedSectorId } = useApp();

  return (
    <div
      role="region"
      aria-label="Urban Air Quality Telemetry Heatmap"
      className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col gap-4 text-slate-800"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🗺️</span>
            <span>Urban Sector AQI Heatmap</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Interactive sector exposure map. High thermal inversions and industrial plumes intensify toward northeast.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-slate-600">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" aria-hidden="true" /> Good</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" aria-hidden="true" /> Moderate</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-400" aria-hidden="true" /> Poor</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" aria-hidden="true" /> Hazardous</span>
        </div>
      </div>

      {/* WCAG 2.2 AA Twin Representation Rule: Paired sr-only screen reader list */}
      <div className="sr-only" aria-label="Urban sector air quality telemetry description list">
        <dl>
          {sectors.map((s: SectorData) => (
            <div key={`sr-${s.sectorId}`}>
              <dt>{s.sectorName} ({s.sectorId})</dt>
              <dd>
                Air Quality Index: {s.aqi}, Status: {s.category}, Fine Particulate PM2.5: {s.pm25} micrograms per cubic meter,
                Thermal Inversion Risk: {s.inversionRisk}, Optimal Outdoor Window: {s.safeOutdoorWindow}.
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Native SVG Heatmap Visual Canvas */}
      <div className="relative w-full aspect-[21/9] min-h-[240px] max-h-[320px] bg-slate-50/70 rounded-xl border border-slate-200/80 p-2 overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 800 420"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="smogGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cleanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f8fafc" stopOpacity="0" />
            </radialGradient>
            <pattern id="urbanGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(203, 213, 225, 0.45)" strokeWidth="0.8" />
            </pattern>
          </defs>

          {/* Grid lines */}
          <rect width="800" height="420" fill="url(#urbanGrid)" />

          {/* Connecting Transit Corridors */}
          <line x1="190" y1="120" x2="400" y2="210" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 4" />
          <line x1="400" y1="210" x2="640" y2="130" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 4" />
          <line x1="210" y1="310" x2="400" y2="210" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 4" />
          <line x1="400" y1="210" x2="580" y2="300" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="4 4" />
          <line x1="190" y1="120" x2="210" y2="310" stroke="#10b981" strokeWidth="2.5" strokeOpacity="0.5" />

          {/* Render Sector Blobs */}
          {sectors.map((sector: SectorData) => {
            const coords = SECTOR_COORDINATES[sector.sectorId] ?? { cx: 400, cy: 200, r: 50, labelDx: 0, labelDy: 0 };
            const isSelected = sector.sectorId === selectedSectorId;
            const colors = getCategoryColor(sector.aqi);

            return (
              <g
                key={sector.sectorId}
                role="button"
                tabIndex={0}
                aria-label={`Select monitoring sector ${sector.sectorName}, AQI ${sector.aqi}, Status ${sector.category}`}
                className="cursor-pointer transition-transform duration-200 hover:scale-105 focus:outline-none"
                onClick={() => setSelectedSectorId(sector.sectorId)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedSectorId(sector.sectorId);
                  }
                }}
              >
                {/* Dispersion Plume Ring */}
                <circle
                  cx={coords.cx}
                  cy={coords.cy}
                  r={coords.r + 20}
                  fill={colors.fill}
                  fillOpacity={isSelected ? 0.3 : 0.12}
                />

                {/* Main Sector Node */}
                <circle
                  cx={coords.cx}
                  cy={coords.cy}
                  r={coords.r}
                  fill="#ffffff"
                  stroke={isSelected ? '#7c3aed' : colors.stroke}
                  strokeWidth={isSelected ? 3.5 : 2}
                  filter="drop-shadow(0 2px 4px rgba(0,0,0,0.06))"
                />

                {/* AQI Value Metric */}
                <text
                  x={coords.cx}
                  y={coords.cy - 8}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="22"
                  fontWeight="900"
                >
                  {sector.aqi}
                </text>

                {/* Category Subtext */}
                <text
                  x={coords.cx}
                  y={coords.cy + 12}
                  textAnchor="middle"
                  fill={colors.stroke}
                  fontSize="11"
                  fontWeight="700"
                >
                  {sector.category.split(' ')[0]}
                </text>

                {/* Sector Name */}
                <text
                  x={coords.cx}
                  y={coords.cy + coords.r + 18}
                  textAnchor="middle"
                  fill="#334155"
                  fontSize="12"
                  fontWeight="600"
                >
                  {sector.sectorName}
                </text>

                {/* Selection Indicator Ring */}
                {isSelected && (
                  <circle
                    cx={coords.cx}
                    cy={coords.cy}
                    r={coords.r + 8}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Sector Quick-Select Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
        {sectors.map((s: SectorData) => {
          const isSelected = s.sectorId === selectedSectorId;
          const colors = getCategoryColor(s.aqi);

          return (
            <button
              key={s.sectorId}
              type="button"
              onClick={() => setSelectedSectorId(s.sectorId)}
              className={`p-3 rounded-xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer shadow-2xs
                ${isSelected ? 'bg-violet-50/80 border-violet-400 ring-1 ring-violet-400' : 'bg-[#fbfbfe] border-slate-200 hover:bg-white hover:border-slate-300'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-slate-800 truncate pr-1">{s.sectorName}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                  {s.aqi}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">PM2.5: {s.pm25} µg/m³</p>
            </button>
          );
        })}
      </div>
    </div>
  );
});
