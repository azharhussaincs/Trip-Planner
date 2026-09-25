import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
import { DayPlanItem } from '../services/itineraryService';

interface DayPlanProps {
  day: DayPlanItem;
  totalDays: number;
}

export const DayPlan: React.FC<DayPlanProps> = ({ day, totalDays }) => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all">
      {/* Day header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center justify-center h-7 px-2.5 rounded-lg bg-slate-900 text-white font-mono text-xs font-semibold">
            Day {day.dayNumber}
          </span>
          {day.theme && (
            <span className="text-xs font-medium text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-md">
              {day.theme}
            </span>
          )}
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          Step {day.dayNumber} of {totalDays}
        </span>
      </div>

      {/* Day title & description */}
      <div className="mb-4">
        <h4 className="text-base font-semibold text-slate-900 tracking-tight mb-1.5">
          {day.title}
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {day.description}
        </p>
      </div>

      {/* Activity list */}
      {day.activities && day.activities.length > 0 && (
        <div className="pt-3 border-t border-slate-100">
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Suggested Schedule
          </span>
          <ul className="space-y-2">
            {day.activities.map((activity, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-sky-600 mt-1.5 shrink-0" />
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
