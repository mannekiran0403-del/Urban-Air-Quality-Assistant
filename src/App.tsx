// ============================================================
// src/App.tsx
// Respiro AI SaaS Application Shell
// Precise implementation of target reference design:
// - Left navigation sidebar with custom icons & bottom illustration
// - Top header with dynamic location picker, notification center, and user avatar
// - Responsive multi-tier dashboard (Hero, AQI Gauge, Chat, Timeline, Hacks, Impact)
// ============================================================

import { memo, useState } from 'react';
import type { TabId } from '@/types';

import { AppContextProvider, useApp } from '@/context/AppContext';
import { AlertBanner } from '@/components/shared/AlertBanner';
import { SectorInputForm } from '@/components/shared/SectorInputForm';
import { HomeDashboard } from '@/components/Home/HomeDashboard';
import { AQIHeatmap } from '@/components/Dashboard/AQIHeatmap';
import { PollutantCards } from '@/components/Dashboard/PollutantCards';
import { AIInsightsPanel } from '@/components/Dashboard/AIInsightsPanel';
import { ExposureNavigator } from '@/components/Navigation/ExposureNavigator';
import { CADRCalculator } from '@/components/IAQ/CADRCalculator';
import { DIYPurifierHacks } from '@/components/IAQ/DIYPurifierHacks';
import { EmissionPledges } from '@/components/Community/EmissionPledges';
import { VolunteerWatch } from '@/components/Community/VolunteerWatch';
import { MultilingualSmogAssistant } from '@/components/Multilingual/MultilingualSmogAssistant';

