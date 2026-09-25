/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { TripPlanner } from './components/TripPlanner';

export default function App() {
  const [currentView, setCurrentView] = useState<'intro' | 'planner'>('intro');

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900">
      {currentView === 'intro' ? (
        <IntroScreen onPlanTrip={() => setCurrentView('planner')} />
      ) : (
        <TripPlanner onBackToIntro={() => setCurrentView('intro')} />
      )}
    </div>
  );
}

