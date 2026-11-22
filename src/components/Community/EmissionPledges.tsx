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

    setPledges(prev => {
      const next = [newPledge, ...prev];
      storageService.savePledges(next);
      return next;
    });

    setTitle('');
    setPledgerName('');
  }, [title, pledgerName, category, selectedSectorId, estimatedSavings, participantsCount]);

  return (
    <section
      aria-label="Community Emission Pledges & Collective Smog Defense"
      className="bg-[#161b22] rounded border border-[#30363d] p-3.5 flex flex-col gap-3.5"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#30363d] pb-2.5">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <span aria-hidden="true">🤝</span> Collective Smog Defense & Neighborhood Emission Pledges
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Track micro-action pledges preventing toxic particulate release across urban blocks during winter inversions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#062d1f] text-emerald-400 border border-emerald-800">
            {totalKgPM25Saved} kg PM2.5 Avoided
          </span>
          <span className="px-2.5 py-1 rounded text-xs font-bold bg-[#0c2135] text-sky-400 border border-sky-800">
            {totalParticipants} Pledgers
          </span>
        </div>
      </div>

      {/* New Pledge Form */}
      <form
        aria-label="Register Neighborhood Smog Reduction Pledge"
        onSubmit={handleAddPledge}
        className="bg-[#0d1117] p-3 rounded border border-[#30363d] flex flex-col gap-2.5"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
          + Launch a Neighborhood Smog Defense Pledge
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <div>
            <label htmlFor="pledge-title" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
              Pledge Campaign Name
            </label>
            <input
              id="pledge-title"
              type="text"
              required
              placeholder="e.g., Sector 4 Shared Morning School Van"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium placeholder-slate-600"
            />
          </div>

          <div>
            <label htmlFor="pledger-name" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
              Organizer / RWA Group
            </label>
            <input
              id="pledger-name"
              type="text"
              required
              placeholder="e.g., Green Park Welfare Association"
              value={pledgerName}
              onChange={e => setPledgerName(e.target.value)}
              className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium placeholder-slate-600"
            />
          </div>

          <div>
            <label htmlFor="pledge-category" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
              Mitigation Category
            </label>
            <select
              id="pledge-category"
              value={category}
              onChange={e => setCategory(e.target.value as CommunityPledge['category'])}
              className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-medium"
            >
              <option value="carpool">Carpool Coordination (0.42 kg/commuter)</option>
              <option value="burn-ban">Open-Burn Vigilance (2.8 kg/block)</option>
              <option value="boiler-check">Boiler Efficiency (1.15 kg/unit)</option>
              <option value="green-buffer">Canopy Buffer (0.75 kg/plot)</option>
              <option value="elderly-check">Vulnerable Air Check (0.20 kg)</option>
            </select>
          </div>

          <div>
            <label htmlFor="pledge-count" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
              Participating Neighbors
            </label>
            <input
              id="pledge-count"
              type="number"
              min={1}
              max={500}
              value={participantsCount}
              onChange={e => setParticipantsCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-1 border-t border-[#21262d]">
          <p className="text-xs text-slate-300">
            Projected Impact: <strong className="text-emerald-400 font-bold">{estimatedSavings} kg PM2.5</strong> prevented from ground-level air.
          </p>

          <button
            type="submit"
            className="px-3 py-1.5 rounded text-xs font-semibold bg-[#238636] hover:bg-[#2ea043] text-white border border-[#2ea043] transition-colors"
          >
            Register Collective Pledge
          </button>
        </div>
      </form>

      {/* Pledges Feed */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Active Community Pledges ({pledges.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {pledges.map(pledge => {
            const sector = sectors.find(s => s.sectorId === pledge.sectorId);

            return (
              <div
                key={pledge.id}
                role="article"
                aria-label={`${pledge.title} pledge card`}
                className="bg-[#0d1117] rounded border border-[#30363d] p-3 flex flex-col justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#21262d] text-sky-400 border border-[#30363d] capitalize">
                      {pledge.category.replace('-', ' ')}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-400">
                      ✓ Verified RWA
                    </span>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-xs mt-1">{pledge.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {pledge.pledgerName} • {sector?.sectorName ?? pledge.sectorId}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#21262d] flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">{pledge.participantsCount} households</span>
                  <span className="font-bold text-emerald-400">-{pledge.emissionSavedKgPM25} kg PM2.5</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