interface NavItem {
  id: TabId;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Home',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-slate-500'}`} aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    id: 'telemetry',
    label: 'Air Quality',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-slate-500'}`} aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
  {
    id: 'routine',
    label: 'My Routine',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-slate-500'}`} aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    id: 'iaq',
    label: 'Indoor Air Care',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-slate-500'}`} aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
  {
    id: 'commute',
    label: 'Sustainable Choices',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-slate-500'}`} aria-hidden="true">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    id: 'community',
    label: 'Impact Tracker',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-slate-500'}`} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
  },
  {
    id: 'multilingual',
    label: 'Community',
    icon: (active) => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-4 h-4 ${active ? 'text-violet-700' : 'text-slate-500'}`} aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

const AppShell = memo(function AppShell() {
  const {
    activeTab,
    setActiveTab,
    selectedSector,
    setSelectedSectorId,
    sectors,
    userProfile,
    theme,
    toggleTheme,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLocationMenu, setShowLocationMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f4fb] text-slate-800 flex antialiased selection:bg-violet-600 selection:text-white">
      {/* 1. Left Sidebar Navigation Landmark */}
      <aside
        aria-label="Sidebar navigation"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Logo Brand Header */}
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-100">
              <div
                onClick={() => {
                  setActiveTab('home');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 cursor-pointer select-none"
              >
                {/* Wind / Leaf Wave SVG Icon */}
                <svg
                  viewBox="0 0 40 32"
                  className="w-8 h-8 flex-shrink-0"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M4 14 C12 6, 22 6, 28 14 C32 20, 36 18, 38 16"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6 22 C14 16, 24 16, 30 22 C33 25, 36 24, 38 22"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10 8 C16 4, 22 4, 26 8"
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="flex items-baseline">
                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    Respiro
                  </span>
                  <span className="text-xl font-extrabold text-violet-700 ml-1">
                    AI
                  </span>
                </div>
              </div>

              {/* Close Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close navigation sidebar"
              >
                ✕
              </button>
            </div>

            {/* Navigation Menu Links */}
            <nav aria-label="Main application tabs" className="px-3.5 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400 ${
                      isActive
                        ? 'bg-[#ede9fe] text-violet-800 font-semibold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                    }`}
                  >
                    <span className="flex-shrink-0">{item.icon(isActive)}</span>
                    <span className="tracking-tight">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Sidebar Bottom Illustrated Banner */}
          <div className="p-4 m-3.5 rounded-2xl bg-gradient-to-b from-emerald-50/60 to-teal-50/40 border border-emerald-100/70 text-center select-none">
            {/* Illustrated Trees & City Skyline SVG */}
            <div className="w-full h-16 flex items-end justify-center mb-1">
              <svg viewBox="0 0 160 60" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Background buildings */}
                <rect x="25" y="24" width="14" height="36" fill="#cbd5e1" opacity="0.6" rx="1" />
                <rect x="42" y="16" width="18" height="44" fill="#94a3b8" opacity="0.5" rx="1" />
                <rect x="63" y="22" width="16" height="38" fill="#cbd5e1" opacity="0.6" rx="1" />
                <rect x="82" y="12" width="20" height="48" fill="#64748b" opacity="0.4" rx="1" />
                <rect x="105" y="26" width="16" height="34" fill="#94a3b8" opacity="0.5" rx="1" />
                <rect x="124" y="20" width="14" height="40" fill="#cbd5e1" opacity="0.6" rx="1" />

                {/* Foreground Green Trees */}
                <circle cx="18" cy="38" r="14" fill="#16a34a" />
                <rect x="15" y="38" width="6" height="22" fill="#78350f" rx="1" />
                <circle cx="34" cy="42" r="11" fill="#22c55e" />
                <rect x="32" y="44" width="4" height="16" fill="#78350f" rx="1" />

                <circle cx="140" cy="40" r="12" fill="#15803d" />
                <rect x="138" y="40" width="4.5" height="20" fill="#78350f" rx="1" />

                {/* Ground Grass Curve */}
                <path d="M0 58 Q 80 54 160 58 L160 60 L0 60 Z" fill="#22c55e" opacity="0.8" />
              </svg>
            </div>
            <p className="text-xs font-bold text-slate-800 leading-snug">
              Breathe Cleaner,
              <br />
              <span className="text-emerald-700">Live Healthier 🍃</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile sidebar */}
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-2xs lg:hidden"
        />
      )}

      {/* 2. Main Dashboard Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Global Alert Banner Overlay (Properly positioned inside main container) */}
        <AlertBanner />

        {/* Top Header Bar Landmark */}
        <header
          aria-label="Application top bar"
          className="sticky top-0 z-20 h-16 bg-[#f5f4fb]/90 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between border-b border-slate-200/50"
        >
          {/* Mobile Menu Hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs cursor-pointer focus:outline-none"
              aria-label="Open navigation sidebar"
            >
              ☰
            </button>
            <div className="flex items-baseline">
              <span className="text-lg font-bold text-slate-900">Respiro</span>
              <span className="text-lg font-extrabold text-violet-700 ml-0.5">AI</span>
            </div>
          </div>

          <div className="hidden lg:block">
            {/* Empty spacer to align items right */}
          </div>

          {/* Top Right Header Actions: Location, Notification, Avatar */}
          <div className="flex items-center gap-3">
            {/* Location Selector Pill Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowLocationMenu(!showLocationMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs text-xs font-semibold text-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400"
                aria-expanded={showLocationMenu}
                aria-haspopup="true"
              >
                <span className="text-violet-600" aria-hidden="true">📍</span>
                <span>{selectedSector.sectorName.includes('Central') ? 'New Delhi' : selectedSector.sectorName}</span>
                <span className="text-slate-400 text-[10px]" aria-hidden="true">∨</span>
              </button>

              {/* Location Dropdown Menu */}
              {showLocationMenu && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-100 shadow-xl p-2 z-50 text-slate-800"
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Select Urban Sector
                  </div>
                  {sectors.map((s) => (
                    <button
                      key={s.sectorId}
                      role="menuitem"
                      type="button"
                      onClick={() => {
                        setSelectedSectorId(s.sectorId);
                        setShowLocationMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                        s.sectorId === selectedSector.sectorId
                          ? 'bg-violet-50 text-violet-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="truncate pr-2">{s.sectorName}</span>
                      <span className="font-mono text-[11px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                        AQI {s.aqi}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs flex items-center justify-center text-slate-700 transition-colors relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-400"
                aria-label="View smog alerts and notifications"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {/* Red Alert Indicator Dot */}
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </button>

              {/* Notification Popover */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-slate-100 shadow-xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 font-bold text-slate-800">
                    <span>Active Notifications</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-semibold">1 Critical</span>
                  </div>
                  <div className="mt-2.5 p-2 rounded-xl bg-rose-50/70 border border-rose-100 text-slate-700 leading-snug">
                    <strong className="block text-rose-800 font-semibold mb-0.5">Morning Inversion Warning</strong>
                    Thermal boundary active below 150m until 10:30 AM in {selectedSector.sectorName}.
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <button
              type="button"
              onClick={() => setShowProfileDrawer(!showProfileDrawer)}
              className="w-9 h-9 rounded-full bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-xs flex items-center justify-center cursor-pointer transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-400"
              aria-label={`Profile: ${userProfile.name} (${userProfile.persona})`}
              title={`${userProfile.name} (${userProfile.persona})`}
            >
              A
            </button>

            {/* Subtle Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-9 h-9 rounded-full bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs flex items-center justify-center text-xs transition-colors cursor-pointer text-slate-600"
            >
              <span aria-hidden="true">{theme === 'dark' ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </header>

        {/* Profile & Household Configuration Drawer */}
        {showProfileDrawer && (
          <div className="px-4 sm:px-8 py-3 bg-white border-b border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-bold text-slate-900">
                User Profile & Household Settings
              </h4>
              <button
                type="button"
                onClick={() => setShowProfileDrawer(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close ✕
              </button>
            </div>
            <SectorInputForm />
          </div>
        )}

        {/* 4. Main Body Content Landmark */}
        <main id="main-content" className="flex-1 px-4 sm:px-8 py-5 flex flex-col gap-5">
          {/* Active Tab Viewport */}
          {activeTab === 'home' && (
            <HomeDashboard
              sector={selectedSector}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'telemetry' && (
            <div id="panel-telemetry" role="tabpanel" aria-labelledby="tab-telemetry" className="flex flex-col gap-5">
              <AQIHeatmap />
              <PollutantCards />
            </div>
          )}

          {activeTab === 'routine' && (
            <div id="panel-routine" role="tabpanel" aria-labelledby="tab-routine" className="flex flex-col gap-5">
              <AIInsightsPanel />
              <PollutantCards />
            </div>
          )}

          {activeTab === 'iaq' && (
            <div id="panel-iaq" role="tabpanel" aria-labelledby="tab-iaq" className="flex flex-col gap-5">
              <CADRCalculator />
              <DIYPurifierHacks />
            </div>
          )}

          {activeTab === 'commute' && (
            <div id="panel-commute" role="tabpanel" aria-labelledby="tab-commute" className="flex flex-col gap-5">
              <ExposureNavigator />
            </div>
          )}

          {activeTab === 'community' && (
            <div id="panel-community" role="tabpanel" aria-labelledby="tab-community" className="flex flex-col gap-5">
              <EmissionPledges />
              <VolunteerWatch />
            </div>
          )}

          {activeTab === 'multilingual' && (
            <div id="panel-multilingual" role="tabpanel" aria-labelledby="tab-multilingual" className="flex flex-col gap-5">
              <MultilingualSmogAssistant />
            </div>
          )}
        </main>

        {/* 5. Accessible Footer Landmark */}
        <footer
          aria-label="Application footer"
          className="border-t border-slate-200/60 bg-white/60 py-3 px-4 sm:px-8 mt-auto text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2"
        >
          <div className="flex items-center gap-2">
            <span>🍃</span>
            <span className="font-semibold text-slate-700">Respiro AI</span>
            <span>—</span>
            <span>Urban Air Quality & Smog Defense</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>Powered by Gemini 3.1 Flash Lite</span>
            <span>•</span>
            <span>WCAG 2.2 AA</span>
          </div>
        </footer>
      </div>
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
