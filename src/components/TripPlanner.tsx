import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  ArrowLeft,
  MapPin,
  Building,
  Home,
  Bed,
  Hotel as HotelIcon,
  HelpCircle,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Counter } from './ui/Counter';
import { TripResult } from './TripResult';
import { TripProgressIndicator } from './TripProgressIndicator';
import {
  AccommodationType,
  TripFormData,
  GeneratedTripPlan,
  generateTripPlan,
} from '../services/itineraryService';

interface TripPlannerProps {
  onBackToIntro: () => void;
}

export type { AccommodationType, TripFormData };

export const TripPlanner: React.FC<TripPlannerProps> = ({ onBackToIntro }) => {
  // Form State - preserved across Edit Trip cycles
  const [formData, setFormData] = useState<TripFormData>({
    origin: '',
    destination: '',
    days: 3,
    travellers: 1,
    accommodation: 'Hotel',
  });

  // Touched state for fields to control inline error display
  const [touched, setTouched] = useState<Record<string, boolean>>({
    origin: false,
    destination: false,
    days: false,
    travellers: false,
    accommodation: false,
  });

  // Short, polished loading state for generation
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // Generated Plan State
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedTripPlan | null>(null);

  // Field change handlers
  const handleTextChange = (field: 'origin' | 'destination', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleAccommodationSelect = (type: AccommodationType) => {
    setFormData((prev) => ({ ...prev, accommodation: type }));
    setTouched((prev) => ({ ...prev, accommodation: true }));
  };

  // Validation Rules
  const errors = {
    origin: !formData.origin.trim()
      ? 'Origin location is required'
      : undefined,
    destination: !formData.destination.trim()
      ? 'Destination location is required'
      : formData.origin.trim().toLowerCase() === formData.destination.trim().toLowerCase()
      ? 'Destination must be different from origin'
      : undefined,
    days:
      formData.days === '' || typeof formData.days !== 'number' || formData.days < 1
        ? 'Number of days must be at least 1'
        : undefined,
    travellers:
      formData.travellers === '' || typeof formData.travellers !== 'number' || formData.travellers < 1
        ? 'Number of travellers must be at least 1'
        : undefined,
    accommodation: !formData.accommodation
      ? 'Please select an accommodation type'
      : undefined,
  };

  const isValid =
    !errors.origin &&
    !errors.destination &&
    !errors.days &&
    !errors.travellers &&
    !errors.accommodation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      origin: true,
      destination: true,
      days: true,
      travellers: true,
      accommodation: true,
    });

    if (isValid && !isGenerating) {
      setIsGenerating(true);
      // Polished, short loading transition as requested
      setTimeout(() => {
        const plan = generateTripPlan(formData);
        setGeneratedPlan(plan);
        setIsGenerating(false);
      }, 650);
    }
  };

  const handleEditTrip = () => {
    // Preserves previously entered information in formData state
    setGeneratedPlan(null);
  };

  const handlePlanAnotherTrip = () => {
    // Resets to clean initial trip form
    setFormData({
      origin: '',
      destination: '',
      days: 3,
      travellers: 1,
      accommodation: 'Hotel',
    });
    setTouched({
      origin: false,
      destination: false,
      days: false,
      travellers: false,
      accommodation: false,
    });
    setGeneratedPlan(null);
  };

  // If a trip plan has been generated and not generating, show TripResult view
  if (generatedPlan && !isGenerating) {
    return (
      <TripResult
        plan={generatedPlan}
        onEditTrip={handleEditTrip}
        onPlanAnotherTrip={handlePlanAnotherTrip}
        onBackToIntro={onBackToIntro}
      />
    );
  }

  const accommodationOptions: {
    id: AccommodationType;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'Hotel', label: 'Hotel', icon: HotelIcon },
    { id: 'Apartment', label: 'Apartment', icon: Home },
    { id: 'Hostel', label: 'Hostel', icon: Bed },
    { id: 'Guest House', label: 'Guest House', icon: Building },
    { id: 'Other', label: 'Other', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-slate-900 selection:text-white">
      {/* Top Bar */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand & Back Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToIntro}
              className="p-1.5 -ml-1 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Return to Developer Overview"
              aria-label="Back to Developer Overview"
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

          {/* Context badges */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
              Assignment 2 — Task 2
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onBackToIntro}
              className="text-xs"
            >
              Developer Group
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full flex flex-col justify-center">
        {/* Simple Progress Indication: Trip Details -> Your Trip Plan */}
        <div className="mb-4 flex justify-center">
          <TripProgressIndicator currentStep="details" />
        </div>

        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200/60 px-2.5 py-0.5 rounded-full mb-2.5">
            <Sparkles className="h-3 w-3" />
            <span>Smart Travel Planning</span>
          </div>
          <h1
            className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 mb-2"
            style={{ textWrap: 'balance' }}
          >
            Plan Your Trip
          </h1>
          <p
            className="text-sm sm:text-base text-slate-600"
            style={{ textWrap: 'balance' }}
          >
            Enter a few details and create a personalized trip plan.
          </p>
        </div>

        {/* Central Trip Details Form / Card */}
        <div className="max-w-2xl mx-auto w-full">
          <Card className="border-slate-200 bg-white shadow-sm overflow-hidden">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                /* Polished Short Loading State */
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="p-10 sm:p-14 text-center flex flex-col items-center justify-center space-y-4"
                >
                  <div className="h-12 w-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shadow-xs">
                    <Compass
                      className="h-6 w-6 animate-spin text-sky-600"
                      style={{ animationDuration: '3s' }}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                      Creating your trip plan...
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm">
                      Synthesizing daily schedule for {formData.destination} from {formData.origin}
                    </p>
                  </div>
                  <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                    <div className="h-full bg-slate-900 rounded-full animate-pulse w-full" />
                  </div>
                </motion.div>
              ) : (
                /* The Interactive Form */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="p-6 sm:p-8 space-y-6">
                      {/* ROW 1 (Desktop): Origin & Destination */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Origin Field */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="origin-input"
                            className="block text-xs font-semibold tracking-wide text-slate-700 uppercase"
                          >
                            Origin
                          </label>
                          <div className="relative rounded-xl shadow-xs">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                              <MapPin className="h-4 w-4" />
                            </div>
                            <input
                              id="origin-input"
                              type="text"
                              value={formData.origin}
                              onChange={(e) => handleTextChange('origin', e.target.value)}
                              onBlur={() => handleBlur('origin')}
                              placeholder="Where are you travelling from?"
                              className={`block w-full rounded-xl border bg-white pl-10 pr-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                                touched.origin && errors.origin
                                  ? 'border-rose-400 focus:ring-rose-500'
                                  : 'border-slate-200 hover:border-slate-300'
                              }`}
                            />
                          </div>
                          {touched.origin && errors.origin && (
                            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 shrink-0" />
                              <span>{errors.origin}</span>
                            </p>
                          )}
                        </div>

                        {/* Destination Field - Visually Prominent */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="destination-input"
                              className="block text-xs font-semibold tracking-wide text-slate-900 uppercase"
                            >
                              Destination
                            </label>
                            <span className="text-[10px] font-medium text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded border border-sky-100">
                              Key Destination
                            </span>
                          </div>
                          <div className="relative rounded-xl shadow-xs">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-sky-600">
                              <MapPin className="h-4 w-4" />
                            </div>
                            <input
                              id="destination-input"
                              type="text"
                              value={formData.destination}
                              onChange={(e) => handleTextChange('destination', e.target.value)}
                              onBlur={() => handleBlur('destination')}
                              placeholder="Where do you want to go?"
                              className={`block w-full rounded-xl border bg-sky-50/20 pl-10 pr-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 placeholder:font-normal transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent ${
                                touched.destination && errors.destination
                                  ? 'border-rose-400 focus:ring-rose-500'
                                  : 'border-sky-300 hover:border-sky-400 focus:border-sky-500'
                              }`}
                            />
                          </div>
                          {touched.destination && errors.destination && (
                            <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 shrink-0" />
                              <span>{errors.destination}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ROW 2 (Desktop): Number of Days & Travellers */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Number of Days */}
                        <div>
                          <Counter
                            id="days-input"
                            label="Number of Days"
                            value={formData.days}
                            min={1}
                            max={60}
                            unit="days"
                            onChange={(val) => {
                              setFormData((prev) => ({ ...prev, days: val }));
                              setTouched((prev) => ({ ...prev, days: true }));
                            }}
                            error={touched.days ? errors.days : undefined}
                            helperText="Trip duration in calendar days"
                          />
                        </div>

                        {/* Number of Travellers */}
                        <div>
                          <Counter
                            id="travellers-input"
                            label="Number of Travellers"
                            value={formData.travellers}
                            min={1}
                            max={20}
                            unit="travellers"
                            onChange={(val) => {
                              setFormData((prev) => ({ ...prev, travellers: val }));
                              setTouched((prev) => ({ ...prev, travellers: true }));
                            }}
                            error={touched.travellers ? errors.travellers : undefined}
                            helperText="Total people joining the journey"
                          />
                        </div>
                      </div>

                      {/* ROW 3: Accommodation Selection */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-semibold tracking-wide text-slate-700 uppercase">
                            Accommodation
                          </label>
                          <span className="text-xs text-slate-500">
                            Preferred stay category
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
                          {accommodationOptions.map((opt) => {
                            const Icon = opt.icon;
                            const isSelected = formData.accommodation === opt.id;
                            const isOther = opt.id === 'Other';
                            return (
                              <button
                                key={opt.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => handleAccommodationSelect(opt.id)}
                                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                                  isOther ? 'col-span-2 sm:col-span-1' : ''
                                } ${
                                  isSelected
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                <Icon
                                  className={`h-4 w-4 mb-1.5 ${
                                    isSelected ? 'text-white' : 'text-slate-500'
                                  }`}
                                />
                                <span className="text-xs font-medium tracking-tight">
                                  {opt.label}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                        {touched.accommodation && errors.accommodation && (
                          <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 shrink-0" />
                            <span>{errors.accommodation}</span>
                          </p>
                        )}
                      </div>

                      {/* ROW 4: Primary Action Button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={!isValid || isGenerating}
                          icon={<ArrowRight className="h-4 w-4" />}
                          iconPosition="right"
                          className="w-full text-base font-semibold shadow-sm hover:shadow transition-all cursor-pointer"
                        >
                          {isGenerating ? 'Creating your trip plan...' : 'Create Trip Plan'}
                        </Button>

                        {!isValid && (
                          <p className="text-center text-xs text-slate-400 mt-2">
                            Please provide valid trip origin, destination, days, travellers, and accommodation to proceed.
                          </p>
                        )}
                      </div>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Trip Planner</span>
            <span aria-hidden="true">·</span>
            <span>Assignment 2 — Task 2 · Subject: Agentic AI</span>
          </div>
          <div>
            <button
              onClick={onBackToIntro}
              className="text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
            >
              Developer Group: Azhar Hussain, Haris Javeed, Usman Kayani
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
