import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { SENSOR_SUITE } from '../data/mockData';
import {
  BrainCircuit,
  Eye,
  TrendingUp,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  Zap,
  Activity,
  Radio,
  Camera,
  Layers
} from 'lucide-react';

export default function AIDecisionCenterView() {
  const { scenarioData, decisionHistory, vehicleSpeed } = useSimulation();
  const [filterCategory, setFilterCategory] = useState('all');
  const [selectedDecision, setSelectedDecision] = useState(null);

  const categories = ['all', 'Safe Following Distance', 'Speed Control', 'Crosswalk Safety Assurance', 'Collision Avoidance Path Re-routing', 'Wet Road Friction Adaptation', 'Emergency Corridor Priority'];

  const filteredHistory = filterCategory === 'all'
    ? decisionHistory
    : decisionHistory.filter(d => d.category.toLowerCase().includes(filterCategory.toLowerCase()) || d.title.toLowerCase().includes(filterCategory.toLowerCase()));

  const activeInspection = selectedDecision || {
    id: 'current-live',
    time: 'CURRENT LIVE',
    title: scenarioData.xai.badge,
    category: scenarioData.xai.reasoningCategory,
    speed: `${Math.round(vehicleSpeed)} km/h`,
    confidence: `${scenarioData.xai.confidenceScore}%`,
    description: scenarioData.xai.primaryExplanation,
    outcome: scenarioData.xai.layers.safety,
    severity: scenarioData.xai.badgeColor === 'red' ? 'alert' : scenarioData.xai.badgeColor === 'amber' ? 'caution' : 'info'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* View Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            TRANSPARENT EXPLAINABLE ARTIFICIAL INTELLIGENCE (XAI)
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            AI Decision Center & Causal Rationale
          </h1>
          <p className="text-slate-400 text-sm font-sans mt-1">
            Real-time multi-layer decomposition of perception, intention prediction, trajectory planning, and safety buffers.
          </p>
        </div>

        {/* Global Confidence Metric Banner */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/30 flex items-center gap-4">
          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-400 block uppercase">INFERENCE CERTAINTY</span>
            <span className="text-2xl font-display font-extrabold text-cyan-400">{scenarioData.xai.confidenceScore}%</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Real-time Explainable Decision Inspection Panel */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-[#0a1324] to-[#060c18] border border-cyan-500/40 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <h2 className="font-display font-bold text-xl text-white">Live Decision Decomposition</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {activeInspection.category}
            </span>
          </div>
          <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
            <span>Velocity: <strong className="text-white">{activeInspection.speed}</strong></span>
            <span>Confidence: <strong className="text-cyan-300">{activeInspection.confidence}</strong></span>
          </div>
        </div>

        {/* Primary Verbalization Quote */}
        <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-base sm:text-lg text-cyan-100 font-sans italic leading-relaxed">
          "{activeInspection.description}"
        </div>

        {/* 4-Layer Explainability Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Layer 1: Perception */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
              <Eye className="w-4 h-4" />
              <span>1. PERCEPTION LAYER</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {scenarioData.xai.layers.perception}
            </p>
          </div>

          {/* Layer 2: Prediction */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>2. PREDICTION LAYER</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {scenarioData.xai.layers.prediction}
            </p>
          </div>

          {/* Layer 3: Planning */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
              <Cpu className="w-4 h-4" />
              <span>3. TRAJECTORY PLANNING</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {scenarioData.xai.layers.planning}
            </p>
          </div>

          {/* Layer 4: Safety Assurance */}
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>4. SAFETY ASSURANCE</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              {scenarioData.xai.layers.safety}
            </p>
          </div>
        </div>
      </div>

      {/* Sensor Hardware Health Matrix */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display font-bold text-xl text-white">Hardware Perception Redundancy</h3>
            <p className="text-slate-400 text-xs font-sans">Real-time status of 6 multi-modal sensor subsystems powering the XAI pipeline.</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ALL SYSTEMS OPTIMAL
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SENSOR_SUITE.map((sensor) => (
            <div
              key={sensor.id}
              className="p-4 rounded-2xl bg-[#090f1e]/80 border border-slate-800 hover:border-cyan-500/30 transition-all space-y-3 font-mono text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="text-white font-bold font-sans">{sensor.name}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold text-[10px]">
                  {sensor.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-slate-400 pt-1 border-t border-slate-800/80 text-[11px]">
                <div>
                  <span className="block text-[10px] text-slate-500">RANGE</span>
                  <span className="text-slate-200 font-bold">{sensor.range}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">FOV</span>
                  <span className="text-slate-200 font-bold truncate block">{sensor.fov}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">LATENCY</span>
                  <span className="text-cyan-300 font-bold">{sensor.latency}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decision History Log / Timeline */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-xl text-white">Recent Vehicle Decision Timeline</h3>
            <p className="text-slate-400 text-xs font-sans">Audit trail of steering, braking, and trajectory adaptations logged by the autonomous agent.</p>
          </div>

          {/* Quick Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Event Categories</option>
              <option value="Following">Following Distance</option>
              <option value="Speed">Speed Control</option>
              <option value="Crosswalk">Crosswalk / Pedestrian</option>
              <option value="Obstacle">Collision Evasion</option>
              <option value="Emergency">Emergency Yield</option>
            </select>
          </div>
        </div>

        {/* Timeline items list */}
        <div className="space-y-3">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedDecision(item)}
              className={`p-4 rounded-2xl bg-slate-900/60 border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                selectedDecision?.id === item.id
                  ? 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-500/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center flex-shrink-0 text-cyan-400 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-cyan-400 font-bold">{item.time}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {item.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">@ {item.speed}</span>
                  </div>
                  <h4 className="font-sans font-bold text-white text-sm mt-1">{item.title}</h4>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{item.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">CERTAINTY</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">{item.confidence}</span>
                </div>
                <button className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-700 text-xs font-mono flex items-center gap-1 transition-all">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

