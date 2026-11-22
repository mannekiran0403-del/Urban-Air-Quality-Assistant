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
  const fanCFM = 1200;
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
      className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col gap-4 text-slate-800"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>💨</span>
            <span>Room-by-Room CADR & Air Turnaround Calculator</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Determine required Clean Air Delivery Rate (CADR) in CFM to scrub particulate smog from living and sleeping quarters.
          </p>
        </div>
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
          EPA & ASHRAE 62.2 Calibrated
        </span>
      </div>

      {/* Input Dimensions Grid */}
      <form
        aria-label="Room Dimensions and Filter Rating"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 bg-[#fbfbfe] p-4 rounded-xl border border-slate-200/80 shadow-2xs"
        onSubmit={e => e.preventDefault()}
      >
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor="room-name-input" className="block text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
            Room Label
          </label>
          <input
            id="room-name-input"
            type="text"
            value={roomName}
            onChange={e => setRoomName(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-medium"
          />
        </div>

        <div>
          <label htmlFor="length-input" className="block text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
            Length (ft)
          </label>
          <input
            id="length-input"
            type="number"
            min={5}
            max={60}
            value={lengthFt}
            onChange={e => setLengthFt(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono"
          />
        </div>

        <div>
          <label htmlFor="width-input" className="block text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
            Width (ft)
          </label>
          <input
            id="width-input"
            type="number"
            min={5}
            max={60}
            value={widthFt}
            onChange={e => setWidthFt(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono"
          />
        </div>

        <div>
          <label htmlFor="height-input" className="block text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
            Ceiling Height (ft)
          </label>
          <input
            id="height-input"
            type="number"
            min={7}
            max={20}
            value={heightFt}
            onChange={e => setHeightFt(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono"
          />
        </div>

        <div>
          <label htmlFor="ach-input" className="block text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
            Target ACH
          </label>
          <input
            id="ach-input"
            type="number"
            min={2}
            max={12}
            value={desiredACH}
            onChange={e => setDesiredACH(Math.max(1, parseInt(e.target.value, 10) || 1))}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-mono"
          />
        </div>

        <div>
          <label htmlFor="merv-select" className="block text-[10px] text-slate-500 font-bold mb-1 uppercase tracking-wider">
            Filter Efficiency
          </label>
          <select
            id="merv-select"
            value={filterMERV}
            onChange={e => setFilterMERV(parseInt(e.target.value, 10))}
            className="w-full bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-violet-500 font-medium"
          >
            <option value={11}>MERV 11 (65%)</option>
            <option value={13}>MERV 13 (85%)</option>
            <option value={14}>MERV 14 (90%)</option>
            <option value={17}>True HEPA (99.97%)</option>
          </select>
        </div>
      </form>

      {/* Primary CADR Calculation Readout Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#fbfbfe] rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Room Air Volume</p>
          <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 font-mono">
            {cadrResult.roomVolumeCuFt.toLocaleString()} cu ft
          </p>
        </div>

        <div className="bg-[#fbfbfe] rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Required CADR</p>
          <p className="text-sm sm:text-base font-extrabold text-violet-700 mt-1 font-mono">
            {cadrResult.targetCADR} CFM
          </p>
        </div>

        <div className="bg-[#fbfbfe] rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Actual Delivered CADR</p>
          <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-1 font-mono">
            {cadrResult.actualCADR} CFM
          </p>
        </div>

        <div className="bg-emerald-50/70 rounded-xl border border-emerald-100 p-3.5 shadow-2xs">
          <p className="text-[10px] text-emerald-800 uppercase font-bold tracking-wider">Turnaround Time</p>
          <p className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1 font-mono">
            ~{cadrResult.cleanAirTurnaroundMinutes} mins
          </p>
        </div>
      </div>

      {/* Recommendation Directives */}
      <div className="p-4 rounded-xl bg-violet-50/50 border border-violet-100 text-xs text-slate-700 leading-relaxed shadow-2xs">
        <strong className="block text-violet-900 font-bold mb-1">
          Corsi-Rosenthal Engineering Assessment:
        </strong>
        {cadrResult.diyBoxFanRecommendation} In current ambient AQI ({selectedSector.aqi}), keep purifier running continuously with doors and draft-windows sealed.
      </div>
    </section>
  );
});
