import React from 'react';
import { motion } from 'motion/react';
import { Compass, ArrowRight, Sparkles, Layers, Cpu, Database } from 'lucide-react';
import { Button } from './ui/Button';
import { SourceCodeButton } from './SourceCodeButton';

interface IntroScreenProps {
  onPlanTrip: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onPlanTrip }) => {
  const teamMembers = [
    {
      role: 'AI Systems & Architecture',
      name: 'Azhar Hussain',
      id: 'MSAI (72908)',
      icon: Cpu,
      focus: 'Multi-agent reasoning pipelines & prompt orchestration',
    },
    {
      role: 'Platform Engineering & State',
      name: 'Haris Javeed',
      id: 'MSAI (75722)',
      icon: Layers,
      focus: 'Distributed application state, caching & client architecture',
    },
    {
      role: 'Research & Advanced Analytics',
      name: 'Usman Kayani',
      id: 'PhD (6678)',
      icon: Database,
      focus: 'Itinerary optimization graphs & spatial heuristics',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-slate-900 selection:text-white">
      {/* Top Bar Contract: 3 zones */}
      <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-xs">
              <Compass className="h-4 w-4" />
            </div>
            <span className="font-semibold text-base tracking-tight text-slate-900">
              Trip Planner
            </span>
          </div>

          {/* Zone 2: Navigation / Context */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
            <span>Smart Travel Planning</span>
            <span aria-hidden="true">·</span>
            <span>Platform Engineering</span>
          </div>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2">
            <SourceCodeButton variant="nav" />
            <Button
              variant="outline"
              size="sm"
              onClick={onPlanTrip}
              className="text-xs"
            >
              Start Trip Planner
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Natural kicker */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-600"></span>
            <span>Platform Engineering</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>Smart Travel Planning</span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 mb-4"
            style={{ textWrap: 'balance' }}
          >
            Trip Planner
          </h1>

          <p className="text-xl sm:text-2xl font-medium text-slate-600 mb-6">
            Smart Travel Planning
          </p>

          <p
            className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed mb-8"
            style={{ textWrap: 'balance' }}
          >
            An intelligent architectural framework engineered to synthesize multi-day travel plans,
            transit logistics, and accommodation parameters with structured precision.
          </p>

          {/* Primary Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={onPlanTrip}
              icon={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              iconPosition="right"
              className="w-full sm:w-auto shadow-md hover:shadow-lg transition-all font-semibold"
            >
              Start Trip Planner
            </Button>
            <SourceCodeButton variant="hero" className="w-full sm:w-auto" />
            <Button
              variant="outline"
              size="lg"
              onClick={onPlanTrip}
              className="w-full sm:w-auto text-slate-700"
            >
              Plan My Trip
            </Button>
          </div>
        </motion.div>

        {/* Developer Group Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full mb-16"
        >
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                Developer Group
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Core engineering and systems architecture team
              </p>
            </div>
            <div className="text-xs font-mono tabular-nums text-slate-400">
              3 Engineers
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {teamMembers.map((member) => {
              const Icon = member.icon;
              return (
                <div
                  key={member.name}
                  className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-mono text-xs font-medium text-slate-500 bg-slate-50 border border-slate-200/60 rounded-md px-2 py-0.5">
                        {member.id}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-sky-700 tracking-wide mb-1">
                      {member.role}
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 tracking-tight mb-2">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed border-t border-slate-100 pt-3 mt-4">
                    {member.focus}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Academic Affiliation / Secondary Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-slate-100/70 border border-slate-200/80 rounded-2xl p-5 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-semibold text-slate-800">Assignment 1 — Task 2</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Subject: <strong className="font-medium text-slate-800">Agentic AI</strong></span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>Instructor: <strong className="font-medium text-slate-800">Ms Afia</strong></span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 text-slate-500">
              <span className="font-medium text-slate-700">Riphah International University</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>G-7, Islamabad</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Trip Planner</span>
            <span aria-hidden="true">·</span>
            <span>Smart Travel Planning</span>
          </div>
          <div className="flex items-center gap-4">
            <SourceCodeButton variant="minimal" />
            <span>Platform Engineering &copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
