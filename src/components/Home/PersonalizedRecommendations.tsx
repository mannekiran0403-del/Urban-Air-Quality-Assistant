import { memo, useState } from 'react';

interface RecommendationItem {
  id: string;
  icon: string;
  text: string;
  badge?: {
    type: 'reduction' | 'check';
    text?: string;
  };
  completed?: boolean;
}

const INITIAL_RECOMMENDATIONS: RecommendationItem[] = [
  {
    id: 'rec-1',
    icon: '🚗',
    text: 'Choose public transport or carpool today',
    badge: { type: 'reduction', text: '↓ 4.8 kg CO₂e' },
  },
  {
    id: 'rec-2',
    icon: '🏠',
    text: 'Keep windows closed and use an air purifier',
    badge: { type: 'check' },
  },
  {
    id: 'rec-3',
    icon: '🏃',
    text: 'Shift outdoor activities to after 4 PM',
    badge: { type: 'check' },
  },
  {
    id: 'rec-4',
    icon: '🔥',
    text: 'Use cleaner cooking options (e.g., induction)',
    badge: { type: 'reduction', text: '↓ 1.2 kg CO₂e' },
  },
];

export const PersonalizedRecommendations = memo(function PersonalizedRecommendations() {
  const [items, setItems] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);

  const toggleItem = (id: string) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <article
      aria-label="Your Personalized Recommendations"
      className="flex flex-col justify-between rounded-2xl bg-white border border-slate-100 p-5 shadow-xs hover:shadow-md transition-shadow text-slate-800"
    >
      <div>
        {/* Header & Subtitle */}
        <div className="flex items-center gap-1.5">
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Your Personalized Recommendations
          </h3>
          <span className="text-violet-500 font-bold" aria-hidden="true">
            ✨
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500 font-normal">
          Based on today's air quality, your location, and lifestyle.
        </p>

        {/* Recommendation Item List */}
        <div className="mt-4 flex flex-col gap-2.5">
          {items.map(item => {
            const isCompleted = Boolean(item.completed);
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-slate-50 border-slate-200 opacity-75'
                    : 'bg-[#fbfbfe] hover:bg-white border-slate-100 hover:border-violet-200 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 pr-2">
                  <span
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-sm flex-shrink-0 shadow-2xs"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`text-xs sm:text-[13px] font-medium text-slate-800 leading-snug line-clamp-2 ${
                      isCompleted ? 'line-through text-slate-500' : ''
                    }`}
                  >
                    {item.text}
                  </span>
                </div>

                {/* Right Badge / Status */}
                <div className="flex-shrink-0">
                  {item.badge?.type === 'reduction' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/80 whitespace-nowrap">
                      {item.badge.text}
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-2xs">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Click any recommendation to track progress</span>
        <span className="text-emerald-600 font-semibold">100% Calibrated</span>
      </div>
    </article>
  );
});
