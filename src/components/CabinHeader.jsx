import React, { useState, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  Shield,
  Gauge,
  BrainCircuit,
  HeartPulse,
  AlertTriangle,
  Sliders,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Sparkles,
  BatteryCharging,
  Wifi,
  Navigation,
  Info,
  Car
} from 'lucide-react';

export default function CabinHeader({ activeTab, setActiveTab, onOpenDriveMate }) {
  const {
    scenarioData,
    calmMode,
    toggleCalmMode,
    soundEnabled,
    toggleSound,
    voiceEnabled,
    toggleVoice,
    driveMode,
    trustScore
  } = useSimulation();

  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: 'welcome', label: 'Overview', icon: Car },
    { id: 'dashboard', label: 'Cockpit Dashboard', icon: Gauge },
    { id: 'xai', label: 'AI Decision Center', icon: BrainCircuit },
    { id: 'trust', label: 'Passenger Trust', icon: HeartPulse },
    { id: 'takeover', label: 'Takeover Studio', icon: AlertTriangle, highlight: driveMode === 'TAKEOVER_PENDING' },
    { id: 'scenarios', label: 'Scenario Lab', icon: Sliders },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#070b14]/90 backdrop-blur-xl">
      {/* Top micro banner: simulation disclaimer */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-cyan-950/60 border-b border-cyan-500/10 px-4 py-1 flex items-center justify-between text-[11px] font-mono text-cyan-400/80">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-semibold tracking-wider">TRUSTDRIVE AI SYSTEM</span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">NEXT-GEN IN-CABIN PASSENGER TRUST PLATFORM</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30 text-[10px]">
            EDUCATIONAL SIMULATION ONLY • NOT CERTIFIED REAL VEHICLE CONTROLLER
          </span>
        </div>
      </div>

      {/* Main navigation & vehicle controls bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand / Logo */}
        <div
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <Shield className="w-5 h-5 text-slate-950" />
            <div className="absolute inset-0 rounded-xl border border-cyan-300/40" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-lg text-white tracking-wider">TRUST<span className="text-cyan-400">DRIVE</span></span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">AI</span>
            </div>
            <p className="text-[10px] font-mono text-slate-400">Autonomous Passenger Confidence</p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium font-sans flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : item.highlight
                    ? 'text-red-400 bg-red-950/40 border border-red-500/40 animate-pulse'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : ''}`} />
                <span>{item.label}</span>
                {item.highlight && (
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping absolute -top-1 -right-1" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Cockpit Indicators & Comfort Toggles */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Calm Mode Quick Toggle */}
          <button
            onClick={toggleCalmMode}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border ${
              calmMode
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-glow-green'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
            title="Calm Mode simplifies dashboard graphics to reduce passenger anxiety"
          >
            <Sparkles className={`w-3.5 h-3.5 ${calmMode ? 'text-emerald-400' : ''}`} />
            <span className="hidden lg:inline">{calmMode ? 'Calm: ON' : 'Calm Mode'}</span>
          </button>

          {/* Audio Chime Mute */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-slate-900/80 text-cyan-400 border-cyan-500/30'
                : 'bg-slate-900/80 text-slate-500 border-slate-800'
            }`}
            title={soundEnabled ? 'Mute Cockpit Chimes' : 'Enable Cockpit Chimes'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Voice Assistant Toggle */}
          <button
            onClick={toggleVoice}
            className={`p-1.5 rounded-lg border transition-all ${
              voiceEnabled
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-slate-900/80 text-slate-500 border-slate-800'
            }`}
            title={voiceEnabled ? 'Voice Explanations: Active' : 'Enable Voice Explanations'}
          >
            {voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
          </button>

          {/* Battery Status */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-200">{scenarioData.battery}%</span>
            <span className="text-[10px] text-slate-400">({scenarioData.batteryRangeKm} km)</span>
          </div>

          {/* Cabin Temperature */}
          <div className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
            <span>{scenarioData.cabinTemp}°C</span>
          </div>

          {/* Digital Clock */}
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-cyan-300 font-bold tracking-wider">
            {time}
          </div>

          {/* DriveMate AI Avatar Quick Trigger */}
          <button
            onClick={onOpenDriveMate}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 transition-all font-sans"
            title="Open DriveMate AI Assistant"
          >
            <BrainCircuit className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">DriveMate AI</span>
          </button>
        </div>
      </div>

      {/* Mobile navigation tab strip */}
      <div className="flex md:hidden overflow-x-auto px-3 py-2 border-t border-slate-800/80 gap-1.5 no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-md text-xs font-mono whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 bg-slate-900/60 border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
}

