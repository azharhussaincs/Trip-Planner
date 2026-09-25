import React from 'react';
import { motion } from 'motion/react';
import {
  Compass,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Users,
  Building,
  MapPin,
  Edit3,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { Button } from './ui/Button';
import { DayPlan } from './DayPlan';
import { TripProgressIndicator } from './TripProgressIndicator';
import { SourceCodeButton } from './SourceCodeButton';
import { GeneratedTripPlan } from '../services/itineraryService';

interface TripResultProps {
  plan: GeneratedTripPlan | null;
  onEditTrip: () => void;
  onPlanAnotherTrip: () => void;
  onBackToIntro: () => void;
}

export const TripResult: React.FC<TripResultProps> = ({
  plan,
  onEditTrip,
  onPlanAnotherTrip,
  onBackToIntro,
}) => {
  // Graceful empty / error state handling
  if (!plan || !plan.itinerary || plan.itinerary.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-slate-900 selection:text-white">
        <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold text-base tracking-tight text-slate-900">
                Trip Planner
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={onBackToIntro} className="text-xs">
              Developer Group
            </Button>
          </div>
        </header>

        <main className="max-w-xl mx-auto px-4 py-16 flex-1 flex flex-col justify-center text-center">
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-xs">
            <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Trip Plan Unavailable</h2>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              The required trip parameters could not be resolved. Please review the details in the form.
            </p>
            <div className="flex justify-center gap-3">
              <Button variant="primary" onClick={onEditTrip}>
                Return to Form
              </Button>
              <Button variant="outline" onClick={onPlanAnotherTrip}>
                Plan Another Trip
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-slate-900 selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onEditTrip}
              className="p-1.5 -ml-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Return to edit parameters"
              aria-label="Edit Trip"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
                <Compass className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold text-base tracking-tight text-slate-900">
                Trip Planner
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <SourceCodeButton variant="nav" />
            <Button
              variant="outline"
              size="sm"
              onClick={onEditTrip}
              icon={<Edit3 className="h-3.5 w-3.5" />}
              className="text-xs"
            >
              Edit Trip
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onPlanAnotherTrip}
              icon={<RotateCcw className="h-3.5 w-3.5" />}
              className="text-xs text-slate-600 hover:text-slate-900"
            >
              <span className="hidden sm:inline">Plan Another Trip</span>
              <span className="sm:hidden">New Trip</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full">
        {/* Subtle Progress Indication: Trip Details -> Your Trip Plan */}
        <div className="mb-6 flex justify-center">
          <TripProgressIndicator currentStep="result" onStepClick={() => onEditTrip()} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Destination Heading */}
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/60 px-2.5 py-0.5 rounded-full mb-2">
              <Sparkles className="h-3 w-3" />
              <span>Personalized Itinerary</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 break-words">
              Trip to {plan.destination}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Customized travel itinerary from {plan.origin} tailored to your duration and stay preferences.
            </p>
          </div>

          {/* Section 2: Refined Compact Trip Summary Banner with Strongest Visual Emphasis on Destination */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
              {/* Route with Strongest Visual Emphasis on Destination */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  Trip Route
                </span>
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <span className="text-base sm:text-lg font-normal text-slate-300">
                    {plan.origin}
                  </span>
                  <ArrowRight className="h-4 w-4 text-sky-400 shrink-0 self-center" />
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight break-words underline decoration-sky-400 decoration-2 underline-offset-4">
                    {plan.destination}
                  </span>
                </div>
              </div>

              {/* Compact summary badges: Days, Travellers, Accommodation */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-5 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <Calendar className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="font-semibold text-white font-mono">
                    {plan.days} {plan.days === 1 ? 'Day' : 'Days'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <Users className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="font-semibold text-white font-mono">
                    {plan.travellers} {plan.travellers === 1 ? 'Traveller' : 'Travellers'}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <Building className="h-4 w-4 text-sky-400 shrink-0" />
                  <span className="font-semibold text-white">
                    {plan.accommodation}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Preserved Original Trip Information Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Origin
              </span>
              <p className="text-sm font-semibold text-slate-900 truncate" title={plan.origin}>
                {plan.origin}
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Destination
              </span>
              <p className="text-sm font-semibold text-slate-900 truncate" title={plan.destination}>
                {plan.destination}
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Duration & Party
              </span>
              <p className="text-sm font-semibold text-slate-900 font-mono">
                {plan.days}d · {plan.travellers} {plan.travellers === 1 ? 'person' : 'people'}
              </p>
            </div>

            <div className="bg-white border border-slate-200/90 rounded-xl p-3.5 shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                Accommodation
              </span>
              <p className="text-sm font-semibold text-slate-900 truncate" title={plan.accommodation}>
                {plan.accommodation}
              </p>
            </div>
          </div>

          {/* Daily Itinerary Section */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Daily Itinerary ({plan.itinerary.length} {plan.itinerary.length === 1 ? 'Day' : 'Days'})
                </h3>
                <p className="text-xs text-slate-500">
                  Day-by-day structured activities and logistics
                </p>
              </div>
            </div>

            {/* List of DayPlan cards */}
            <div className="space-y-4">
              {plan.itinerary.map((day) => (
                <DayPlan key={day.dayNumber} day={day} totalDays={plan.days} />
              ))}
            </div>
          </div>

          {/* Action buttons at bottom */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                onClick={onEditTrip}
                icon={<Edit3 className="h-4 w-4" />}
                className="w-full sm:w-auto cursor-pointer"
              >
                Edit Trip
              </Button>
              <Button
                variant="outline"
                onClick={onPlanAnotherTrip}
                icon={<RotateCcw className="h-4 w-4" />}
                className="w-full sm:w-auto cursor-pointer"
              >
                Plan Another Trip
              </Button>
            </div>

            <button
              onClick={onBackToIntro}
              className="text-xs text-slate-500 hover:text-slate-800 hover:underline cursor-pointer"
            >
              Developer Group Overview
            </button>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Trip Planner</span>
            <span aria-hidden="true">·</span>
            <span>Generated Plan for {plan.destination}</span>
          </div>
          <div className="flex items-center gap-4">
            <SourceCodeButton variant="minimal" />
            <span>Assignment 1 — Task 2 · Subject: Agentic AI · Instructor: Ms Afia</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
