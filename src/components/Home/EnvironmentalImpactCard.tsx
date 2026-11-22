import { memo } from 'react';

export const EnvironmentalImpactCard = memo(function EnvironmentalImpactCard() {
  return (
    <article
      aria-label="Your Environmental Impact"
      className="flex flex-col justify-between rounded-2xl bg-white border border-slate-100 p-5 shadow-xs hover:shadow-md transition-shadow text-slate-800"
    >
      <div>
        {/* Header with Info Icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span
              className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm flex-shrink-0"
              aria-hidden="true"
            >
              🍃
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Your Environmental Impact
            </h3>
          </div>
          <span
            className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs"
            title="Calculated from your verified transit choices and clean cooking pledges"
            aria-label="Impact calculation details"
          >
            ⓘ
          </span>
        </div>

        <p className="mt-1 text-xs text-slate-500 font-normal">
          Estimated monthly impact from your choices
        </p>

        {/* Two Metric Cards Side-by-Side */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          {/* Metric 1: Carbon Emissions Avoided */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-100/80 flex flex-col items-center text-center shadow-2xs">
            <span className="text-xl" aria-hidden="true">
              ☁️
            </span>
            <div className="mt-1 text-sm sm:text-base font-extrabold text-slate-900">
              ~ 36.2 kg CO₂e
            </div>
            <span className="text-[11px] font-medium text-slate-500 mt-0.5">
              emissions avoided
            </span>
          </div>

          {/* Metric 2: Fuel Saved */}
          <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-100/80 flex flex-col items-center text-center shadow-2xs">
            <span className="text-xl" aria-hidden="true">
              ⛽
            </span>
            <div className="mt-1 text-sm sm:text-base font-extrabold text-slate-900">
              ≈ 14.5 L
            </div>
            <span className="text-[11px] font-medium text-slate-500 mt-0.5">
              of fuel saved
            </span>
          </div>
        </div>

        {/* Tree Equivalent Callout Banner */}
        <div className="mt-3.5 p-3 rounded-xl bg-[#eefaf4] border border-emerald-200/60 flex items-center justify-center gap-2.5 text-center shadow-2xs">
          {/* Small Bonsai / Tree Graphic */}
          <span className="text-2xl" aria-hidden="true">
            🌳
          </span>
          <div className="text-xs font-semibold text-slate-800">
            That's like planting{' '}
            <strong className="text-emerald-700 font-bold">1.6 trees</strong> per
            month! 🌱
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Verified via EPA & CPCB conversion factors</span>
        <span className="text-emerald-600 font-semibold cursor-pointer">View pledges →</span>
      </div>
    </article>
  );
});
