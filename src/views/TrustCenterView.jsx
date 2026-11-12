import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Smile,
  Frown,
  HelpCircle,
  UserCheck,
  TrendingUp,
  Sliders,
  Volume2,
  Mic,
  Palette,
  AlertCircle,
  Activity,
  CheckCircle2,
  Info
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function TrustCenterView({ onOpenDriveMate }) {
  const {
    trustScore,
    biometrics,
    scenarioData,
    passengerFeedback,
    submitPassengerFeedback,
    calmMode,
    toggleCalmMode,
    ambientColor,
    setAmbientColor,
    voiceEnabled,
    toggleVoice,
    sentimentHistory
  } = useSimulation();

  const colorThemes = [
    { id: 'cyan', label: 'Cyber Cyan', class: 'bg-cyan-500 text-cyan-400 border-cyan-400' },
    { id: 'emerald', label: 'Aurora Emerald', class: 'bg-emerald-500 text-emerald-400 border-emerald-400' },
    { id: 'amber', label: 'Warm Amber', class: 'bg-amber-500 text-amber-400 border-amber-400' },
    { id: 'purple', label: 'Deep Violet', class: 'bg-purple-500 text-purple-400 border-purple-400' },
    { id: 'sunset', label: 'Sunset Coral', class: 'bg-rose-500 text-rose-400 border-rose-400' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-2">
            <HeartPulse className="w-3.5 h-3.5" />
            PASSENGER COGNITIVE COMFORT & TRUST MONITOR
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
            Passenger Trust & Well-Being Center
          </h1>
          <p className="text-slate-400 text-sm font-sans mt-1">
            Real-time biometric stress feedback, anxiety mitigation controls, and adaptive cabin atmosphere settings.
          </p>
        </div>

        {/* Big Trust Meter Pill */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 flex items-center gap-4">
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">PASSENGER TRUST INDEX</span>
            <span className="text-3xl font-display font-extrabold text-emerald-400">{trustScore}/100</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Safety & Simulation Disclaimer Card */}
      <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed font-sans">
        <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300 font-semibold block font-mono">SIMULATION TRANSPARENCY NOTICE:</strong>
          The trust index and comfort metrics displayed in this dashboard are generated dynamically for interaction design and educational demonstrations. They do not constitute certified automotive functional safety ratings or medical biometric diagnostics.
        </div>
      </div>

      {/* Primary Biometrics & Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Biometrics gauges (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Biometrics Card */}
          <div className="p-6 rounded-3xl bg-[#090f1e]/90 border border-slate-800 shadow-xl space-y-5">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Simulated In-Cabin Biometrics
            </h3>

            {/* Heart Rate Indicator */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block">HEART RATE MONITOR</span>
                <span className="text-2xl font-display font-bold text-white flex items-center gap-2 mt-0.5">
                  {biometrics.heartRate} <span className="text-xs font-mono text-slate-400 font-normal">BPM</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">Normal Resting Rhythm</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
                <HeartPulse className="w-6 h-6 animate-pulse" />
              </div>
            </div>

            {/* Stress Index */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">ANXIETY / STRESS INDEX</span>
                <span className={`font-bold ${biometrics.stressLevel > 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {biometrics.stressLevel}% • {biometrics.stressLevel > 40 ? 'Mild Vigilance' : 'Relaxed & Content'}
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    biometrics.stressLevel > 40 ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${biometrics.stressLevel}%` }}
                />
              </div>
            </div>

            {/* Cabin Ride Jerk (m/s³) */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-slate-400 block text-[10px]">RIDE SMOOTHNESS (JERK)</span>
                <span className="text-lg font-bold text-cyan-300">{biometrics.cabinJerkG} m/s³</span>
                <span className="text-[10px] text-slate-500 block">Below 0.25 m/s³ motion sickness threshold</span>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                OPTIMAL
              </div>
            </div>
          </div>

          {/* Interactive Passenger Feedback Panel */}
          <div className="p-6 rounded-3xl bg-[#090f1e]/90 border border-slate-800 shadow-xl space-y-4">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Smile className="w-5 h-5 text-emerald-400" />
              Real-Time Passenger Interaction
            </h3>
            <p className="text-xs text-slate-400 font-sans">
              Press any button to express your sentiment. The AI will adapt driving dynamics and provide immediate reassurance.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() => submitPassengerFeedback('safe')}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 text-xs font-sans font-semibold border transition-all ${
                  passengerFeedback === 'safe'
                    ? 'bg-emerald-500/30 text-emerald-300 border-emerald-400 shadow-glow-green'
                    : 'bg-slate-900 hover:bg-emerald-950/40 text-slate-200 border-slate-800 hover:border-emerald-500/40'
                }`}
              >
                <Smile className="w-6 h-6 text-emerald-400" />
                <span>I Feel Safe</span>
              </button>

              <button
                onClick={() => submitPassengerFeedback('uncomfortable')}
                className={`p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 text-xs font-sans font-semibold border transition-all ${
                  passengerFeedback === 'uncomfortable'
                    ? 'bg-amber-500/30 text-amber-300 border-amber-400 shadow-glow-amber'
                    : 'bg-slate-900 hover:bg-amber-950/40 text-slate-200 border-slate-800 hover:border-amber-500/40'
                }`}
              >
                <Frown className="w-6 h-6 text-amber-400" />
                <span>I'm Uncomfortable</span>
              </button>

              <button
                onClick={() => submitPassengerFeedback('explain')}
                className="p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 text-xs font-sans font-semibold bg-slate-900 hover:bg-cyan-950/40 text-slate-200 border border-slate-800 hover:border-cyan-500/40 transition-all"
              >
                <HelpCircle className="w-6 h-6 text-cyan-400" />
                <span>Explain Decision</span>
              </button>

              <button
                onClick={() => submitPassengerFeedback('request_takeover')}
                className="p-3.5 rounded-2xl flex flex-col items-center justify-center gap-2 text-xs font-sans font-semibold bg-slate-900 hover:bg-red-950/40 text-slate-200 border border-slate-800 hover:border-red-500/40 transition-all"
              >
                <UserCheck className="w-6 h-6 text-red-400" />
                <span>Request Human Control</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Anxiety Mitigation Controls & Recharts Historical Trend (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Historical Comfort & Trust Chart (Recharts) */}
          <div className="p-6 rounded-3xl bg-[#090f1e]/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Trust & Stress Dynamic Trajectory</h3>
                <p className="text-xs text-slate-400 font-sans">15-minute continuous sliding window of passenger psychological response.</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Trust Score
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Stress %
                </span>
              </div>
            </div>

            {/* Recharts Area Chart */}
            <div className="w-full h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sentimentHistory}>
                  <defs>
                    <linearGradient id="trustGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} fontFamily="JetBrains Mono" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#090f1e', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                    labelStyle={{ color: '#00f0ff', fontFamily: 'JetBrains Mono' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="trust"
                    name="Trust Index (%)"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#trustGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="stress"
                    name="Stress Level (%)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#stressGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cabin Atmosphere & Anxiety Mitigation Settings */}
          <div className="p-6 rounded-3xl bg-[#090f1e]/90 border border-slate-800 shadow-xl space-y-5">
            <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              In-Cabin Anxiety Reduction Controls
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Calm Mode Selector */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Calm Mode HUD</span>
                    <button
                      onClick={toggleCalmMode}
                      className={`w-11 h-6 rounded-full transition-colors relative ${calmMode ? 'bg-emerald-500' : 'bg-slate-700'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${calmMode ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Hides complex LiDAR bounding boxes and velocity vectors to prevent visual cognitive overload.
                  </p>
                </div>
                <span className={`text-[11px] font-mono font-semibold ${calmMode ? 'text-emerald-400' : 'text-slate-500'}`}>
                  STATUS: {calmMode ? 'ACTIVE (REDUCED TELEMETRY)' : 'INACTIVE (FULL TELEMETRY)'}
                </span>
              </div>

              {/* Voice Speech Assistant */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-sm">Spoken Reassurance</span>
                    <button
                      onClick={toggleVoice}
                      className={`w-11 h-6 rounded-full transition-colors relative ${voiceEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${voiceEnabled ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Speaks calm verbal explanations through vehicle speakers before lane changes or braking.
                  </p>
                </div>
                <span className={`text-[11px] font-mono font-semibold ${voiceEnabled ? 'text-cyan-400' : 'text-slate-500'}`}>
                  STATUS: {voiceEnabled ? 'SPEECH SYNTHESIS ENABLED' : 'MUTED (VISUAL ONLY)'}
                </span>
              </div>
            </div>

            {/* Ambient Cabin Lighting Selector */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  Cabin Ambient Lighting
                </span>
                <span className="text-xs font-mono text-cyan-300 uppercase font-semibold">{ambientColor}</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                {colorThemes.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setAmbientColor(c.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-2 border transition-all ${
                      ambientColor === c.id
                        ? `${c.class} bg-opacity-20 font-bold shadow-md`
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${c.id === 'cyan' ? 'bg-cyan-400' : c.id === 'emerald' ? 'bg-emerald-400' : c.id === 'amber' ? 'bg-amber-400' : c.id === 'purple' ? 'bg-purple-400' : 'bg-rose-400'}`} />
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

