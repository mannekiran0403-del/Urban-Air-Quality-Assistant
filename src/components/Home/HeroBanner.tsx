import { memo } from 'react';
import type { TabId } from '@/types';
import familyHeroImg from '@/assets/respiro-family.png';

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
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ece7ff] via-[#f3f0ff] to-[#e4e9fd] border border-violet-100/80 p-5 sm:p-6 lg:p-7 shadow-xs text-slate-800"
    >
      {/* Background soft ambient glowing circles */}
      <div
        aria-hidden="true"
        className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-violet-200/40 blur-2xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-16 right-36 w-64 h-64 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-5 lg:gap-6">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="flex-1 max-w-xl text-left self-center lg:self-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Breathe Easier with{' '}
            <span className="text-violet-700 bg-clip-text">Respiro AI</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
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
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-violet-700 text-sm font-medium border border-violet-200/80 shadow-2xs transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
            >
              <span aria-hidden="true" className="text-violet-600 font-bold">
                ▷
              </span>
              <span>How It Works</span>
            </button>
          </div>
        </div>

        {/* Center: High-Fidelity Family Illustration matching Target Design Reference */}
        <div className="flex-shrink-0 flex items-end justify-center my-1 lg:my-0 -mb-5 sm:-mb-6 lg:-mb-7">
          <img
            src={familyHeroImg}
            alt="Family enjoying clean urban air with Respiro AI"
            className="w-56 sm:w-64 lg:w-72 max-h-[165px] sm:max-h-[180px] object-contain object-bottom pointer-events-none select-none drop-shadow-sm"
            loading="eager"
          />
        </div>

        {/* Right: 4 Quick Access Feature Cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full lg:w-auto shrink-0 self-center lg:self-center">
          {/* Card 1: Low-Emission Routines */}
          <button
            type="button"
            onClick={() => onNavigateTab('routine')}
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white hover:bg-slate-50/90 border border-slate-100 shadow-2xs hover:shadow-xs transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[100px] sm:min-w-[110px]"
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
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white hover:bg-slate-50/90 border border-slate-100 shadow-2xs hover:shadow-xs transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 min-w-[100px] sm:min-w-[110px]"
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
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white hover:bg-slate-50/90 border border-slate-100 shadow-2xs hover:shadow-xs transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400 min-w-[100px] sm:min-w-[110px]"
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
            className="flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-2xl bg-white hover:bg-slate-50/90 border border-slate-100 shadow-2xs hover:shadow-xs transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400 min-w-[100px] sm:min-w-[110px]"
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
