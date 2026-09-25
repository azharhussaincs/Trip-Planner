import React from 'react';

interface StepProgressProps {
  currentStep: 'details' | 'result';
  onStepClick?: (step: 'details') => void;
}

export const TripProgressIndicator: React.FC<StepProgressProps> = ({
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 py-1 text-xs select-none">
      <button
        type="button"
        disabled={currentStep === 'details'}
        onClick={() => onStepClick?.('details')}
        className={`flex items-center gap-1.5 transition-colors ${
          currentStep === 'details'
            ? 'text-slate-900 font-semibold cursor-default'
            : 'text-slate-500 hover:text-slate-800 cursor-pointer'
        }`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-mono ${
            currentStep === 'details'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'bg-emerald-100 text-emerald-700 font-bold'
          }`}
        >
          {currentStep === 'result' ? '✓' : '1'}
        </span>
        <span>Trip Details</span>
      </button>

      <span className="text-slate-300 font-mono" aria-hidden="true">
        →
      </span>

      <div
        className={`flex items-center gap-1.5 transition-colors ${
          currentStep === 'result'
            ? 'text-slate-900 font-semibold'
            : 'text-slate-400'
        }`}
      >
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-mono ${
            currentStep === 'result'
              ? 'bg-slate-900 text-white font-bold shadow-xs'
              : 'bg-slate-100 text-slate-400 font-medium'
          }`}
        >
          2
        </span>
        <span>Your Trip Plan</span>
      </div>
    </div>
  );
};
