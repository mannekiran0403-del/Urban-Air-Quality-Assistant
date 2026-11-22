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
      <div className="bg-[#161b22] border-b border-[#30363d] px-4 sm:px-6 py-1.5 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="text-[11px]">Urban Air Telemetry Active — Sector: <strong className="text-white font-medium">{selectedSector.sectorName}</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={triggerSmogSpike}
            className="px-2 py-0.5 rounded text-[11px] font-medium bg-[#21262d] hover:bg-[#30363d] text-slate-300 border border-[#30363d] transition-colors focus:ring-1 focus:ring-emerald-500"
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
      className="bg-[#1f1315] border-b border-red-800 text-white px-4 sm:px-6 py-2 transition-all"
    >
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-base" aria-hidden="true">⚠️</span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-bold uppercase tracking-wide text-red-200">
                Critical Smog Alert — Severe Winter Inversion Active
              </h2>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-950 text-red-300 border border-red-700">
                AQI {selectedSector.aqi}
              </span>
            </div>
            <p className="text-[11px] text-red-200/80 mt-0.5">
              Sector: <strong>{selectedSector.sectorName}</strong> (PM2.5: {selectedSector.pm25} µg/m³). Avoid outdoor exposure. Run indoor HEPA scrubbers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
          <button
            type="button"
            onClick={resetTelemetry}
            className="px-2 py-1 rounded text-[11px] font-medium bg-red-950 hover:bg-red-900 text-red-200 border border-red-800 transition-colors"
          >
            Reset Telemetry
          </button>
          <button
            type="button"
            onClick={dismissAlert}
            aria-label="Dismiss critical smog alert"
            className="px-2 py-1 rounded text-[11px] font-medium bg-[#21262d] hover:bg-[#30363d] text-slate-300 border border-[#30363d] transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
});
