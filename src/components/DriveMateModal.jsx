import React, { useState, useRef, useEffect } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  BrainCircuit,
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldCheck,
  HelpCircle,
  AlertTriangle,
  Heart,
  Bot
} from 'lucide-react';

export default function DriveMateModal({ isOpen, onClose }) {
  const {
    driveMateMessages,
    sendDriveMateMessage,
    voiceEnabled,
    toggleVoice,
    scenarioData,
    vehicleSpeed,
    trustScore,
    submitPassengerFeedback
  } = useSimulation();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "Why did the car stop?",
    "Is the road safe?",
    "Why are we changing lanes?",
    "When will we arrive?",
    "What happens if I don't take over?",
    "How does the car handle rain?"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [driveMateMessages, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendDriveMateMessage(input);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-[620px] rounded-2xl bg-[#0a1120] border border-cyan-500/40 shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Bot className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-white text-lg">DriveMate AI</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  ONLINE • REASSURING AGENT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Context: {scenarioData.name} ({Math.round(vehicleSpeed)} km/h) • Trust Index: {trustScore}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleVoice}
              className={`p-2 rounded-lg border text-xs transition-all ${
                voiceEnabled ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
              title={voiceEnabled ? 'Voice Explanations: Active' : 'Enable Spoken Voice'}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2.5 bg-slate-900/40 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-mono text-cyan-400/80 whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Quick Questions:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => sendDriveMateMessage(prompt)}
              className="px-2.5 py-1 rounded-full text-xs font-mono whitespace-nowrap bg-slate-800/80 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-gradient-to-b from-transparent to-slate-950/50">
          {driveMateMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center flex-shrink-0 text-cyan-400">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
                      : 'bg-slate-900/90 text-slate-200 border border-cyan-500/20 shadow-lg shadow-black/40'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className={`block text-[10px] mt-1 font-mono ${isUser ? 'text-cyan-200 text-right' : 'text-slate-500'}`}>
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Passenger Sentiment Quick Buttons */}
        <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
          <span className="text-slate-400">Quick Passenger Response:</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => submitPassengerFeedback('safe')}
              className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 transition-all"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>I Feel Safe</span>
            </button>
            <button
              onClick={() => submitPassengerFeedback('uncomfortable')}
              className="px-2.5 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 transition-all"
            >
              <AlertTriangle className="w-3 h-3" />
              <span>I'm Uncomfortable</span>
            </button>
          </div>
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask DriveMate anything about our driving decisions, route, or safety..."
            className="flex-1 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all font-sans"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 disabled:hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow-md shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

