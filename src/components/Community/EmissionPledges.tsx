// ============================================================
// src/components/Community/EmissionPledges.tsx
// Neighborhood emission pledges & collective smog mitigation tracker
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo, useState, useMemo, useCallback } from 'react';

import type { CommunityPledge } from '@/types';

import { useApp } from '@/context/AppContext';
import { calculatePledgeEmissionSavings } from '@/lib/airCompute';
import { storageService } from '@/services/storageService';

const INITIAL_COMMUNITY_PLEDGES: CommunityPledge[] = [
  {
    id: 'pld-01',
    title: 'North Gate Commuter Carpool Circle',
    category: 'carpool',
    pledgerName: 'Green Belt Residents Association',
    sectorId: 'SEC-02',
    emissionSavedKgPM25: 18.5,
    participantsCount: 44,
    timestamp: Date.now() - 86400000 * 2,
    verified: true,
  },
  {
    id: 'pld-02',
    title: 'Zero Waste & Leaf Burning Ban Enforcement',
    category: 'burn-ban',
    pledgerName: 'Ward 14 Civic Watch',
    sectorId: 'SEC-03',
    emissionSavedKgPM25: 56.0,
    participantsCount: 20,
    timestamp: Date.now() - 86400000 * 4,
    verified: true,
  },
  {
    id: 'pld-03',
    title: 'Apartment Complex Central Boiler Tune-Up',
    category: 'boiler-check',
    pledgerName: 'Riverfront Towers RWA',
    sectorId: 'SEC-05',
    emissionSavedKgPM25: 34.5,
    participantsCount: 30,
    timestamp: Date.now() - 86400000 * 1,
    verified: true,
  },
];

export const EmissionPledges = memo(function EmissionPledges() {
  const { sectors, selectedSectorId } = useApp();
  const [pledges, setPledges] = useState<CommunityPledge[]>(() => {
    const saved = storageService.getPledges();
    return saved.length > 0 ? saved : INITIAL_COMMUNITY_PLEDGES;
  });

  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<CommunityPledge['category']>('carpool');
  const [participantsCount, setParticipantsCount] = useState<number>(10);
  const [pledgerName, setPledgerName] = useState<string>('');

  const estimatedSavings = useMemo(() => {
    return calculatePledgeEmissionSavings(category, Math.max(participantsCount, 1));
  }, [category, participantsCount]);

  const totalKgPM25Saved = useMemo(() => {
    return Number(pledges.reduce((sum, p) => sum + p.emissionSavedKgPM25, 0).toFixed(1));
  }, [pledges]);

  const totalParticipants = useMemo(() => {
    return pledges.reduce((sum, p) => sum + p.participantsCount, 0);
  }, [pledges]);

  const handleAddPledge = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !pledgerName.trim()) return;

    const newPledge: CommunityPledge = {
      id: `pld-${Date.now()}`,
      title: title.trim(),
      category,
      pledgerName: pledgerName.trim(),
      sectorId: selectedSectorId,
      emissionSavedKgPM25: estimatedSavings,
      participantsCount: Math.max(participantsCount, 1),
      timestamp: Date.now(),
      verified: true,
    };

    const next = [newPledge, ...pledges];
    setPledges(next);
    storageService.savePledges(next);
    setTitle('');
    setPledgerName('');
  }, [title, pledgerName, category, selectedSectorId, estimatedSavings, participantsCount, pledges]);

  return (
    <section
      aria-label="Community Emission Pledges and Collective Smog Reductions"
      className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col gap-4 text-slate-800"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🤝</span>
            <span>Neighborhood Emission Pledges & Collective Smog Defense</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Log neighborhood emission-reduction commitments and quantify collective reduction of ground-level toxic smoke.
          </p>
        </div>

        {/* Global Impact Counter */}
        <div className="flex gap-2 shrink-0">
          <div className="bg-emerald-50 rounded-xl border border-emerald-200 px-3 py-1.5 text-right">
            <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">Total PM2.5 Prevented</span>
            <span className="text-sm font-extrabold text-emerald-700">{totalKgPM25Saved} kg</span>
          </div>
          <div className="bg-violet-50 rounded-xl border border-violet-200 px-3 py-1.5 text-right">
            <span className="text-[10px] text-violet-800 font-bold uppercase tracking-wider block">Active Citizens</span>
            <span className="text-sm font-extrabold text-violet-700">{totalParticipants}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Pledge Creation Form */}
        <form
          onSubmit={handleAddPledge}
          className="bg-[#fbfbfe] rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-3 shadow-2xs"
        >
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
            Register Collective Commitment
          </h3>

          <div>
            <label htmlFor="pledge-title-input" className="block text-[11px] font-bold text-slate-600 mb-1">
              Commitment Title
            </label>
            <input
              id="pledge-title-input"
              type="text"
              placeholder="e.g. Shared Morning School Van Pool"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          <div>
            <label htmlFor="pledge-org-input" className="block text-[11px] font-bold text-slate-600 mb-1">
              Pledging Group / Neighborhood RWA
            </label>
            <input
              id="pledge-org-input"
              type="text"
              placeholder="e.g. Green Park Welfare Association"
              value={pledgerName}
              onChange={e => setPledgerName(e.target.value)}
              required
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="pledge-category-select" className="block text-[11px] font-bold text-slate-600 mb-1">
                Category
              </label>
              <select
                id="pledge-category-select"
                value={category}
                onChange={e => setCategory(e.target.value as CommunityPledge['category'])}
                className="w-full bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500"
              >
                <option value="carpool">Carpool Cluster</option>
                <option value="burn-ban">Zero-Burn Watch</option>
                <option value="boiler-check">Boiler Tune-Up</option>
                <option value="green-buffer">Green Planting</option>
                <option value="elderly-check">Vulnerable Care</option>
              </select>
            </div>

            <div>
              <label htmlFor="pledge-participants-input" className="block text-[11px] font-bold text-slate-600 mb-1">
                Participants
              </label>
              <input
                id="pledge-participants-input"
                type="number"
                min={1}
                max={500}
                value={participantsCount}
                onChange={e => setParticipantsCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-mono focus:outline-none focus:ring-1 focus:ring-violet-500"
              />
            </div>
          </div>

          {/* Calibrated Impact Preview */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between">
            <span className="text-[11px] text-emerald-900 font-medium">Estimated PM2.5 Prevented:</span>
            <span className="text-xs font-extrabold text-emerald-700">~{estimatedSavings} kg/mo</span>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            Register Collective Pledge
          </button>
        </form>

        {/* Existing Pledges Feed */}
        <div className="lg:col-span-2 space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
          {pledges.map(p => {
            const sector = sectors.find(s => s.sectorId === p.sectorId);
            return (
              <div
                key={p.id}
                className="bg-[#fbfbfe] hover:bg-white rounded-xl border border-slate-200/80 p-4 transition-all shadow-2xs"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base" aria-hidden="true">🌱</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{p.title}</h4>
                      <p className="text-xs text-slate-500">
                        By <strong className="text-slate-800 font-semibold">{p.pledgerName}</strong> • {sector?.sectorName ?? p.sectorId}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    Verified Action
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs font-mono text-slate-500">
                  <span>{p.participantsCount} households committed</span>
                  <span className="text-emerald-700 font-bold">-{p.emissionSavedKgPM25} kg PM2.5 saved</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
