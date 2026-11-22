import { memo } from 'react';
import type { TabId } from '@/types';

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
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#ece7ff] via-[#f3f0ff] to-[#e4e9fd] border border-violet-100 p-6 sm:p-7 shadow-xs text-slate-800"
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

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left Column: Headlines & Call to Actions */}
        <div className="flex-1 max-w-xl text-left">
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
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 active:bg-violet-900 text-white text-sm font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 cursor-pointer"
            >
              <span>Get Personalized Plan</span>
              <span aria-hidden="true">→</span>
            </button>

            <button
              type="button"
              onClick={onOpenHowItWorks}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-violet-700 text-sm font-medium border border-violet-200/80 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-violet-400 cursor-pointer"
            >
              <span aria-hidden="true" className="text-violet-600 font-bold">
                ▷
              </span>
              <span>How It Works</span>
            </button>
          </div>
        </div>

        {/* Center: Clean Family Vector Graphic */}
        <div className="flex-shrink-0 flex items-center justify-center my-2 lg:my-0">
          <svg
            viewBox="0 0 280 180"
            className="w-56 sm:w-64 h-auto drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Family enjoying clean urban air illustration"
          >
            <title>Family enjoying clean urban air</title>
            {/* Dome/Halo */}
            <circle cx="140" cy="110" r="85" fill="#f5f3ff" opacity="0.9" />
            <circle cx="140" cy="110" r="75" stroke="#ddd6fe" strokeWidth="2" strokeDasharray="4 4" fill="none" />

            {/* City Silhouette Background */}
            <path
              d="M30 150 L30 120 L50 120 L50 110 L70 110 L70 130 L90 130 L90 115 L110 115 L110 150 Z"
              fill="#c4b5fd"
              opacity="0.35"
            />
            <path
              d="M170 150 L170 118 L190 118 L190 105 L215 105 L215 125 L235 125 L235 150 Z"
              fill="#a5b4fc"
              opacity="0.35"
            />

            {/* Sun / Clear Sky Halo */}
            <circle cx="140" cy="65" r="28" fill="#fef08a" opacity="0.75" />

            {/* Father Figure (Center Right) */}
            <ellipse cx="170" cy="85" rx="16" ry="19" fill="#fed7aa" />
            {/* Hair & Beard */}
            <path d="M152 78 C152 64 186 64 188 78 C188 83 186 92 184 94 C178 97 162 97 156 94 Z" fill="#334155" />
            <ellipse cx="170" cy="85" rx="13" ry="15" fill="#fde68a" />
            <path d="M158 92 C162 102 178 102 182 92 C184 98 178 106 170 106 C162 106 156 98 158 92 Z" fill="#1e293b" />
            {/* Father Coat */}
            <path d="M142 165 C142 118 198 118 198 165 Z" fill="#475569" />
            {/* Father Scarf */}
            <path d="M152 110 C162 120 178 120 188 110 C188 122 152 122 152 110 Z" fill="#64748b" />

            {/* Mother Figure (Center Left) */}
            <ellipse cx="125" cy="95" rx="14" ry="17" fill="#fed7aa" />
            {/* Hair */}
            <path d="M109 90 C109 72 141 72 141 90 C141 114 135 120 135 120 C130 114 120 114 115 120 Z" fill="#1e293b" />
            <ellipse cx="125" cy="95" rx="12" ry="14" fill="#fde68a" />
            {/* Mother Coat & Scarf */}
            <path d="M102 165 C102 125 148 125 148 165 Z" fill="#881337" opacity="0.85" />
            <path d="M112 118 C122 128 138 128 144 118 C144 128 112 128 112 118 Z" fill="#fed7aa" />

            {/* Child Figure (Center) */}
            <ellipse cx="152" cy="120" rx="12" ry="13" fill="#fed7aa" />
            <path d="M140 115 C140 104 164 104 164 115 C164 122 162 125 140 125 Z" fill="#b45309" />
            <path d="M132 170 C132 140 172 140 172 170 Z" fill="#f59e0b" />
            <path d="M140 136 C148 144 156 144 164 136 C164 146 140 146 140 136 Z" fill="#ef4444" />

            {/* Fresh Air Breeze Waves */}
            <path d="M20 70 Q 50 60, 80 70 T 140 70" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
            <path d="M200 60 Q 230 50, 260 60" stroke="#34d399" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </svg>
        </div>

        {/* Right: 4 Quick Access Feature Cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full lg:w-auto">
          {/* Card 1: Low-Emission Routines */}
          <button
            type="button"
            onClick={() => onNavigateTab('routine')}
            className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white/95 hover:bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <span className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
              🍃
            </span>
            <span className="mt-2 text-xs font-semibold text-slate-800 leading-snug">
              Low-Emission
              <br />
              Routines
            </span>
          </button>

          {/* Card 2: Indoor Air Hacks */}
          <button
            type="button"
            onClick={() => onNavigateTab('iaq')}
            className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white/95 hover:bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <span className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
              🏠
            </span>
            <span className="mt-2 text-xs font-semibold text-slate-800 leading-snug">
              Indoor Air
              <br />
              Hacks
            </span>
          </button>

          {/* Card 3: Sustainable Alternatives */}
          <button
            type="button"
            onClick={() => onNavigateTab('commute')}
            className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white/95 hover:bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <span className="w-10 h-10 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
              ♻️
            </span>
            <span className="mt-2 text-xs font-semibold text-slate-800 leading-snug">
              Sustainable
              <br />
              Alternatives
            </span>
          </button>

          {/* Card 4: Impact Insights */}
          <button
            type="button"
            onClick={() => onNavigateTab('community')}
            className="flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-xl bg-white/95 hover:bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all text-center group cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400"
          >
            <span className="w-10 h-10 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center text-lg group-hover:scale-105 transition-transform">
              📈
            </span>
            <span className="mt-2 text-xs font-semibold text-slate-800 leading-snug">
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
