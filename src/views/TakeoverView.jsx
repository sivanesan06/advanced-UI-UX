import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  AlertTriangle,
  ShieldAlert,
  UserCheck,
  Clock,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Car,
  LifeBuoy,
  PhoneCall,
  Sparkles,
  Info
} from 'lucide-react';

export default function TakeoverView() {
  const {
    takeoverState,
    startTakeoverDemo,
    acknowledgeTakeover,
    triggerFallbackManeuver,
    resetTakeoverToFSD,
    driveMode,
    vehicleSpeed
  } = useSimulation();

  const [simulatedTrigger, setSimulatedTrigger] = useState('construction');

  const handoverScenarios = [
    {
      id: 'construction',
      label: 'Highway Construction Chicane',
      desc: 'Temporary concrete barricades redirecting traffic without standardized lane line markings.'
    },
    {
      id: 'weather',
      label: 'Sudden Lens & Radar Occlusion',
      desc: 'Extreme blizzard or road mud covering forward optical stereo cameras and radar aperture.'
    },
    {
      id: 'emergency',
      label: 'Unmapped Police Detour',
      desc: 'Law enforcement officer using hand gestures to redirect traffic off the expressway.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono mb-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            SAE LEVEL 3/4 TAKEOVER REQUEST (TOR) & MINIMAL RISK MANEUVER (MRM)
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Smart Human Handover & Fallback Studio
          </h1>
          <p className="text-slate-400 text-sm font-sans mt-1">
            Interactive demonstration of autonomous-to-manual transition protocol with fail-safe automated roadside pulling.
          </p>
        </div>

        {/* Current Autonomy Badge */}
        <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
          <div className={`w-3.5 h-3.5 rounded-full ${driveMode === 'AUTONOMOUS_FSD' ? 'bg-emerald-400' : driveMode === 'TAKEOVER_PENDING' ? 'bg-red-500 animate-ping' : driveMode === 'MINIMAL_RISK_MANEUVER' ? 'bg-amber-400 animate-pulse' : 'bg-cyan-400'}`} />
          <div>
            <span className="text-[10px] font-mono text-slate-400 block uppercase">CURRENT STATE</span>
            <span className="font-bold text-white font-mono text-sm">{driveMode}</span>
          </div>
        </div>
      </div>

      {/* Educational Notice Banner */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed font-sans">
        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold block font-mono">SIMULATION PROCEDURE DISCLAIMER:</strong>
          All takeover timings (10-second window), visual warnings, and Minimal Risk Maneuvers are simulation demonstrations designed for academic evaluation of human-machine interfaces. Not representative of certified OEM functional safety protocols.
        </div>
      </div>

      {/* Main Handover Stage Card */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-all duration-500 shadow-2xl relative overflow-hidden ${
        takeoverState.isActive
          ? 'bg-gradient-to-br from-red-950/60 via-slate-950 to-slate-900 border-red-500/70 shadow-glow-red'
          : takeoverState.completedHandover
          ? 'bg-gradient-to-br from-emerald-950/40 via-slate-950 to-slate-900 border-emerald-500/60 shadow-glow-green'
          : takeoverState.fallbackTriggered
          ? 'bg-gradient-to-br from-amber-950/50 via-slate-950 to-slate-900 border-amber-500/60 shadow-glow-amber'
          : 'bg-[#090f1e]/90 border-slate-800'
      }`}>
        {/* State 1: Active Takeover Request Countdown */}
        {takeoverState.isActive && (
          <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 text-red-300 font-mono text-xs border border-red-500/40 animate-pulse">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>HIGH PRIORITY TAKEOVER REQUEST • PLEASE ASSUME CONTROL</span>
            </div>

            {/* Giant Countdown Clock */}
            <div>
              <div className="text-7xl sm:text-8xl font-display font-extrabold text-red-400 tracking-tight animate-bounce">
                {takeoverState.countdown}s
              </div>
              <p className="text-slate-300 text-sm font-sans mt-2">
                Time remaining before automated Minimal Risk Maneuver (MRM) fallback activates.
              </p>
            </div>

            {/* Rationale explanation */}
            <div className="p-4 rounded-2xl bg-black/40 border border-red-500/30 text-sm text-slate-200 font-sans leading-relaxed">
              <strong className="text-red-400 font-mono block text-xs mb-1">REASON FOR HANDOVER:</strong>
              {takeoverState.reason}
            </div>

            {/* Driver Readiness Checklist */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left text-xs font-mono space-y-2.5">
              <span className="text-slate-400 font-bold block uppercase text-[10px]">Driver Readiness Telemetry:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Cabin Gaze Attentive</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Hands on Wheel: Awaiting</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>Pedal Override Ready</span>
                </div>
              </div>
            </div>

            {/* Handover Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={acknowledgeTakeover}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-base flex items-center gap-3 shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <UserCheck className="w-5 h-5 text-slate-950" />
                <span>Acknowledge & Assume Manual Control</span>
              </button>

              <button
                onClick={triggerFallbackManeuver}
                className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-mono flex items-center gap-2 transition-all"
              >
                <LifeBuoy className="w-4 h-4 text-amber-400" />
                <span>Simulate Driver Unresponsive</span>
              </button>
            </div>
          </div>
        )}

        {/* State 2: Handover Successfully Completed (Manual Mode) */}
        {takeoverState.completedHandover && (
          <div className="space-y-6 text-center max-w-xl mx-auto py-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <UserCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-3xl text-white">Manual Control Confirmed</h2>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                Autonomous steering, acceleration, and braking control have been smoothly handed over to you. Drive attentively.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Drive Mode: MANUAL CONTROL • Driver Monitoring Camera Active</span>
            </div>

            <div className="pt-3">
              <button
                onClick={resetTakeoverToFSD}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 mx-auto transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Re-Engage Autonomous FSD Mode</span>
              </button>
            </div>
          </div>
        )}

        {/* State 3: Minimal Risk Maneuver (MRM) Fallback In Progress */}
        {takeoverState.fallbackTriggered && (
          <div className="space-y-6 text-center max-w-2xl mx-auto py-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs border border-amber-500/40 animate-pulse">
              <LifeBuoy className="w-4 h-4 text-amber-400" />
              <span>DRIVER UNRESPONSIVE • MINIMAL RISK MANEUVER (MRM) ENGAGED</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl text-white">
              Automated Fail-Safe Roadside Stop
            </h2>
            <p className="text-slate-300 text-sm font-sans">
              The driver did not acknowledge control within 10 seconds. The autonomous system is executing a safe minimal-risk stop to protect passengers and surrounding traffic.
            </p>

            {/* Step-by-Step Fallback Progress Tracker */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono text-left pt-2">
              <div className={`p-3 rounded-xl border ${takeoverState.fallbackStage !== 'none' ? 'bg-amber-500/20 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-[10px] block opacity-75">STAGE 1</span>
                <span className="font-bold">Hazards Active</span>
              </div>
              <div className={`p-3 rounded-xl border ${['lane_shift', 'controlled_braking', 'safe_stop'].includes(takeoverState.fallbackStage) ? 'bg-amber-500/20 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-[10px] block opacity-75">STAGE 2</span>
                <span className="font-bold">Merging to Shoulder</span>
              </div>
              <div className={`p-3 rounded-xl border ${['controlled_braking', 'safe_stop'].includes(takeoverState.fallbackStage) ? 'bg-amber-500/20 border-amber-500 text-amber-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-[10px] block opacity-75">STAGE 3</span>
                <span className="font-bold">Controlled Stop</span>
              </div>
              <div className={`p-3 rounded-xl border ${takeoverState.fallbackStage === 'safe_stop' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200' : 'bg-slate-900 border-slate-800 text-slate-500'}`}>
                <span className="text-[10px] block opacity-75">STAGE 4</span>
                <span className="font-bold">eCall Emergency</span>
              </div>
            </div>

            {takeoverState.fallbackStage === 'safe_stop' && (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Vehicle brought to full stop on safe shoulder. Electronic park brake engaged. Emergency beacon dispatched.</span>
              </div>
            )}

            <div className="pt-2">
              <button
                onClick={resetTakeoverToFSD}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 mx-auto transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Simulation to Autonomous Cruising</span>
              </button>
            </div>
          </div>
        )}

        {/* State 0: Idle / Ready to Trigger */}
        {!takeoverState.isActive && !takeoverState.completedHandover && !takeoverState.fallbackTriggered && (
          <div className="space-y-6 text-center max-w-xl mx-auto py-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-3xl text-white">Handover Simulator Ready</h2>
              <p className="text-slate-300 text-sm font-sans leading-relaxed">
                Experience how next-generation autonomous vehicles transition control to human drivers when boundary conditions exceed the Operational Design Domain (ODD).
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => startTakeoverDemo()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-sm flex items-center gap-2.5 mx-auto shadow-lg shadow-red-500/30 transition-all transform hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Trigger Takeover Request (TOR) Demo</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Preset Handover Trigger Scenarios */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-white">Simulated Handover Triggers</h3>
        <p className="text-slate-400 text-xs font-sans">Select a realistic real-world edge case scenario to trigger the handover test.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {handoverScenarios.map((h) => (
            <div
              key={h.id}
              className="p-5 rounded-2xl bg-[#090f1e]/80 border border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                  EDGE CASE #{h.id.toUpperCase()}
                </span>
                <h4 className="font-display font-bold text-white text-base">{h.label}</h4>
                <p className="text-slate-400 text-xs font-sans leading-relaxed">{h.desc}</p>
              </div>

              <button
                onClick={() => startTakeoverDemo(h.desc)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-red-950/50 text-slate-300 hover:text-red-300 border border-slate-700 hover:border-red-500/40 text-xs font-mono font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Test This Trigger</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

