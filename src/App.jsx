import React, { useState } from 'react';
import { SimulationProvider } from './context/SimulationContext';
import CabinHeader from './components/CabinHeader';
import DriveMateModal from './components/DriveMateModal';

// Views
import WelcomeView from './views/WelcomeView';
import DashboardView from './views/DashboardView';
import AIDecisionCenterView from './views/AIDecisionCenterView';
import TrustCenterView from './views/TrustCenterView';
import TakeoverView from './views/TakeoverView';
import ScenarioControlView from './views/ScenarioControlView';

import { Bot, Sparkles, Shield, AlertTriangle } from 'lucide-react';

function CockpitApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDriveMateOpen, setIsDriveMateOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Cockpit Top Header */}
      <CabinHeader
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDriveMate={() => setIsDriveMateOpen(true)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1 pb-16">
        {activeTab === 'welcome' && <WelcomeView setActiveTab={setActiveTab} />}
        {activeTab === 'dashboard' && (
          <DashboardView
            onOpenDriveMate={() => setIsDriveMateOpen(true)}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'xai' && <AIDecisionCenterView />}
        {activeTab === 'trust' && (
          <TrustCenterView onOpenDriveMate={() => setIsDriveMateOpen(true)} />
        )}
        {activeTab === 'takeover' && <TakeoverView />}
        {activeTab === 'scenarios' && (
          <ScenarioControlView setActiveTab={setActiveTab} />
        )}
      </main>

      {/* Floating DriveMate AI Companion Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsDriveMateOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all transform hover:-translate-y-1 font-sans"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-950/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold leading-tight">DriveMate AI</span>
            <span className="block text-[10px] font-mono opacity-80 font-normal">Ask why car is braking</span>
          </div>
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
        </button>
      </div>

      {/* DriveMate Conversational Modal */}
      <DriveMateModal
        isOpen={isDriveMateOpen}
        onClose={() => setIsDriveMateOpen(false)}
      />

      {/* Bottom In-Cabin Status & Academic Disclaimer Footer */}
      <footer className="border-t border-slate-900 bg-[#04070e] py-4 px-4 text-center font-mono text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-cyan-500" />
            <span className="text-slate-400">TrustDrive AI In-Cabin HMI System • College Project & Technical Showcase</span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <span>React • Tailwind • Framer Motion • Web Audio XAI</span>
            <span>|</span>
            <span className="text-cyan-400 font-semibold">SAE Level 4 Simulation</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <SimulationProvider>
      <CockpitApp />
    </SimulationProvider>
  );
}

