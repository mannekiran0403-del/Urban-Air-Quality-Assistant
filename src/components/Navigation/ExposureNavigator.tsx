// ============================================================
// src/components/Navigation/ExposureNavigator.tsx
// Lowest-Exposure Commute Navigator & Multi-Modal Dose Comparison
// Uses Dijkstra-based pathfinding in src/lib/airCompute.ts
// Per ACCESSIBILITY.md: fieldset, legend, labels, ARIA landmarks
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo, useState } from 'react';

import { useExposureRouting } from '@/hooks/useExposureRouting';
import { RouteOptionCard } from '@/components/Navigation/RouteOptionCard';

export const ExposureNavigator = memo(function ExposureNavigator() {
  const {
    startNode,
    setStartNode,
    targetNode,
    setTargetNode,
    availableNodes,
    routes,
    recommendedRoute,
    swapNodes,
  } = useExposureRouting();

  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-metro');

  return (
    <section
      aria-label="Lowest-Exposure Transit & Commute Navigator"
      className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col gap-4 text-slate-800"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🧭</span>
            <span>Lowest-Exposure Transit & Commute Navigator</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dijkstra-driven pathfinding prioritizing corridors with lowest toxic particulate concentration and filtered transit cabins.
          </p>
        </div>

        {recommendedRoute && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-right shrink-0">
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Top Recommendation</span>
            <span className="text-xs font-bold text-emerald-700">{recommendedRoute.title}</span>
          </div>
        )}
      </div>

      {/* Origin & Destination Waypoint Form */}
      <form
        aria-label="Commute Origin and Destination Selection"
        className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-end bg-[#fbfbfe] p-3.5 rounded-xl border border-slate-200/80 shadow-2xs"
        onSubmit={e => e.preventDefault()}
      >
        <fieldset className="sm:col-span-2 border border-slate-200 rounded-xl p-2.5 bg-white">
          <legend className="text-[10px] font-bold text-emerald-700 px-1.5 uppercase tracking-wider">Starting Waypoint</legend>
          <label htmlFor="origin-waypoint" className="sr-only">Origin Waypoint</label>
          <select
            id="origin-waypoint"
            value={startNode}
            onChange={e => setStartNode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-medium"
          >
            {availableNodes.map(node => (
              <option key={`start-${node}`} value={node}>{node}</option>
            ))}
          </select>
        </fieldset>

        <div className="flex justify-center sm:col-span-1 pb-0.5">
          <button
            type="button"
            onClick={swapNodes}
            aria-label="Swap origin and destination"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-violet-700 border border-slate-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            ⇄ Swap
          </button>
        </div>

        <fieldset className="sm:col-span-2 border border-slate-200 rounded-xl p-2.5 bg-white">
          <legend className="text-[10px] font-bold text-violet-700 px-1.5 uppercase tracking-wider">Destination Waypoint</legend>
          <label htmlFor="dest-waypoint" className="sr-only">Destination Waypoint</label>
          <select
            id="dest-waypoint"
            value={targetNode}
            onChange={e => setTargetNode(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-medium"
          >
            {availableNodes.map(node => (
              <option key={`dest-${node}`} value={node}>{node}</option>
            ))}
          </select>
        </fieldset>
      </form>

      {/* Transit Option Cards */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
          Multi-Modal Inhaled PM2.5 Dose Comparison
        </h3>

        <div className="space-y-3">
          {routes.map(r => (
            <RouteOptionCard
              key={r.routeId}
              route={r}
              isSelected={r.routeId === selectedRouteId}
              onSelect={setSelectedRouteId}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
