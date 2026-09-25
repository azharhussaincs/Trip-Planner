import React from 'react';
import { Minus, Plus } from 'lucide-react';

export interface CounterProps {
  label?: string;
  helperText?: string;
  error?: string;
  value: number | '';
  min?: number;
  max?: number;
  unit?: string;
  onChange: (value: number | '') => void;
  className?: string;
  id?: string;
}

export const Counter: React.FC<CounterProps> = ({
  label,
  helperText,
  error,
  value,
  min = 1,
  max = 90,
  unit,
  onChange,
  className = '',
  id,
}) => {
  const numericValue = typeof value === 'number' ? value : 0;
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  const handleDecrement = () => {
    if (typeof value !== 'number' || value <= min) {
      onChange(min);
    } else {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (typeof value !== 'number') {
      onChange(min);
    } else if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    if (rawVal === '') {
      onChange('');
      return;
    }
    const parsed = parseInt(rawVal, 10);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-semibold tracking-wide text-slate-700 uppercase"
        >
          {label}
        </label>
      )}
      <div
        className={`flex items-center justify-between rounded-xl border bg-white p-1.5 shadow-xs transition-colors ${
          error
            ? 'border-rose-400 ring-1 ring-rose-400'
            : 'border-slate-200 hover:border-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/20'
        }`}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={typeof value === 'number' && value <= min}
          aria-label={`Decrease ${label || 'value'}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Minus className="h-4 w-4" />
        </button>

        <div className="flex items-center justify-center flex-1 px-2">
          <input
            id={inputId}
            type="number"
            min={min}
            max={max}
            value={value === '' ? '' : value}
            onChange={handleInputChange}
            placeholder={String(min)}
            className="w-16 text-center font-mono text-base font-semibold text-slate-900 bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {unit && (
            <span className="font-sans text-xs text-slate-500 shrink-0 ml-1 select-none">
              {unit}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={typeof value === 'number' && value >= max}
          aria-label={`Increase ${label || 'value'}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:pointer-events-none transition-colors active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      {error && <p className="text-xs text-rose-600 mt-1">{error}</p>}
      {helperText && !error && (
        <p className="text-xs text-slate-500 mt-1">{helperText}</p>
      )}
    </div>
  );
};
