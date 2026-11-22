// ============================================================
// src/components/IAQ/DIYPurifierHacks.tsx
// Low-Cost DIY Purifiers, Box Fan Blueprints & Indoor Hacks
// Per EFFICIENCY.md §2: React.memo
// ============================================================

import { memo, useState } from 'react';

import type { DIYHack } from '@/types';

export const DIY_HACKS_DATA: DIYHack[] = [
  {
    id: 'hack-cr-cube',
    title: 'Corsi-Rosenthal Box (4-Filter Cube)',
    category: 'purifier',
    difficulty: 'Moderate',
    estimatedCostUSD: 65,
    commercialAlternativeCostUSD: 380,
    pm25ReductionPercent: 88,
    materialsNeeded: [
      '1x 20-inch standard box fan (3-speed)',
      '4x 20x20x2 inch MERV-13 furnace filters',
      '1x roll of standard duct tape / packing tape',
      'Cardboard bottom shroud (cut from fan box)',
    ],
    steps: [
      'Tape 4 MERV-13 filters into a square cube with airflow arrows pointing inward.',
      'Cut a square cardboard base to seal the bottom of the cube airtight.',
      'Place 20" box fan on top blowing UPWARD, out of the cube.',
      'Cut a circular 15" diameter cardboard shroud and tape to the fan face to eliminate corner backpressure.',
      'Seal all seams with duct tape. Run on Medium speed in central room.',
    ],
    scientificMechanism:
      'Spreading airflow across 4 filters decreases face velocity to ~50 ft/min, dramatically lowering static backpressure and delivering over 450 CFM CADR equivalent to hospital-grade HEPA.',
  },
  {
    id: 'hack-single-fan',
    title: 'Budget 1-Filter Box Fan Purifier',
    category: 'purifier',
    difficulty: 'Easy',
    estimatedCostUSD: 28,
    commercialAlternativeCostUSD: 160,
    pm25ReductionPercent: 72,
    materialsNeeded: [
      '1x 20-inch box fan ($20)',
      '1x 20x20x1 or 20x20x2 MERV-13 filter ($8)',
      'Bungee cord or painter’s tape',
    ],
    steps: [
      'Identify back (intake) side of the box fan.',
      'Place MERV-13 filter flush against back grill, arrow pointing into fan.',
      'Fasten securely with bungee cord or tape along four perimeter edges.',
      'Place against bedroom wall facing room center.',
    ],
    scientificMechanism:
      'Captures fine particulate matter (PM2.5) on first pass through electrostatic and mechanical fiber interception. Ideal for bedrooms up to 250 sq ft.',
  },
  {
    id: 'hack-ventilation-timing',
    title: 'Positive-Pressure Solar Window Flushing',
    category: 'ventilation',
    difficulty: 'Easy',
    estimatedCostUSD: 0,
    commercialAlternativeCostUSD: 500,
    pm25ReductionPercent: 55,
    materialsNeeded: [
      'Existing operable windows',
      'Respiro solar window schedule (12:00 PM - 2:30 PM)',
    ],
    steps: [
      'Never open windows during morning dawn or evening dusk inversions.',
      'Open windows for strictly 15 minutes during solar peak (12:30 PM - 1:00 PM) when ground heating disperses smog.',
      'Run box fan blowing inward through MERV filter to create positive pressure.',
      'Seal windows tightly as sun descends below 20 degrees elevation.',
    ],
    scientificMechanism:
      'Solar thermal convection raises the urban atmospheric boundary layer from 100m to 1000m, reducing ambient particulate density by 50-70% compared to morning smog.',
  },
  {
    id: 'hack-humidity-mucus',
    title: '45% Relative Humidity Mucociliary Barrier',
    category: 'humidity',
    difficulty: 'Easy',
    estimatedCostUSD: 15,
    commercialAlternativeCostUSD: 120,
    pm25ReductionPercent: 40,
    materialsNeeded: [
      'Shallow ceramic water bowls near radiators or evaporative humidifier',
      'Simple hygrometer ($5)',
    ],
    steps: [
      'Monitor indoor relative humidity; aim for 40% to 50%.',
      'Position ceramic water dishes on safe heating radiators to gently humidify ambient air.',
      'Avoid ultrasonic humidifiers using unfiltered tap water which releases fine mineral dust.',
    ],
    scientificMechanism:
      'Relative humidity between 40-50% preserves nasal and bronchial mucus hydration, enabling epithelial cilia to trap and clear inhaled PM2.5 before reaching deep pulmonary alveoli.',
  },
  {
    id: 'hack-sealing-tape',
    title: 'Draft-Seal Magnetic Window Film',
    category: 'sealing',
    difficulty: 'Easy',
    estimatedCostUSD: 18,
    commercialAlternativeCostUSD: 240,
    pm25ReductionPercent: 60,
    materialsNeeded: [
      'Magnetic self-adhesive weather stripping tape',
      'Clear shrink-wrap window insulator film',
    ],
    steps: [
      'Clean window perimeters with rubbing alcohol.',
      'Apply magnetic weatherstripping tape along window frame perimeter.',
      'Cut film with 1-inch overlap and snap magnetic counter-strip into place.',
      'Use hairdryer on low heat to shrink film taut and eliminate micro-leaks.',
    ],
    scientificMechanism:
      'Cuts particulate air exchange infiltration rate (ACH_natural) from 1.2/hr to under 0.3/hr, insulating the interior from cold ground-level winter smog plumes.',
  },
];

