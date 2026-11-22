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
      className="bg-[#161b22] rounded border border-[#30363d] p-3.5 flex flex-col gap-3.5"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#30363d] pb-2.5">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <span aria-hidden="true">🧭</span> Lowest-Exposure Transit & Commute Navigator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Dijkstra-driven pathfinding prioritizing corridors with lowest toxic particulate concentration and filtered transit cabins.
          </p>
        </div>

        {recommendedRoute && (
          <div className="bg-[#062d1f] border border-emerald-800 rounded px-2.5 py-1 text-right shrink-0">
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">Top Recommendation</span>
            <span className="text-xs font-bold text-white">{recommendedRoute.title}</span>
          </div>
        )}
      </div>

      {/* Origin & Destination Waypoint Form */}
      <form
        aria-label="Commute Origin and Destination Selection"
        className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end bg-[#0d1117] p-2.5 rounded border border-[#30363d]"
        onSubmit={e => e.preventDefault()}
      >
        <fieldset className="sm:col-span-2 border border-[#30363d] rounded p-2 bg-[#161b22]">
          <legend className="text-[10px] font-semibold text-emerald-400 px-1 uppercase tracking-wider">Starting Waypoint</legend>
          <label htmlFor="origin-waypoint" className="sr-only">Origin Waypoint</label>
          <select
            id="origin-waypoint"
            value={startNode}
            onChange={e => setStartNode(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
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
            className="w-full sm:w-auto px-3 py-1.5 rounded bg-[#21262d] hover:bg-[#30363d] text-sky-400 border border-[#30363d] text-xs font-semibold transition-colors"
          >
            ⇄ Swap
          </button>
        </div>

        <fieldset className="sm:col-span-2 border border-[#30363d] rounded p-2 bg-[#161b22]">
          <legend className="text-[10px] font-semibold text-sky-400 px-1 uppercase tracking-wider">Destination Waypoint</legend>
          <label htmlFor="dest-waypoint" className="sr-only">Destination Waypoint</label>
          <select
            id="dest-waypoint"
            value={targetNode}
            onChange={e => setTargetNode(e.target.value)}
            className="w-full bg-[#0d1117] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
          >
            {availableNodes.map(node => (
              <option key={`target-${node}`} value={node}>{node}</option>
            ))}
          </select>
        </fieldset>
      </form>

      {/* Physiological Dose Comparison Matrix */}
      <div className="bg-[#0d1117] rounded border border-[#30363d] p-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5 mb-2.5">
          <span aria-hidden="true">📊</span> Multi-Modal Inhaled PM2.5 Dose Comparison
        </h3>

        <div className="space-y-2">
          {routes.map(r => {
            const isLowest = recommendedRoute?.routeId === r.routeId;
            const dosePercent = Math.min((r.inhaledPM25Micrograms / 40) * 100, 100);

            return (
              <div key={`matrix-${r.routeId}`} className="flex flex-col gap-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-200">{r.title}</span>
                  <span className="font-mono text-xs">
                    <strong className={isLowest ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                      {r.inhaledPM25Micrograms} µg
                    </strong>{' '}
                    <span className="text-[11px] text-slate-500">({r.estimatedMinutes}m)</span>
                  </span>
                </div>
                <div className="w-full bg-[#21262d] rounded-sm h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-sm transition-all duration-300 ${
                      isLowest ? 'bg-[#238636]' : dosePercent > 60 ? 'bg-[#b91c1c]' : 'bg-[#0969da]'
                    }`}
                    style={{ width: `${Math.max(dosePercent, 6)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Route Cards */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
          <span>Turn-by-Turn Route Options ({routes.length})</span>
        </h3>

        {routes.map(route => (
          <RouteOptionCard
            key={route.routeId}
            route={route}
            isSelected={selectedRouteId === route.routeId}
            onSelect={setSelectedRouteId}
          />
        ))}
      </div>
    </section>
  );
});
