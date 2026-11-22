// ============================================================
// src/components/IAQ/CADRCalculator.tsx
// Room CADR (Clean Air Delivery Rate) and Air Turnaround Calculator
// Per ACCESSIBILITY.md: label htmlFor, fieldset, number inputs
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo, useState, useMemo } from 'react';

import { useApp } from '@/context/AppContext';
import { calculateCADR } from '@/lib/airCompute';

export const CADRCalculator = memo(function CADRCalculator() {
  const { selectedSector } = useApp();
  const [roomName, setRoomName] = useState<string>('Master Bedroom');
  const [lengthFt, setLengthFt] = useState<number>(16);
  const [widthFt, setWidthFt] = useState<number>(14);
  const [heightFt, setHeightFt] = useState<number>(9);
  const [desiredACH, setDesiredACH] = useState<number>(5);
  const [fanCFM, setFanCFM] = useState<number>(1200);
  const [filterMERV, setFilterMERV] = useState<number>(13);

  const cadrResult = useMemo(() => {
    return calculateCADR(
      Math.max(lengthFt, 1),
      Math.max(widthFt, 1),
      Math.max(heightFt, 1),
      Math.max(desiredACH, 1),
      Math.max(fanCFM, 100),
      filterMERV
    );
  }, [lengthFt, widthFt, heightFt, desiredACH, fanCFM, filterMERV]);

  return (
    <section
      aria-label="Room-by-Room CADR and Purification Calculator"
      className="bg-[#161b22] rounded border border-[#30363d] p-3.5 flex flex-col gap-3.5"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#30363d] pb-2.5">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
            <span aria-hidden="true">💨</span> Room-by-Room CADR & Air Turnaround Calculator
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Determine required Clean Air Delivery Rate (CADR) in CFM to scrub particulate smog from living and sleeping quarters.
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#062d1f] text-emerald-400 border border-emerald-800 shrink-0">
          EPA & ASHRAE 62.2 Calibrated
        </span>
      </div>

      {/* Input Dimensions Grid */}
      <form
        aria-label="Room Dimensions and Filter Rating"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 bg-[#0d1117] p-2.5 rounded border border-[#30363d]"
        onSubmit={e => e.preventDefault()}
      >
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="room-name-input" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            Room Label
          </label>
          <input
            id="room-name-input"
            type="text"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
          />
        </div>

        <div>
          <label htmlFor="length-input" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            Length (ft)
          </label>
          <input
            id="length-input"
            type="number"
            min={5}
            max={60}
            value={lengthFt}
            onChange={e => setLengthFt(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <div>
          <label htmlFor="width-input" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            Width (ft)
          </label>
          <input
            id="width-input"
            type="number"
            min={5}
            max={60}
            value={widthFt}
            onChange={e => setWidthFt(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <div>
          <label htmlFor="height-input" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            Ceiling Height (ft)
          </label>
          <input
            id="height-input"
            type="number"
            min={7}
            max={20}
            value={heightFt}
            onChange={e => setHeightFt(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-mono"
          />
        </div>

        <div>
          <label htmlFor="ach-select" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            Target ACH
          </label>
          <select
            id="ach-select"
            value={desiredACH}
            onChange={e => setDesiredACH(parseInt(e.target.value, 10))}
            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value={3}>3 ACH (Moderate)</option>
            <option value={4}>4 ACH (Recommended)</option>
            <option value={5}>5 ACH (Severe Smog)</option>
            <option value={6}>6 ACH (Vulnerable)</option>
          </select>
        </div>

        <div>
          <label htmlFor="fan-select" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            Fan Airflow
          </label>
          <select
            id="fan-select"
            value={fanCFM}
            onChange={e => setFanCFM(parseInt(e.target.value, 10))}
            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value={800}>Low (800 CFM)</option>
            <option value={1200}>Med (1200 CFM)</option>
            <option value={2000}>High (2000 CFM)</option>
            <option value={2400}>CR-Cube (2400 CFM)</option>
          </select>
        </div>

        <div>
          <label htmlFor="merv-select" className="block text-[10px] text-slate-400 font-medium mb-1 uppercase tracking-wider">
            Filter Grade
          </label>
          <select
            id="merv-select"
            value={filterMERV}
            onChange={e => setFilterMERV(parseInt(e.target.value, 10))}
            className="w-full bg-[#161b22] border border-[#30363d] rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-sky-500 font-medium"
          >
            <option value={8}>MERV-8 (Basic Dust)</option>
            <option value={11}>MERV-11 (Smoke)</option>
            <option value={13}>MERV-13 (Smog/PM2.5)</option>
            <option value={17}>True HEPA (H13)</option>
          </select>
        </div>
      </form>

      {/* CADR Results Display */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="bg-[#0d1117] rounded border border-[#30363d] p-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Room Air Volume</p>
          <p className="text-sm sm:text-base font-bold text-slate-100 mt-0.5">{cadrResult.roomVolumeCuFt.toLocaleString()} cu ft</p>
          <p className="text-[10px] text-slate-500 mt-0.5 truncate">{roomName}</p>
        </div>

        <div className="bg-[#0d1117] rounded border border-[#30363d] p-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Required CADR</p>
          <p className="text-sm sm:text-base font-bold text-amber-400 mt-0.5">{cadrResult.targetCADR} CFM</p>
          <p className="text-[10px] text-slate-500 mt-0.5">At {desiredACH} air changes/hr</p>
        </div>

        <div className="bg-[#0d1117] rounded border border-[#30363d] p-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-medium">Delivered Clean Air</p>
          <p className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">{cadrResult.actualCADR} CFM</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{cadrResult.achDelivered} ACH achieved</p>
        </div>

        <div className="bg-[#0d1117] rounded border border-[#30363d] p-2.5">
          <p className="text-[10px] text-slate-400 uppercase font-medium">90% Clearance Time</p>
          <p className="text-sm sm:text-base font-bold text-sky-400 mt-0.5">{cadrResult.cleanAirTurnaroundMinutes} mins</p>
          <p className="text-[10px] text-slate-500 mt-0.5">Rapid turnaround speed</p>
        </div>
      </div>

      {/* Recommendation Banner */}
      <div className="bg-[#0c2135] border border-sky-800 rounded p-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-start gap-2.5">
          <span className="text-xl" aria-hidden="true">💡</span>
          <div>
            <h3 className="text-xs font-semibold text-slate-100 uppercase tracking-wider">
              Optimal DIY Build For {roomName}
            </h3>
            <p className="text-xs text-sky-200 mt-0.5">{cadrResult.diyBoxFanRecommendation}</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#161b22] text-sky-300 border border-[#30363d] shrink-0">
          Status: {cadrResult.status}
        </span>
      </div>

      {/* Dynamic Window-Ventilation Schedule */}
      <div className="bg-[#0d1117] rounded border border-[#30363d] p-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-sm" aria-hidden="true">🪟</span>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">
              Dynamic Window-Ventilation Schedule ({selectedSector.sectorName})
            </h3>
          </div>
          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#161b22] text-slate-300 border border-[#30363d]">
            Current Outdoor AQI: {selectedSector.aqi}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
          <div className="bg-[#241215] border border-red-900/60 rounded p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-red-400">06:00 - 10:30</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#3b1216] text-red-300 border border-red-800">🛑 SEALED</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Morning thermal inversion cap traps night-time smoke and vehicle emissions below 150m. Keep all windows tightly sealed.
            </p>
          </div>

          <div className="bg-[#06241a] border border-emerald-900/60 rounded p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-emerald-400">11:30 - 14:00</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#062d1f] text-emerald-300 border border-emerald-800">✅ 15-MIN FLUSH</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Solar heating lifts boundary layer. Safe for 15-minute cross-ventilation to purge indoor CO2 and cooking moisture.
            </p>
          </div>

          <div className="bg-[#241a0d] border border-amber-900/60 rounded p-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-amber-400">17:00 - 22:00</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#2e1d08] text-amber-300 border border-amber-800">🛑 SEALED</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-snug">
              Evening temperature inversion descent concentrates rush-hour traffic soot at breathing level. Turn on indoor DIY purifiers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
