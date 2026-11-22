// ============================================================
// src/components/shared/AlertBanner.tsx
// High-severity smog alert banner with ARIA live assertive support
// Per ACCESSIBILITY.md §3: role="alert", aria-live="assertive"
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo } from 'react';

import { useApp } from '@/context/AppContext';

export const AlertBanner = memo(function AlertBanner() {
  const { selectedSector, alertDismissed, dismissAlert, triggerSmogSpike, resetTelemetry } = useApp();

  const isHazardous = selectedSector.aqi > 200 || selectedSector.inversionRisk === 'Critical';

  if (!isHazardous || alertDismissed) {
    return (
      <div className="w-full bg-slate-100/90 border-b border-slate-200/80 px-4 sm:px-8 py-1.5 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-[11px]">
            Urban Air Telemetry Active — Sector: <strong className="text-slate-800 font-semibold">{selectedSector.sectorName}</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerSmogSpike}
            className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 transition-colors focus:ring-1 focus:ring-violet-500 cursor-pointer shadow-2xs"
          >
            Simulate Smog Inversion Spike
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="w-full bg-rose-50 border-b border-rose-200 text-rose-950 px-4 sm:px-8 py-2.5 transition-all shadow-xs"
    >
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-base" aria-hidden="true">⚠️</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-wide text-rose-800">
                Critical Smog Alert — Severe Winter Inversion Active
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600 text-white">
                AQI {selectedSector.aqi}
              </span>
            </div>
            <p className="text-[11px] text-rose-700 mt-0.5">
              Sector: <strong>{selectedSector.sectorName}</strong> (PM2.5: {selectedSector.pm25} µg/m³). Avoid outdoor exposure. Run indoor HEPA scrubbers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={resetTelemetry}
            className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-white hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors cursor-pointer"
          >
            Reset Telemetry
          </button>
          <button
            type="button"
            onClick={dismissAlert}
            aria-label="Dismiss critical smog alert"
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-2xs"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
});
