// ============================================================
// src/components/Navigation/RouteOptionCard.tsx
// Route comparison card displaying inhaled particulate dose & turn-by-turn
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo, useState } from 'react';

import type { RouteOption, TransitMode } from '@/types';

interface RouteOptionCardProps {
  route: RouteOption;
  isSelected: boolean;
  onSelect: (routeId: string) => void;
}

function getModeIcon(mode: TransitMode): string {
  switch (mode) {
    case 'metro': return '🚇';
    case 'ev': return '⚡';
    case 'bus': return '🚌';
    case 'cycle': return '🚲';
    case 'walk': return '🚶';
  }
}

export const RouteOptionCard = memo(function RouteOptionCard({
  route,
  isSelected,
  onSelect,
}: RouteOptionCardProps) {
  const [showSteps, setShowSteps] = useState<boolean>(false);
  const icon = getModeIcon(route.mode);

  return (
    <div
      role="article"
      aria-label={`${route.title} transit card`}
      className={`rounded border p-3 flex flex-col gap-2.5 transition-colors ${
        isSelected
          ? 'bg-[#161b22] border-sky-500 ring-1 ring-sky-500/40'
          : 'bg-[#161b22] border-[#30363d] hover:border-[#8b949e]/40'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="text-base w-7 h-7 flex items-center justify-center rounded bg-[#0d1117] border border-[#30363d]" aria-hidden="true">
            {icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-100 text-xs sm:text-sm">{route.title}</h3>
              {route.isRecommended && (
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-[#062d1f] text-emerald-400 border border-emerald-800">
                  ★ Lowest Inhalation
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Path: {route.path.join(' ➔ ')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(route.routeId)}
          className={`px-2.5 py-1 rounded text-xs font-semibold transition-colors ${
            isSelected
              ? 'bg-sky-600 text-white'
              : 'bg-[#21262d] text-slate-300 hover:bg-[#30363d] border border-[#30363d]'
          }`}
        >
          {isSelected ? 'Active Route' : 'Select'}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-[#30363d]">
        <div className="bg-[#0d1117] rounded p-2 border border-[#21262d]">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Estimated Duration</p>
          <p className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5">{route.estimatedMinutes} mins</p>
        </div>

        <div className="bg-[#0d1117] rounded p-2 border border-[#21262d]">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Travel Distance</p>
          <p className="text-xs sm:text-sm font-bold text-slate-100 mt-0.5">{route.totalDistanceKm} km</p>
        </div>

        <div className="bg-[#0d1117] rounded p-2 border border-[#21262d]">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Inhaled PM2.5 Dose</p>
          <p className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">{route.inhaledPM25Micrograms} µg</p>
        </div>

        <div className="bg-[#0d1117] rounded p-2 border border-[#21262d]">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Dose Reduction</p>
          <p className="text-xs sm:text-sm font-bold text-sky-400 mt-0.5">
            {route.riskReductionVsWalking > 0 ? `-${route.riskReductionVsWalking}%` : 'Baseline'}
          </p>
        </div>
      </div>

      {/* Turn-by-Turn Collapsible Details */}
      <div className="pt-0.5">
        <button
          type="button"
          onClick={() => setShowSteps(prev => !prev)}
          className="text-xs font-medium text-sky-400 hover:text-sky-300 flex items-center gap-1 focus:outline-none"
        >
          <span>{showSteps ? '▲ Hide turn-by-turn corridor breakdown' : '▼ View turn-by-turn corridor breakdown'}</span>
          <span className="text-[11px] text-slate-500">({route.steps.length} segments)</span>
        </button>

        {showSteps && (
          <ol className="mt-2.5 space-y-1.5 border-l border-[#30363d] ml-1.5 pl-2.5">
            {route.steps.map((step, idx) => (
              <li key={idx} className="text-xs text-slate-300 relative">
                <span className="absolute -left-[14px] top-1.5 w-1.5 h-1.5 rounded-full bg-sky-400" aria-hidden="true" />
                <p className="font-medium text-slate-100">{step.instruction}</p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-0.5">
                  <span>{step.distanceKm} km ({step.segmentDurationMinutes}m)</span>
                  <span>•</span>
                  <span>Corridor AQI: <strong className="text-amber-400">{step.corridorAQI}</strong></span>
                  <span>•</span>
                  <span>Dose: {step.segmentDoseMicrograms} µg</span>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
});
