import { memo } from 'react';
import type { TabId } from '@/types';
import heroBannerBg from '@/assets/hero-banner-bg.jpg';

interface HeroBannerProps {
  onNavigateTab: (tab: TabId) => void;
  onOpenHowItWorks?: () => void;
}

export const HeroBanner = memo(function HeroBanner({
  onNavigateTab,
  onOpenHowItWorks,
}: HeroBannerProps) {
  return (
    <section
      aria-label="Welcome and Quick Actions"
      className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-violet-100/80 p-6 sm:p-7 lg:p-8 shadow-xs text-slate-800 min-h-[220px] sm:min-h-[240px] flex items-center"
    >
      {/* Background Panorama Image */}
      <img
        src={heroBannerBg}
        alt="Respiro AI Clean Air Skyline and Family"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
        loading="eager"
      />

      {/* Soft gradient mask on the left for contrast and high-legibility typography */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent sm:from-white/85 sm:via-white/25 sm:to-transparent pointer-events-none z-1"
      />

      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="flex-1 max-w-lg text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Breathe Easier with{' '}
            <span className="text-violet-700 bg-clip-text">Respiro AI</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed drop-shadow-2xs">
            Your GenAI-powered assistant for safer, cleaner, and more sustainable
            living in times of winter smog and urban air pollution.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('routine')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 active:bg-violet-900 text-white text-sm font-semibold shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 cursor-pointer"
            >
              <span>Get Personalized Plan</span>
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/95 hover:bg-white text-slate-800 hover:text-violet-700 text-sm font-medium border border-slate-200/90 shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
            >
              <span aria-hidden="true" className="text-violet-600 font-bold">
                ▷
              </span>
              <span>How It Works</span>
            </button>
          </div>
        </div>

        {/* Right: 4 Quick Access Feature Cards floating over background */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0">
          {/* Card 1: Low-Emission Routines */}
          <button
            type="button"
            onClick={() => onNavigateTab('routine')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white/92 backdrop-blur-xs hover:bg-white border border-white/80 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[105px] sm:min-w-[115px]"
          >
            <span className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              🍃
            </span>
            <span className="mt-1.5 text-[11px] font-semibold text-slate-800 leading-snug">
              Low-Emission
              <br />
              Routines
            </span>
          </button>

          {/* Card 2: Indoor Air Hacks */}
          <button
            type="button"
            onClick={() => onNavigateTab('iaq')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white/92 backdrop-blur-xs hover:bg-white border border-white/80 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 min-w-[105px] sm:min-w-[115px]"
          >
            <span className="w-9 h-9 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              🏠
            </span>
            <span className="mt-1.5 text-[11px] font-semibold text-slate-800 leading-snug">
              Indoor Air
              <br />
              Hacks
            </span>
          </button>

          {/* Card 3: Sustainable Alternatives */}
          <button
            type="button"
            onClick={() => onNavigateTab('commute')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white/92 backdrop-blur-xs hover:bg-white border border-white/80 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400 min-w-[105px] sm:min-w-[115px]"
          >
            <span className="w-9 h-9 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              ♻️
            </span>
            <span className="mt-1.5 text-[11px] font-semibold text-slate-800 leading-snug">
              Sustainable
              <br />
              Alternatives
            </span>
          </button>

          {/* Card 4: Impact Insights */}
          <button
            type="button"
            onClick={() => onNavigateTab('community')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white/92 backdrop-blur-xs hover:bg-white border border-white/80 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400 min-w-[105px] sm:min-w-[115px]"
          >
            <span className="w-9 h-9 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center text-base group-hover:scale-105 transition-transform">
              📈
            </span>
            <span className="mt-1.5 text-[11px] font-semibold text-slate-800 leading-snug">
              Impact
              <br />
              Insights
            </span>
          </button>
        </div>
      </div>
    </section>
  );
});
