import { memo, useState } from 'react';
import type { SectorData, TabId } from '@/types';
import { HeroBanner } from './HeroBanner';
import { CurrentAQICard } from './CurrentAQICard';
import { PersonalizedRecommendations } from './PersonalizedRecommendations';
import { AskRespiroChat } from './AskRespiroChat';
import { LowEmissionRoutineTimeline } from './LowEmissionRoutineTimeline';
import { IAQHacksCard } from './IAQHacksCard';
import { EnvironmentalImpactCard } from './EnvironmentalImpactCard';

interface HomeDashboardProps {
  sector: SectorData;
  onNavigateTab: (tab: TabId) => void;
}

export const HomeDashboard = memo(function HomeDashboard({
  sector,
  onNavigateTab,
}: HomeDashboardProps) {
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* 1. Hero Welcome & Quick Feature Actions Banner */}
      <HeroBanner
        onNavigateTab={onNavigateTab}
        onOpenHowItWorks={() => setShowHowItWorks(true)}
      />

      {/* 2. Middle Row: 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <CurrentAQICard
          sector={sector}
          onViewDetails={() => onNavigateTab('telemetry')}
        />
        <PersonalizedRecommendations />
        <AskRespiroChat sector={sector} />
      </div>

      {/* 3. Bottom Row: 3-Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <LowEmissionRoutineTimeline />
        <IAQHacksCard />
        <EnvironmentalImpactCard />
      </div>

      {/* How It Works Modal Dialog */}
      {showHowItWorks && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="how-it-works-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl border border-slate-100 text-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 id="how-it-works-title" className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>🍃</span>
                <span>How Respiro AI Works</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowHowItWorks(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm cursor-pointer"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="p-3 rounded-xl bg-violet-50/60 border border-violet-100">
                <strong className="block text-violet-900 font-semibold mb-0.5">
                  1. Real-Time Atmospheric & Inversion Telemetry
                </strong>
                Respiro tracks ground sensors, satellite PM2.5, and morning thermal inversion boundaries to identify peak hazardous smog stagnation.
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <strong className="block text-emerald-900 font-semibold mb-0.5">
                  2. Gemini GenAI Schedule Optimization
                </strong>
                Our Gemini 3.1 Flash Lite model shifts high-exposure activities to afternoon solar convection windows when particulates disperse.
              </div>

              <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-100">
                <strong className="block text-sky-900 font-semibold mb-0.5">
                  3. Community Clean Living & Collective Pledges
                </strong>
                By choosing low-emission transport, induction cooking, and DIY HEPA air filtration, you reduce respiratory toxicity and track avoided CO₂e emissions.
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHowItWorks(false)}
                className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white text-xs font-semibold cursor-pointer shadow-xs"
              >
                Got it, let's breathe cleaner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});
