// ============================================================
// src/components/Community/VolunteerWatch.tsx
// Anti-open-burning vigilance watch & vulnerable resident check-ins
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo, useState, useCallback } from 'react';

import type { SmogIncidentReport } from '@/types';

import { useApp } from '@/context/AppContext';
import { storageService } from '@/services/storageService';

interface VulnerableResident {
  id: string;
  name: string;
  category: 'Asthmatic Child' | 'Elderly Senior Alone' | 'Infant Toddler Home';
  sectorId: string;
  assistanceStatus: 'Checked-In' | 'Filter Aid Delivered' | 'Pending Patrol';
  notes: string;
}

const INITIAL_VULNERABLE_RESIDENTS: VulnerableResident[] = [
  {
    id: 'res-01',
    name: 'Apt 4B — Reyansh & Family',
    category: 'Asthmatic Child',
    sectorId: 'SEC-01',
    assistanceStatus: 'Checked-In',
    notes: 'Rescue inhalers verified accessible; bedroom Corsi-Rosenthal fan operating.',
  },
  {
    id: 'res-02',
    name: 'Block C-12 — Mrs. Sharma (Age 78)',
    category: 'Elderly Senior Alone',
    sectorId: 'SEC-02',
    assistanceStatus: 'Filter Aid Delivered',
    notes: 'MERV-13 box fan delivered by neighborhood RWA volunteer patrol.',
  },
  {
    id: 'res-03',
    name: 'Sector 3 East — Patel Infant Home',
    category: 'Infant Toddler Home',
    sectorId: 'SEC-03',
    assistanceStatus: 'Pending Patrol',
    notes: 'Window weatherstripping assistance requested for nursery room.',
  },
];

const INITIAL_INCIDENTS: SmogIncidentReport[] = [
  {
    id: 'inc-01',
    sectorId: 'SEC-03',
    type: 'open-burning',
    description: 'Leaf and plastic burning detected behind vacant industrial warehouse lot.',
    severity: 'Critical',
    reportedAt: Date.now() - 3600000 * 2,
    status: 'Dispatched',
  },
  {
    id: 'inc-02',
    sectorId: 'SEC-01',
    type: 'heavy-diesel-idling',
    description: 'Multiple delivery freight trucks idling continuously in underground loading bay.',
    severity: 'High',
    reportedAt: Date.now() - 3600000 * 5,
    status: 'Resolved',
  },
];

