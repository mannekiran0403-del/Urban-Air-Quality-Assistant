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
            viewBox="0 0 240 180"
            className="w-48 sm:w-56 h-auto drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Family enjoying clean urban air illustration"
          >
            <title>Family enjoying clean urban air</title>
            <defs>
              <linearGradient id="skyGlow" x1="120" y1="20" x2="120" y2="160" gradientUnits="userSpaceOnUse">
                <stop stopColor="#f3f0ff" stopOpacity="0.9" />
                <stop stopColor="#ede9fe" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="warmSun" x1="120" y1="30" x2="120" y2="90" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fef08a" stopOpacity="0.8" />
                <stop stopColor="#fde047" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Backdrop Dome */}
            <circle cx="120" cy="100" r="75" fill="url(#skyGlow)" />
            <circle cx="120" cy="100" r="68" stroke="#ddd6fe" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            <circle cx="120" cy="65" r="26" fill="url(#warmSun)" />

            {/* City Silhouette Background */}
            <path
              d="M50 140 L50 115 L66 115 L66 105 L82 105 L82 120 L98 120 L98 140 Z"
              fill="#c4b5fd"
              opacity="0.3"
            />
            <path
              d="M142 140 L142 110 L158 110 L158 100 L176 100 L176 118 L190 118 L190 140 Z"
              fill="#a5b4fc"
              opacity="0.3"
            />

            {/* Father (Right side) */}
            <g id="father">
              {/* Shoulders / Coat */}
              <path d="M136 175 C136 130 186 130 186 175 Z" fill="#334155" />
              <path d="M146 122 C154 130 168 130 176 122 C176 132 146 132 146 122 Z" fill="#64748b" />
              {/* Head & Neck */}
              <ellipse cx="160" cy="92" rx="14" ry="17" fill="#fed7aa" />
              {/* Hair & Trim Beard */}
              <path d="M146 88 C146 72 174 72 174 88 C174 94 172 102 170 104 C166 107 152 107 148 104 Z" fill="#1e293b" />
              <ellipse cx="161" cy="92" rx="11" ry="13" fill="#fde68a" opacity="0.9" />
              <path d="M152 97 C156 104 166 104 170 97 C171 103 167 108 161 108 C155 108 151 103 152 97 Z" fill="#1e293b" />
              {/* Eye looking upward & smile */}
              <circle cx="158" cy="90" r="1.5" fill="#0f172a" />
              <path d="M157 96 Q 161 98 165 96" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Mother (Left side) */}
            <g id="mother">
              {/* Coat & Scarf */}
              <path d="M92 175 C92 135 138 135 138 175 Z" fill="#9f1239" opacity="0.9" />
              <path d="M104 126 C112 134 124 134 130 126 C130 134 104 134 104 126 Z" fill="#fbcfe8" />
              {/* Hair Back */}
              <ellipse cx="115" cy="100" rx="16" ry="19" fill="#1e293b" />
              {/* Face */}
              <ellipse cx="117" cy="102" rx="12" ry="14" fill="#fed7aa" />
              {/* Hair Front Side */}
              <path d="M103 98 C103 82 129 82 129 98 C129 116 123 122 123 122 C118 116 112 116 107 122 Z" fill="#1e293b" />
              {/* Eye & Smile */}
              <circle cx="119" cy="100" r="1.5" fill="#0f172a" />
              <path d="M117 106 Q 120 108 123 106" stroke="#0f172a" strokeWidth="1" strokeLinecap="round" />
            </g>

            {/* Child (Front center looking up) */}
            <g id="child">
              {/* Yellow Puffer Jacket */}
              <path d="M116 175 C116 145 152 145 152 175 Z" fill="#f59e0b" />
              <path d="M124 140 C130 146 138 146 144 140 C144 146 124 146 124 140 Z" fill="#ef4444" />
              {/* Face */}
              <ellipse cx="134" cy="126" rx="10" ry="11" fill="#fed7aa" />
              {/* Hair */}
              <path d="M124 122 C124 112 144 112 144 122 C144 126 142 128 124 128 Z" fill="#78350f" />
              {/* Eyes & Big Smile */}
              <circle cx="132" cy="125" r="1.2" fill="#0f172a" />
              <circle cx="137" cy="125" r="1.2" fill="#0f172a" />
              <path d="M132 130 Q 135 133 138 130" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
            </g>

            {/* Clean air breeze swirls */}
            <path d="M15 65 Q 40 55, 65 65 T 115 65" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
            <path d="M170 55 Q 195 48, 225 55" stroke="#34d399" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
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
