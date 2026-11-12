// Web Audio API Synthesizer for automotive cockpit chimes & alerts
// Operates without any external audio files or dependencies

class CockpitAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playChime(type = 'reassurance') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      if (type === 'reassurance') {
        // Dual harmonic pleasant chime (Tesla-style confirmation)
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
        osc2.frequency.setValueAtTime(783.99, now + 0.05); // G5
        osc2.frequency.exponentialRampToValueAtTime(1046.50, now + 0.2); // C6

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now + 0.05);
        osc1.stop(now + 0.45);
        osc2.stop(now + 0.45);
      } else if (type === 'warning') {
        // Cautionary double pulse (amber alert)
        [0, 0.14].forEach((offset) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(620, now + offset);
          osc.frequency.setValueAtTime(480, now + offset + 0.08);

          gain.gain.setValueAtTime(0.18, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.12);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + offset);
          osc.stop(now + offset + 0.13);
        });
      } else if (type === 'takeover') {
        // High priority Takeover Request (urgent dual beep)
        [0, 0.12, 0.24].forEach((offset, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(880 + (idx * 50), now + offset); // A5

          gain.gain.setValueAtTime(0.22, now + offset);
          gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.09);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + offset);
          osc.stop(now + offset + 0.1);
        });
      } else if (type === 'click') {
        // Soft haptic tap
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'turn_signal') {
        // Turn signal tick
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      }
    } catch (e) {
      // Audio autoplay policy or unavailable
      console.warn('Audio play skipped:', e);
    }
  }

  speak(text) {
    if (!this.enabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.volume = 0.85;
      // Prefer standard English voice if available
      const voices = window.speechSynthesis.getVoices();
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('English')));
      if (preferred) utterance.voice = preferred;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }
}

export const cockpitAudio = new CockpitAudio();