export const DIYPurifierHacks = memo(function DIYPurifierHacks() {
  const [selectedHackId, setSelectedHackId] = useState<string>('hack-cr-cube');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredHacks = activeCategory === 'all'
    ? DIY_HACKS_DATA
    : DIY_HACKS_DATA.filter(h => h.category === activeCategory);

  const selectedHack = DIY_HACKS_DATA.find(h => h.id === selectedHackId) ?? DIY_HACKS_DATA[0];

  return (
    <section
      aria-label="Indoor Air Quality & Low-Cost DIY Smog Hacks"
      className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6 shadow-xs flex flex-col gap-4 text-slate-800"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>🛠️</span>
            <span>Low-Cost IAQ Hacks & DIY Purifier Blueprints</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Affordable, peer-reviewed engineering hacks to achieve commercial-grade clean air at 10-20% of retail price.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
          {['all', 'purifier', 'ventilation', 'humidity', 'plants'].map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-bold capitalize transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-violet-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Hack List Column */}
        <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
          {filteredHacks.map(hack => {
            const isSelected = hack.id === selectedHackId;
            const savings = hack.commercialAlternativeCostUSD - hack.estimatedCostUSD;

            return (
              <button
                key={hack.id}
                type="button"
                onClick={() => setSelectedHackId(hack.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-violet-50/50 border-violet-400 ring-1 ring-violet-300 shadow-2xs'
                    : 'bg-[#fbfbfe] hover:bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-slate-900 text-xs sm:text-[13px] truncate">{hack.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    -{hack.pm25ReductionPercent}% PM2.5
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 mt-2 font-mono">
                  <span>Cost: <strong className="text-slate-900">${hack.estimatedCostUSD}</strong></span>
                  <span className="text-emerald-700 font-bold">Save ${savings}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Blueprint Detail Column */}
        <div className="lg:col-span-2 bg-[#fbfbfe] rounded-2xl border border-slate-200/80 p-5 flex flex-col gap-4 max-h-[480px] overflow-y-auto shadow-2xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase text-violet-700 tracking-wider">
                Category: {selectedHack.category.toUpperCase()} • Difficulty: {selectedHack.difficulty}
              </span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">{selectedHack.title}</h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total DIY Investment</span>
              <p className="text-lg font-extrabold text-emerald-700">${selectedHack.estimatedCostUSD}</p>
            </div>
          </div>

          {/* Materials List */}
          <div>
            <h4 className="text-[11px] font-bold text-violet-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span aria-hidden="true">📦</span> Required Materials & Hardware
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {selectedHack.materialsNeeded.map((mat, i) => (
                <li key={i} className="flex items-center gap-2 bg-white p-2 rounded-lg border border-slate-200/80 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                  <span className="truncate">{mat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Step-by-Step Instructions */}
          <div>
            <h4 className="text-[11px] font-bold text-violet-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span aria-hidden="true">📋</span> Step-by-Step Assembly Instructions
            </h4>
            <ol className="space-y-2 text-xs text-slate-700 list-decimal list-inside bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs leading-relaxed">
              {selectedHack.steps.map((step, i) => (
                <li key={i}>
                  <span className="text-slate-800 font-medium">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Scientific Mechanism Callout */}
          <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5 shadow-2xs">
            <h4 className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
              <span aria-hidden="true">🔬</span> Atmospheric & Aerodynamic Mechanism
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {selectedHack.scientificMechanism}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
