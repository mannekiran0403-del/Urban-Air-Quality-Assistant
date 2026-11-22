// ============================================================
// src/App.tsx
// Thin AppShell Pattern for AirGuard AI
// Per ARCHITECTURE-PATTERNS.md §2.A: Router & layout orchestrator
// Per ACCESSIBILITY.md §1: Semantic landmarks <header>, <nav>, <main>, <footer>
// ============================================================

import { memo } from 'react';

import type { TabId } from '@/types';

import { AppContextProvider, useApp } from '@/context/AppContext';
import { AlertBanner } from '@/components/shared/AlertBanner';
import { SectorInputForm } from '@/components/shared/SectorInputForm';
import { AQIHeatmap } from '@/components/Dashboard/AQIHeatmap';
import { PollutantCards } from '@/components/Dashboard/PollutantCards';
import { AIInsightsPanel } from '@/components/Dashboard/AIInsightsPanel';
import { ExposureNavigator } from '@/components/Navigation/ExposureNavigator';
import { CADRCalculator } from '@/components/IAQ/CADRCalculator';
import { DIYPurifierHacks } from '@/components/IAQ/DIYPurifierHacks';
import { EmissionPledges } from '@/components/Community/EmissionPledges';
import { VolunteerWatch } from '@/components/Community/VolunteerWatch';
import { MultilingualSmogAssistant } from '@/components/Multilingual/MultilingualSmogAssistant';

interface TabDefinition {
  id: TabId;
  label: string;
  icon: string;
}

const TABS: TabDefinition[] = [
  { id: 'telemetry', label: 'Smog Telemetry', icon: '📡' },
  { id: 'routine', label: 'AI Routine Optimizer', icon: '🤖' },
  { id: 'commute', label: 'Transit Navigator', icon: '🧭' },
  { id: 'iaq', label: 'Indoor IAQ & DIY Hacks', icon: '💨' },
  { id: 'community', label: 'Community Defense', icon: '🤝' },
  { id: 'multilingual', label: 'Multilingual Advisories', icon: '🌐' },
];

const AppShell = memo(function AppShell() {
  const { activeTab, setActiveTab, selectedSector, theme, toggleTheme } = useApp();

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-200 flex flex-col antialiased">
      {/* 1. Global Alert Banner Overlay */}
      <AlertBanner />

      {/* 2. Application Header Landmark */}
      <header
        aria-label="Application header"
        className="sticky top-0 z-40 bg-[#161b22] border-b border-[#30363d]"
      >
        <div className="w-full px-4 sm:px-6 py-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-base" aria-hidden="true">
              🍃
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold text-white tracking-tight">
                  Respiro
                </h1>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  ● Telemetry
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700 hidden sm:inline-block">
                  Gemini 3.1 Flash Lite
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Urban Air Quality Assistant & Community Smog Defense Platform
              </p>
            </div>
          </div>

          {/* Micro Telemetry Pill & Theme Toggle */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <div className="bg-[#0d1117] border border-[#30363d] rounded px-2.5 py-1 flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">Sector:</span>
              <strong className="text-white text-xs">{selectedSector.sectorName}</strong>
              <span className="w-1 h-1 rounded-full bg-slate-600" aria-hidden="true" />
              <span className="font-mono text-xs font-bold text-amber-400">AQI {selectedSector.aqi}</span>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="px-2.5 py-1 rounded text-xs font-semibold bg-[#21262d] hover:bg-[#30363d] text-slate-300 border border-[#30363d] transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span className="hidden sm:inline capitalize">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>

        {/* Semantic Accessible Navigation Bar */}
        <nav aria-label="Main panels navigation" className="w-full px-4 sm:px-6 border-t border-[#21262d]">
          <div role="tablist" aria-label="Main application panels" className="flex gap-1 overflow-x-auto py-1">
            {TABS.map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap focus:outline-none focus:ring-1 focus:ring-emerald-500 ${
                    isActive
                      ? 'text-white bg-[#21262d] border border-[#30363d]'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-[#21262d]/50'
                  }`}
                >
                  <span aria-hidden="true">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* 3. Main Content Landmark */}
      <main id="main-content" className="flex-1 w-full px-4 sm:px-6 py-3 flex flex-col gap-3">
        {/* Global Micro-Sector & Persona Control Panel */}
        <SectorInputForm />

        {/* Tab Viewport Panels */}
        {activeTab === 'telemetry' && (
          <div id="panel-telemetry" role="tabpanel" aria-labelledby="tab-telemetry" className="flex flex-col gap-4">
            <AQIHeatmap />
            <PollutantCards />
          </div>
        )}

        {activeTab === 'routine' && (
          <div id="panel-routine" role="tabpanel" aria-labelledby="tab-routine" className="flex flex-col gap-4">
            <AIInsightsPanel />
            <PollutantCards />
          </div>
        )}

        {activeTab === 'commute' && (
          <div id="panel-commute" role="tabpanel" aria-labelledby="tab-commute" className="flex flex-col gap-4">
            <ExposureNavigator />
          </div>
        )}

        {activeTab === 'iaq' && (
          <div id="panel-iaq" role="tabpanel" aria-labelledby="tab-iaq" className="flex flex-col gap-4">
            <CADRCalculator />
            <DIYPurifierHacks />
          </div>
        )}

        {activeTab === 'community' && (
          <div id="panel-community" role="tabpanel" aria-labelledby="tab-community" className="flex flex-col gap-4">
            <EmissionPledges />
            <VolunteerWatch />
          </div>
        )}

        {activeTab === 'multilingual' && (
          <div id="panel-multilingual" role="tabpanel" aria-labelledby="tab-multilingual" className="flex flex-col gap-4">
            <MultilingualSmogAssistant />
          </div>
        )}
      </main>

      {/* 4. Footer Landmark */}
      <footer aria-label="System footer" className="border-t border-[#30363d] bg-[#161b22] py-2.5 px-4 sm:px-6 mt-auto">
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span aria-hidden="true">🛡️</span>
            <span className="font-medium text-slate-300">Respiro</span>
            <span>—</span>
            <span>Urban Smog Defense Platform</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            <span>WCAG 2.2 AA</span>
            <span>•</span>
            <span>Zero-Trust API Gateway</span>
            <span>•</span>
            <span>SHA-256 LRU Cache</span>
          </div>
        </div>
      </footer>
    </div>
  );
});

export default function App() {
  return (
    <AppContextProvider>
      <AppShell />
    </AppContextProvider>
  );
}
