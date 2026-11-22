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
      severity,
      description: description.trim(),
      reportedAt: Date.now(),
      status: 'Reported',
    };

    setIncidents(prev => {
      const next = [newIncident, ...prev];
      storageService.saveIncidents(next);
      return next;
    });

    setDescription('');
  }, [type, severity, description, selectedSectorId]);

  const toggleResidentStatus = useCallback((residentId: string) => {
    setResidents(prev =>
      prev.map(r => {
        if (r.id === residentId) {
          const nextStatus: VulnerableResident['assistanceStatus'] =
            r.assistanceStatus === 'Pending Patrol'
              ? 'Checked-In'
              : r.assistanceStatus === 'Checked-In'
              ? 'Filter Aid Delivered'
              : 'Checked-In';
          return { ...r, assistanceStatus: nextStatus };
        }
        return r;
      })
    );
  }, []);

  return (
    <section
      aria-label="Neighborhood Volunteer Watch & Incident Logger"
      className="bg-[#161b22] rounded border border-[#30363d] p-3.5 flex flex-col gap-3.5"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#30363d] pb-2.5">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <span aria-hidden="true">🚨</span> Volunteer Anti-Burn Patrol & Smoke Incident Desk
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Community-driven rapid response dispatch preventing illegal point-source emissions in inversion pockets.
          </p>
        </div>

        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#2e1d08] text-amber-400 border border-amber-800 shrink-0">
          Civic Rapid Response Active
        </span>
      </div>

      {/* Incident Log Form */}
      <form
        aria-label="Report Illegal Burning or Smog Hotspot"
        onSubmit={handleReport}
        className="bg-[#0d1117] p-3 rounded border border-[#30363d] flex flex-col gap-2.5"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-red-400">
          + Report Unlawful Emission Hotspot
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div>
            <label htmlFor="incident-type" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
              Violation Type
            </label>
            <select
              id="incident-type"
              value={type}
              onChange={e => setType(e.target.value as SmogIncidentReport['type'])}
              className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-red-500 font-medium"
            >
              <option value="open-burning">Open Biomass / Leaf / Trash Burning</option>
              <option value="industrial-flaring">Unfiltered Industrial Flaring</option>
              <option value="heavy-diesel-idling">Heavy Diesel Truck Idling</option>
              <option value="dust-construction">Uncovered Demolition Dust Cloud</option>
            </select>
          </div>

          <div>
            <label htmlFor="incident-severity" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
              Urgency Severity
            </label>
            <select
              id="incident-severity"
              value={severity}
              onChange={e => setSeverity(e.target.value as SmogIncidentReport['severity'])}
              className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-red-500 font-medium"
            >
              <option value="Moderate">Moderate (Localized Smudge)</option>
              <option value="High">High (Neighborhood Plume)</option>
              <option value="Critical">Critical (Immediate Inversion Threat)</option>
            </select>
          </div>

          <div>
            <label htmlFor="incident-desc" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
              Location Landmark & Notes
            </label>
            <input
              id="incident-desc"
              type="text"
              required
              placeholder="e.g., Behind Ward 4 playground alley"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-red-500 font-medium placeholder-slate-600"
            />
          </div>
        </div>

        <div className="flex justify-end pt-1">
          <button
            type="submit"
            className="px-3 py-1.5 rounded text-xs font-semibold bg-[#b91c1c] hover:bg-[#dc2626] text-white border border-[#dc2626] transition-colors"
          >
            Dispatch Neighborhood Patrol
          </button>
        </div>
      </form>

      {/* Incidents Feed */}
      <div className="space-y-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Live Field Incident Log ({incidents.length})
        </h3>

        <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
          {incidents.map(inc => {
            const sec = sectors.find(s => s.sectorId === inc.sectorId);
            const isCritical = inc.severity === 'Critical';

            return (
              <div
                key={inc.id}
                role="article"
                aria-label={`Incident report ${inc.id}`}
                className="bg-[#0d1117] rounded border border-[#30363d] p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-base" aria-hidden="true">
                    {inc.type === 'open-burning' ? '🔥' : inc.type === 'heavy-diesel-idling' ? '🚚' : '🏭'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-100 text-xs">{inc.type.replace('-', ' ').toUpperCase()}</span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                          isCritical
                            ? 'bg-[#3b1216] text-red-400 border-red-800'
                            : 'bg-[#2e1d08] text-amber-400 border-amber-800'
                        }`}
                      >
                        {inc.severity}
                      </span>
                      <span className="text-[11px] text-slate-400">Sector: {sec?.sectorName ?? inc.sectorId}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-0.5">{inc.description}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 self-end sm:self-center">
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${
                      inc.status === 'Resolved'
                        ? 'bg-[#062d1f] text-emerald-400 border border-emerald-800'
                        : inc.status === 'Dispatched'
                        ? 'bg-[#0c2135] text-sky-400 border border-sky-800'
                        : 'bg-[#2e1d08] text-amber-400 border border-amber-800'
                    }`}
                  >
                    ● {inc.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vulnerable Resident Check-In & Filter Aid Directory */}
      <div className="bg-[#0d1117] rounded border border-[#30363d] p-3 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm" aria-hidden="true">🩺</span>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Vulnerable Resident Smog Check-In & Filter Aid Directory
            </h3>
          </div>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#062d1f] text-emerald-400 border border-emerald-800">
            RWA Civic Action Active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          {residents.map(res => (
            <div
              key={res.id}
              className="bg-[#161b22] rounded border border-[#30363d] p-2.5 flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-100 truncate">{res.name}</span>
                  <span className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-[#21262d] text-sky-300 border border-[#30363d]">
                    {res.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{res.notes}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#21262d]">
                <span
                  className={`text-[10px] font-semibold ${
                    res.assistanceStatus === 'Checked-In'
                      ? 'text-emerald-400'
                      : res.assistanceStatus === 'Filter Aid Delivered'
                      ? 'text-sky-400'
                      : 'text-amber-400'
                  }`}
                >
                  ● {res.assistanceStatus}
                </span>

                <button
                  type="button"
                  onClick={() => toggleResidentStatus(res.id)}
                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#21262d] hover:bg-[#30363d] text-slate-200 border border-[#30363d] transition-colors"
                >
                  Update Check-In
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
