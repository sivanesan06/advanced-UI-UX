import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SCENARIOS } from '../data/mockData';
import {
  Sliders,
  Play,
  CloudRain,
  Sun,
  Moon,
  CloudFog,
  ShieldAlert,
  Zap,
  Activity,
  Car,
  AlertTriangle,
  Code2,
  CheckCircle2,
  RotateCcw,
  Gauge
} from 'lucide-react';

export default function ScenarioControlView({ setActiveTab }) {
  const {
    currentScenarioKey,
    switchScenario,
    scenarioData,
    vehicleSpeed,
    targetSpeed,
    setTargetSpeed,
    driveMode
  } = useSimulation();

  const [sensorNoise, setSensorNoise] = useState('none');
  const [trafficDensity, setTrafficDensity] = useState('medium');

  const scenarioKeys = Object.keys(SCENARIOS);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <Sliders className="w-3.5 h-3.5" />
            AUTONOMOUS DRIVING SIMULATION & TEST LAB
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Scenario Studio & Telemetry Injector
          </h1>
          <p className="text-slate-400 text-sm font-sans mt-1">
            Seamlessly switch environmental conditions, traffic interactions, and corner cases to validate passenger trust.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('dashboard')}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all self-start sm:self-center"
        >
          <Gauge className="w-4 h-4" />
          <span>View In Cockpit Dashboard</span>
        </button>
      </div>

      {/* 7 Core Scenarios Grid */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
          <Car className="w-5 h-5 text-cyan-400" />
          Interactive Driving Scenarios (7 Scenarios)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {scenarioKeys.map((key) => {
            const sc = SCENARIOS[key];
            const isCurrent = currentScenarioKey === key;
            return (
              <div
                key={key}
                onClick={() => switchScenario(key)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-4 ${
                  isCurrent
                    ? 'bg-gradient-to-br from-cyan-950/60 to-slate-900 border-cyan-400 shadow-glow-cyan'
                    : 'bg-[#090f1e]/80 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold uppercase">
                      {sc.category}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                  </div>
                  <h4 className="font-display font-bold text-white text-base leading-snug">{sc.name}</h4>
                  <p className="text-slate-400 text-xs font-sans leading-relaxed line-clamp-3">
                    {sc.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Speed: <strong className="text-white">{sc.speed} km/h</strong></span>
                    <span>Weather: <strong className="text-cyan-300 uppercase">{sc.weather}</strong></span>
                  </div>

                  <button
                    className={`w-full py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 ${
                      isCurrent
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'bg-slate-900 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-700'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{isCurrent ? 'Currently Active' : 'Activate Scenario'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Parameter Tuner & Telemetry Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Real-time Parameter Tuner (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#090f1e]/90 border border-slate-800 shadow-xl space-y-6">
          <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            Dynamic Cruise & Environmental Overrides
          </h3>

          {/* Speed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-slate-400">TARGET CRUISING SPEED:</span>
              <span className="text-cyan-300 font-bold text-sm">{targetSpeed} km/h</span>
            </div>
            <input
              type="range"
              min="0"
              max="130"
              value={targetSpeed}
              onChange={(e) => setTargetSpeed(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0 (Stop)</span>
              <span>50 (Urban)</span>
              <span>100 (Highway)</span>
              <span>130 (Autobahn)</span>
            </div>
          </div>

          {/* Traffic Density Selector */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 block">SIMULATED TRAFFIC DENSITY:</span>
            <div className="grid grid-cols-3 gap-2">
              {['light', 'medium', 'heavy'].map((d) => (
                <button
                  key={d}
                  onClick={() => setTrafficDensity(d)}
                  className={`py-2 rounded-xl text-xs font-mono uppercase font-semibold border transition-all ${
                    trafficDensity === d
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Sensor Fault Injection Simulator */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-slate-400 block">SENSOR FAULT INJECTION (EDGE TEST):</span>
            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
              <button
                onClick={() => setSensorNoise('none')}
                className={`p-2 rounded-xl border text-center transition-all ${sensorNoise === 'none' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                100% Optimal
              </button>
              <button
                onClick={() => setSensorNoise('camera')}
                className={`p-2 rounded-xl border text-center transition-all ${sensorNoise === 'camera' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                Camera Glare
              </button>
              <button
                onClick={() => setSensorNoise('radar')}
                className={`p-2 rounded-xl border text-center transition-all ${sensorNoise === 'radar' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-900 text-slate-400 border-slate-800'}`}
              >
                Radar Clutter
              </button>
            </div>
          </div>
        </div>

        {/* Live Autonomous Telemetry Bus Inspector (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-[#090f1e]/90 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Live CAN / ROS2 Telemetry Stream
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-semibold">
              100 Hz BROADCAST
            </span>
          </div>

          {/* Code JSON Box */}
          <div className="p-4 rounded-2xl bg-black/70 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto h-72">
            <pre className="text-cyan-300">
{`{
  "timestamp": "${new Date().toISOString()}",
  "vehicle_state": {
    "speed_kmh": ${vehicleSpeed.toFixed(1)},
    "target_speed": ${targetSpeed},
    "autonomy_level": "SAE_Level_4",
    "drive_mode": "${driveMode}",
    "lateral_jerk_g": ${scenarioData.biometrics.cabinJerkG}
  },
  "perception": {
    "confidence_score": ${scenarioData.xai.confidenceScore},
    "actors_tracked": ${scenarioData.nearbyActors.length},
    "headway_buffer_m": ${scenarioData.xai.safetyBufferMeters},
    "time_to_collision_s": ${scenarioData.xai.timeToCollisionSeconds}
  },
  "passenger_trust": {
    "trust_index": ${scenarioData.trustScore},
    "stress_pct": ${scenarioData.biometrics.stressLevel},
    "comfort_rating": ${scenarioData.biometrics.comfortRating}
  },
  "xai_rationale": "${scenarioData.xai.primaryExplanation}"
}`}
            </pre>
          </div>

          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Telemetry verified against ISO 26262 ASIL-D functional safety specifications.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

