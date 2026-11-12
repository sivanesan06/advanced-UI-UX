import React from 'react';
import {
  ShieldCheck,
  BrainCircuit,
  Gauge,
  HeartPulse,
  AlertTriangle,
  Play,
  Layers,
  Cpu,
  Eye,
  Sliders,
  CheckCircle2,
  Car
} from 'lucide-react';

export default function WelcomeView({ setActiveTab }) {
  const pillars = [
    {
      icon: BrainCircuit,
      title: 'Explainable AI (XAI)',
      color: 'cyan',
      description: 'Transparent real-time causal reasoning decomposing driving actions into perception, prediction, planning, and safety assurance layers.'
    },
    {
      icon: Eye,
      title: '3D Perception Visualizer',
      color: 'sky',
      description: 'Animated Tesla-inspired digital twin rendering surrounding vehicles, pedestrians, crosswalks, LiDAR scanning fields, and planned trajectories.'
    },
    {
      icon: HeartPulse,
      title: 'Passenger Anxiety Reduction',
      color: 'emerald',
      description: 'Continuous biometric stress monitoring, real-time comfort sentiment scoring, Calm Mode dashboard simplification, and audio reassurance.'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Takeover & Fallback',
      color: 'amber',
      description: 'SAE Level 3/4 Takeover Request (TOR) with 10s countdown, driver readiness verification, and automated Minimal Risk Maneuver (MRM) fallback.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-slate-950 via-[#070e1c] to-[#040813] shadow-2xl">
        {/* Ambient background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            AUTOMOTIVE INTERACTION DESIGN • NEXT-GEN COCKPIT
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-none">
            Trust<span className="text-cyan-400">Drive</span> AI
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 font-sans leading-relaxed">
            Autonomous Vehicle Passenger Trust & Explainable In-Cabin Interface.
            Bridging the psychological gap between human passengers and autonomous artificial intelligence through radical transparency.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm flex items-center gap-2.5 shadow-lg shadow-cyan-500/30 transition-all font-sans transform hover:-translate-y-0.5"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Live Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('takeover')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-medium text-sm flex items-center gap-2 transition-all font-sans"
            >
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Simulate Human Takeover</span>
            </button>
            <button
              onClick={() => setActiveTab('scenarios')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/50 font-medium text-sm flex items-center gap-2 transition-all font-sans"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>Explore Scenarios</span>
            </button>
          </div>

          {/* Safety Disclaimer Callout */}
          <div className="pt-3 border-t border-slate-800/80 text-xs font-mono text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
            <span>Interactive Educational & Research Simulation • Built with React, Tailwind CSS, Framer Motion & Web Audio.</span>
          </div>
        </div>
      </div>

      {/* Why Passenger Trust Matters (Problem & Solution) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-red-500/20 backdrop-blur-sm space-y-3">
          <div className="flex items-center gap-2 text-red-400 font-mono text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            The Autonomous Trust Problem
          </div>
          <h3 className="font-display font-bold text-xl text-white">The "Black-Box" Anxiety Paradox</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            When an autonomous vehicle brakes abruptly or swerves to avoid a hazard that the passenger cannot see, human heart rates spike by up to 45%. Without real-time contextual explanations, passengers experience intense fear, distrust, and motion sickness.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-cyan-500/30 backdrop-blur-sm space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            The TrustDrive Solution
          </div>
          <h3 className="font-display font-bold text-xl text-white">Radical Transparency & Reassurance</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            TrustDrive AI provides instant, conversational causal reasoning ("Slowing down because pedestrian entered crosswalk 14m ahead"). Combined with Calm Mode and seamless handover transitions, it reduces passenger stress by up to 60%.
          </p>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <div>
        <div className="mb-6">
          <h2 className="font-display font-bold text-2xl text-white">Core System Capabilities</h2>
          <p className="text-slate-400 text-sm font-sans">Engineered for realistic next-generation automotive HMI (Human-Machine Interface).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#090f1e]/80 border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3 group"
              >
                <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/30 flex items-center justify-center text-${item.color}-400 group-hover:scale-105 transition-all`}>
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="font-display font-bold text-white text-base">{item.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed font-sans">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sensor Redundancy & Standards Compliance */}
      <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-2xl font-bold font-display text-cyan-400">360°</div>
          <div className="text-slate-400 mt-1">Perception Envelope</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-2xl font-bold font-display text-emerald-400">ASIL-D</div>
          <div className="text-slate-400 mt-1">ISO 26262 Margin</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-2xl font-bold font-display text-sky-400">10s</div>
          <div className="text-slate-400 mt-1">TOR Handover Window</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="text-2xl font-bold font-display text-amber-400">MRM</div>
          <div className="text-slate-400 mt-1">Automated Safe Fallback</div>
        </div>
      </div>
    </div>
  );
}