export const VolunteerWatch = memo(function VolunteerWatch() {
  const { sectors, selectedSectorId } = useApp();
  const [incidents, setIncidents] = useState<SmogIncidentReport[]>(() => {
    const saved = storageService.getIncidents();
    return saved.length > 0 ? saved : INITIAL_INCIDENTS;
  });

  const [residents, setResidents] = useState<VulnerableResident[]>(INITIAL_VULNERABLE_RESIDENTS);

  const [type, setType] = useState<SmogIncidentReport['type']>('open-burning');
  const [severity, setSeverity] = useState<SmogIncidentReport['severity']>('High');
  const [description, setDescription] = useState<string>('');

  const handleReport = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newIncident: SmogIncidentReport = {
      id: `inc-${Date.now()}`,
      sectorId: selectedSectorId,
      type,
      description: description.trim(),
      severity,
      reportedAt: Date.now(),
      status: 'Dispatched',
    };

    const next = [newIncident, ...incidents];
    setIncidents(next);
    storageService.saveIncidents(next);
    setDescription('');
  }, [description, selectedSectorId, type, severity, incidents]);

  const toggleResidentCheckin = useCallback((resId: string) => {
    setResidents(prev =>
      prev.map(r =>
        r.id === resId
          ? {
            ...r,
            assistanceStatus:
              r.assistanceStatus === 'Checked-In' ? 'Pending Patrol' : 'Checked-In',
          }
          : r
      )
    );
  }, []);

  return (
    <section
      aria-label="Citizen Vigilance & Vulnerable Resident Support"
      className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col gap-4 text-slate-800"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🛡️</span>
            <span>Volunteer Anti-Burn Patrol & Vulnerable Check-Ins</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Empower neighborhood volunteers to detect illegal toxic combustion hotspots and deliver clean-air assistance to high-risk residents.
          </p>
        </div>

        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 shrink-0">
          Grassroots Smog Defense
        </span>
      </div>

      {/* Incident Reporting Form */}
      <form
        onSubmit={handleReport}
        className="bg-[#fbfbfe] rounded-2xl border border-slate-200/80 p-4 sm:p-5 flex flex-col gap-3 shadow-2xs"
      >
        <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700">
          + Report Unlawful Emission Hotspot
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label htmlFor="incident-type" className="block text-[11px] font-bold text-slate-600 mb-1">
              Violation Type
            </label>
            <select
              id="incident-type"
              value={type}
              onChange={e => setType(e.target.value as SmogIncidentReport['type'])}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 font-medium"
            >
              <option value="open-burning">Open Biomass / Leaf / Trash Burning</option>
              <option value="industrial-flaring">Unfiltered Industrial Flaring</option>
              <option value="heavy-diesel-idling">Heavy Diesel Truck Idling</option>
              <option value="dust-construction">Uncovered Demolition Dust Cloud</option>
            </select>
          </div>

          <div>
            <label htmlFor="incident-severity" className="block text-[11px] font-bold text-slate-600 mb-1">
              Urgency Severity
            </label>
            <select
              id="incident-severity"
              value={severity}
              onChange={e => setSeverity(e.target.value as SmogIncidentReport['severity'])}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 font-medium"
            >
              <option value="Moderate">Moderate (Localized Smudge)</option>
              <option value="High">High (Neighborhood Plume)</option>
              <option value="Critical">Critical (Immediate Inversion Threat)</option>
            </select>
          </div>

          <div>
            <label htmlFor="incident-desc" className="block text-[11px] font-bold text-slate-600 mb-1">
              Location Landmark & Notes
            </label>
            <input
              id="incident-desc"
              type="text"
              required
              placeholder="e.g., Behind Ward 4 playground alley"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-rose-500 font-medium placeholder-slate-400"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition-all shadow-2xs cursor-pointer"
          >
            Dispatch Neighborhood Patrol
          </button>
        </div>
      </form>

      {/* Incidents Feed */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Live Field Incident Log ({incidents.length})
        </h3>

        <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          {incidents.map(inc => {
            const sec = sectors.find(s => s.sectorId === inc.sectorId);
            const isCritical = inc.severity === 'Critical';

            return (
              <div
                key={inc.id}
                role="article"
                aria-label={`Incident report ${inc.id}`}
                className="bg-[#fbfbfe] hover:bg-white rounded-xl border border-slate-200/80 p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-2xs" aria-hidden="true">
                    {inc.type === 'open-burning' ? '🔥' : inc.type === 'heavy-diesel-idling' ? '🚚' : '🏭'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-xs">{inc.type.replace('-', ' ').toUpperCase()}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isCritical
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-xs text-slate-500">Sector: {sec?.sectorName ?? inc.sectorId}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">{inc.description}</p>
                  </div>
                </div>

                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-200 shrink-0">
                  {inc.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vulnerable Resident Patrol Support Grid */}
      <div className="space-y-2.5 pt-2 border-t border-slate-100">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
          Vulnerable Resident Welfare Care Patrol
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {residents.map(r => {
            const isChecked = r.assistanceStatus === 'Checked-In';
            return (
              <div
                key={r.id}
                className="bg-[#fbfbfe] hover:bg-white rounded-xl border border-slate-200/80 p-3.5 flex flex-col justify-between gap-2.5 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-slate-900 text-xs">{r.name}</h4>
                    <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200">
                      {r.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{r.notes}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleResidentCheckin(r.id)}
                  className={`w-full py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${isChecked
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                >
                  {isChecked ? '✓ Checked-In Today' : 'Mark Visited & Assisted'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
