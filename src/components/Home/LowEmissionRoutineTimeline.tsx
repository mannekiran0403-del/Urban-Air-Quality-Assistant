import { memo } from 'react';

interface RoutineStep {
  time: string;
  activity: string;
  completed?: boolean;
}

const ROUTINE_STEPS: RoutineStep[] = [
  { time: '8:00 AM', activity: 'Indoor workout / light exercise' },
  { time: '10:00 AM', activity: 'Commute by metro / bus' },
  { time: '1:00 PM', activity: 'Work with fresh indoor air (purifier on)' },
  { time: '5:00 PM', activity: 'Short walk (lower pollution hours)' },
  { time: '8:00 PM', activity: 'Cook with low-emission options' },
];

export const LowEmissionRoutineTimeline = memo(function LowEmissionRoutineTimeline() {
  return (
    <article
      aria-label="Today's Low-Emission Routine"
      className="flex flex-col justify-between rounded-2xl bg-white border border-slate-100 p-5 shadow-xs hover:shadow-md transition-shadow text-slate-800"
    >
      <div>
        {/* Header */}
        <div className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-sm flex-shrink-0"
            aria-hidden="true"
          >
            📅
          </span>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">
            Today's Low-Emission Routine
          </h3>
        </div>

        {/* Step-by-Step Vertical Connected Timeline */}
        <div className="mt-4 relative pl-3 space-y-4">
          {/* Continuous vertical connecting line */}
          <div
            aria-hidden="true"
            className="absolute left-[17px] top-2 bottom-2 w-0.5 bg-violet-100"
          />

          {ROUTINE_STEPS.map((step) => (
            <div key={step.time} className="relative flex items-center gap-3">
              {/* Circular Node Bullet */}
              <div
                aria-hidden="true"
                className="w-2.5 h-2.5 rounded-full bg-white border-2 border-violet-500 z-10 flex-shrink-0 shadow-2xs"
              />

              {/* Time Badge */}
              <span className="w-16 text-xs font-semibold text-slate-900 flex-shrink-0">
                {step.time}
              </span>

              {/* Activity Description */}
              <span className="text-xs font-medium text-slate-600 leading-tight">
                {step.activity}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>Calibrated for today's solar boundary layer</span>
        <span className="text-violet-600 font-semibold cursor-pointer">Edit schedule →</span>
      </div>
    </article>
  );
});
