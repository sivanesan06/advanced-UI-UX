import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import PerceptionVisualizer from '../components/PerceptionVisualizer';
import {
  ShieldCheck,
  AlertTriangle,
  BrainCircuit,
  Navigation,
  Compass,
  Zap,
  Battery,
  CloudRain,
  Sun,
  Moon,
  Clock,
  Heart,
  Activity,
  ArrowRight,
  Sparkles,
  UserCheck,
  HelpCircle,
  Eye,
  Sliders
} from 'lucide-react';

export default function DashboardView({ onOpenDriveMate, setActiveTab }) {
  const {
    scenarioData,
    vehicleSpeed,
    targetSpeed,
    driveMode,
    gear,
    trustScore,
    biometrics,
    submitPassengerFeedback,
    passengerFeedback,
    calmMode,
    toggleCalmMode,
    switchScenario,
    currentScenarioKey
  } = useSimulation();

  const scenariosList = [
    { key: 'highway', label: '1. Highway Cruise' },
    { key: 'traffic', label: '2. Stop & Go' },
    { key: 'pedestrian', label: '3. Pedestrian Cross' },
    { key: 'obstacle', label: '4. Sudden Obstacle' },
    { key: 'rain', label: '5. Heavy Rain' },
    { key: 'emergency', label: '6. Ambulance Yield' },
    { key: 'takeover', label: '7. Takeover Request' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 py-4 space-y-4">
      {/* Top Quick Scenario Preset Bar for immediate testing */}
      <div className="bg-slate-900/80 backdrop-blur-md rounded-xl p-2 border border-slate-800 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 pl-2">
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] font-mono text-slate-300 font-semibold whitespace-nowrap">ACTIVE SCENARIO:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {scenariosList.map((sc) => (
            <button
              key={sc.key}
              onClick={() => switchScenario(sc.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all ${
                currentScenarioKey === sc.key
                  ? 'bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-cyan-300 border border-cyan-400/50 shadow-sm shadow-cyan-500/30 font-bold'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {sc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left Telemetry, Center Visualizer, Right Navigation & XAI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Speedometer, Gear, Autopilot State, Battery (3 cols) */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          {/* Speedometer Card */}
          <div className="p-5 rounded-2xl bg-[#090f1e]/90 border border-slate-800/90 shadow-xl space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                DIGITAL CLUSTER
              </span>
              <div className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold border border-slate-700">
                LIMIT {scenarioData.speedLimit}
              </div>
            </div>

            {/* Speed Display */}
            <div className="text-center py-2 relative">
              <div className="text-6xl sm:text-7xl font-display font-extrabold text-white tracking-tight">
                {Math.round(vehicleSpeed)}
              </div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mt-1">
                KM / H
              </div>

              {/* Target Speed Pill */}
              <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-800/80 text-[11px] font-mono text-slate-300 border border-slate-700">
                <span>TARGET:</span>
                <span className="font-bold text-cyan-300">{scenarioData.targetSpeed} km/h</span>
              </div>
            </div>

            {/* PRND Gear Selector */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-center font-mono text-xs">
              {['P', 'R', 'N', 'D'].map((g) => (
                <div
                  key={g}
                  className={`py-1 rounded-lg font-bold transition-all ${
                    gear === g
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-500'
                  }`}
                >
                  {g}
                </div>
              ))}
            </div>

            {/* Driving Mode Status */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                <span>DRIVE AUTONOMY</span>
                <span className="text-cyan-400 font-semibold">SAE LEVEL 4</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${driveMode === 'AUTONOMOUS_FSD' ? 'bg-emerald-400 animate-pulse' : driveMode === 'TAKEOVER_PENDING' ? 'bg-red-500 animate-ping' : 'bg-cyan-400'}`} />
                <div className="text-xs">
                  <div className="font-semibold text-white">
                    {driveMode === 'AUTONOMOUS_FSD' ? 'Autonomous FSD' : driveMode === 'TAKEOVER_PENDING' ? 'Takeover Required' : driveMode === 'MINIMAL_RISK_MANEUVER' ? 'Minimal Risk Stop' : 'Manual Control'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {driveMode === 'AUTONOMOUS_FSD' ? 'AI Steering & Throttle Locked' : 'Driver Monitoring Engaged'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Energy & Range Card */}
          <div className="p-4 rounded-2xl bg-[#090f1e]/90 border border-slate-800/90 shadow-xl space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Battery className="w-4 h-4 text-emerald-400" />
                BATTERY SOC
              </span>
              <span className="text-emerald-400 font-bold">{scenarioData.battery}%</span>
            </div>
            {/* Battery bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${scenarioData.battery}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>Estimated Range</span>
              <span className="text-white font-bold">{scenarioData.batteryRangeKm} km</span>
            </div>
          </div>

          {/* Passenger Biometric Quick Monitor */}
          <div className="p-4 rounded-2xl bg-[#090f1e]/90 border border-slate-800/90 shadow-xl space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-300">
                <Activity className="w-4 h-4 text-cyan-400" />
                PASSENGER PULSE
              </span>
              <span className="text-slate-300 font-bold">{biometrics.heartRate} BPM</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Stress Level:</span>
              <span className={`font-bold ${biometrics.stressLevel > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {biometrics.stressLevel}% ({biometrics.stressLevel > 50 ? 'Elevated' : 'Relaxed'})
              </span>
            </div>
          </div>
        </div>

        {/* Center Column: 2.5D Animated Visualizer (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <PerceptionVisualizer />

          {/* Causal AI Explanation Banner right below the visualizer */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900/90 via-[#0a1526]/90 to-slate-900/90 border border-cyan-500/30 shadow-xl flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-cyan-400 mt-0.5">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30">
                    EXPLAINABLE AI • {scenarioData.xai.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                    Confidence: {scenarioData.xai.confidenceScore}%
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('xai')}
                  className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-all"
                >
                  Deep XAI <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <p className="text-sm font-sans text-slate-100 font-medium leading-snug">
                "{scenarioData.xai.primaryExplanation}"
              </p>
              <div className="text-[11px] font-mono text-slate-400 pt-0.5">
                Layer: <span className="text-slate-300">{scenarioData.xai.layers.safety}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Navigation Card & Passenger Confidence Center (3 cols) */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          {/* Navigation Route Card */}
          <div className="p-4 rounded-2xl bg-[#090f1e]/90 border border-slate-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Navigation className="w-4 h-4 fill-cyan-400" />
                TRIP GUIDANCE
              </span>
              <span className="text-emerald-400 font-bold">ON TIME</span>
            </div>

            {/* Next Maneuver */}
            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-lg">
                ↱
              </div>
              <div>
                <div className="text-xs font-bold text-white">In 450 meters</div>
                <div className="text-[11px] text-slate-400">Exit 34B toward Silicon Expressway</div>
              </div>
            </div>

            {/* Destination & ETA */}
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Destination:</span>
                <span className="text-slate-200 font-semibold truncate max-w-[140px]">Tech Innovation Hub</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Remaining:</span>
                <span className="text-cyan-300 font-bold">14.2 km • 12 min</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Traffic Flow:</span>
                <span className="text-emerald-400">Light / Steady</span>
              </div>
            </div>
          </div>

          {/* Passenger Trust & Comfort Panel with Interactive Buttons */}
          <div className="p-4 rounded-2xl bg-[#090f1e]/90 border border-slate-800/90 shadow-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                TRUST INDEX
              </span>
              <span className="text-emerald-400 font-extrabold text-sm">{trustScore}/100</span>
            </div>

            {/* Trust Meter Progress */}
            <div className="w-full h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${trustScore}%` }}
              />
            </div>

            {/* Dynamic Reassurance Text */}
            <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed font-sans">
              <span className="text-cyan-400 font-semibold block text-[10px] uppercase font-mono mb-0.5">
                AI Reassurance:
              </span>
              {scenarioData.passengerStatus}
            </div>

            {/* Passenger Feedback Buttons */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Passenger Interaction:
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => submitPassengerFeedback('safe')}
                  className={`p-2 rounded-xl text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all border ${
                    passengerFeedback === 'safe'
                      ? 'bg-emerald-500/30 text-emerald-300 border-emerald-500 shadow-glow-green'
                      : 'bg-slate-900/80 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border-slate-800 hover:border-emerald-500/40'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>I Feel Safe</span>
                </button>

                <button
                  onClick={() => submitPassengerFeedback('uncomfortable')}
                  className={`p-2 rounded-xl text-xs font-sans font-medium flex items-center justify-center gap-1.5 transition-all border ${
                    passengerFeedback === 'uncomfortable'
                      ? 'bg-amber-500/30 text-amber-300 border-amber-500 shadow-glow-amber'
                      : 'bg-slate-900/80 hover:bg-amber-950/40 text-slate-300 hover:text-amber-300 border-slate-800 hover:border-amber-500/40'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Uncomfortable</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => submitPassengerFeedback('explain')}
                  className="p-2 rounded-xl text-xs font-sans font-medium bg-slate-900/80 hover:bg-cyan-950/40 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Explain Decision</span>
                </button>

                <button
                  onClick={() => submitPassengerFeedback('request_takeover')}
                  className="p-2 rounded-xl text-xs font-sans font-medium bg-slate-900/80 hover:bg-red-950/40 text-slate-300 hover:text-red-300 border border-slate-800 hover:border-red-500/40 flex items-center justify-center gap-1.5 transition-all"
                >
                  <UserCheck className="w-3.5 h-3.5 text-red-400" />
                  <span>Request Control</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick trigger for DriveMate chat */}
          <button
            onClick={onOpenDriveMate}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-cyan-950/80 via-blue-950/80 to-slate-900/80 border border-cyan-500/40 hover:border-cyan-400 text-slate-200 hover:text-white flex items-center justify-between text-xs font-mono transition-all group"
          >
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Ask DriveMate a Question...</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

