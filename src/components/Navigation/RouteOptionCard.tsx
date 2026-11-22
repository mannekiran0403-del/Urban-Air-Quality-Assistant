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
      className={`rounded-2xl border p-4 sm:p-5 flex flex-col gap-3 transition-all text-slate-800 ${
        isSelected
          ? 'bg-violet-50/40 border-violet-400 shadow-sm ring-1 ring-violet-300'
          : 'bg-[#fbfbfe] hover:bg-white border-slate-200/80 shadow-2xs hover:shadow-xs'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-lg w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 shadow-2xs" aria-hidden="true">
            {icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-sm">{route.title}</h3>
              {route.isRecommended && (
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  ★ Lowest Inhalation
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              Path: {route.path.join(' ➔ ')}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSelect(route.routeId)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-2xs ${
            isSelected
              ? 'bg-violet-700 text-white shadow-xs'
              : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          {isSelected ? 'Active Route' : 'Select'}
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-200/60">
        <div className="bg-white rounded-xl p-3 border border-slate-200/60 shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Estimated Duration</p>
          <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1">{route.estimatedMinutes} mins</p>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200/60 shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Travel Distance</p>
          <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1">{route.totalDistanceKm} km</p>
        </div>

        <div className="bg-white rounded-xl p-3 border border-slate-200/60 shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Average AQI</p>
          <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1 font-mono">{route.averageAQI}</p>
        </div>

        <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-100 shadow-2xs">
          <p className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">Risk Reduction</p>
          <p className="text-xs sm:text-sm font-extrabold text-emerald-700 mt-1">
            {route.riskReductionVsWalking > 0 ? `-${route.riskReductionVsWalking}%` : 'Baseline'}
          </p>
        </div>
      </div>

      {/* Turn-by-Turn Collapsible Details */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowSteps(!showSteps)}
          className="text-xs font-semibold text-violet-700 hover:text-violet-900 flex items-center gap-1 cursor-pointer"
        >
          <span>{showSteps ? 'Hide' : 'View'} turn-by-turn exposure breakdown ({route.steps.length} segments)</span>
          <span aria-hidden="true">{showSteps ? '▲' : '▼'}</span>
        </button>

        {showSteps && (
          <div className="mt-2.5 space-y-1.5 border-t border-slate-100 pt-2 text-xs">
            {route.steps.map((step, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-100">
                <span className="text-slate-700 font-medium">{step.instruction}</span>
                <span className="text-slate-500 font-mono text-[11px]">
                  {step.distanceKm} km • AQI {step.corridorAQI}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
