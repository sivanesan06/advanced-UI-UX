# TrustDrive AI – Autonomous Vehicle Passenger Trust System

> **Next-Generation In-Cabin Interface & Transparent Explainable AI (XAI) Platform for Autonomous Vehicles**

Designed to reduce passenger anxiety, explain self-driving decisions in real-time, monitor passenger comfort biometrics, and execute safe human-autonomous handover transitions.

---

## 🌟 Key Features

### 1. Smart Autonomous Driving Dashboard
- **Real-Time Telemetry**: Digital speedometer (km/h), target cruise speed, PRND gear selector, speed limit indicator, battery SOC & range in km, and ASIL-D functional safety rating.
- **Tesla-Style 2.5D Animated Perception Visualizer**: HTML5 Canvas rendering multi-lane highways, dynamic lane markings, surrounding vehicles, trucks, pedestrians on crosswalks, stationary hazard debris, and emergency ambulances with active dual strobes.
- **Sensor Perception Envelope**: Forward LiDAR conical scan sweep, millimeter-wave radar pulses, and real-time trajectory ribbons displaying planned vehicle paths.
- **Camera Angles**: Toggle between **3D Cockpit Perspective** and **Top-Down Birds-Eye View**.

### 2. Transparent Explainable AI (XAI) System
- **Real-Time Causal Explanations**: Decomposes every steering, braking, and throttling action into plain, reassuring English.
- **4-Layer Architectural Breakdown**:
  1. **Perception Layer**: Sensor fusion confirmation from LiDAR, 4D Radar, and 8x Surround HDR Cameras.
  2. **Prediction Layer**: Target intention modeling, trajectory extrapolation, and lane departure probability.
  3. **Planning Layer**: Jerk-free spline path generation, speed targets, and smooth deceleration envelopes.
  4. **Safety Assurance Layer**: ISO 26262 ASIL-D buffer compliance and headway gap verification.
- **Auditable Decision Timeline**: Comprehensive event log with categorization, timestamps, velocity tags, and inspection modals.

### 3. Passenger Trust & Biometric Comfort Monitor
- **Dynamic Trust Score**: Live 0–100 passenger confidence index reflecting ride smoothness, transparent explanations, and safety margins.
- **Biometric Stress Monitoring**: Real-time heart rate (BPM) pulse indicator, anxiety percentage, and ride jerk accelerometer ($m/s^3$).
- **Interactive Feedback System**: Direct buttons for *"I Feel Safe"*, *"I'm Uncomfortable"*, *"Explain This Decision"*, and *"Request Human Control"*.
- **Historical Sentiment Analytics**: 15-minute sliding window chart powered by Recharts visualizing Trust vs. Stress over time.

### 4. Smart Human Takeover (TOR) & Minimal Risk Fallback (MRM)
- **SAE Level 3/4 Handover Protocol**: Triggered during out-of-domain edge cases (unmapped construction chicanes, extreme sensor blinding).
- **10-Second High-Urgency Countdown**: Flashing cockpit warnings, audible audio alarms, and driver readiness telemetry (hands on wheel, gaze attentiveness).
- **Driver Confirmation**: Smooth handover to Manual Control Mode upon acknowledgment.
- **Automated Fallback (MRM)**: If the driver is unresponsive, the vehicle automatically initiates the fail-safe protocol:
  1. Emergency Hazard Lights activated.
  2. Automated lane shift to the nearest shoulder.
  3. Controlled gentle deceleration to 0 km/h.
  4. Electronic parking brake engaged and emergency beacon dispatched.

### 5. DriveMate AI Conversational Cabin Companion
- **Context-Aware NLP Assistant**: Answers passenger questions in natural language ("Why did the car stop?", "Is the road safe?", "Why are we changing lanes?").
- **Voice Synthesis**: Full speech generation via Web Speech API (`window.speechSynthesis`).
- **Anxiety Mitigation**: Calming tone designed specifically to ease passenger hesitation.

### 6. Interactive Scenario Control Lab
- **7 Realistic Driving Scenarios**:
  1. *Normal Highway Cruising* (105 km/h, lane centering, optimal headway)
  2. *Heavy Traffic & Stop-and-Go* (Bumper-to-bumper, jerk-free creeping)
  3. *Pedestrian Crossing* (Crosswalk detection, illuminated yield stop)
  4. *Sudden Road Obstacle* (Evasive lane change around stalled hazard)
  5. *Heavy Rain & Reduced Visibility* (Speed reduction, radar priority, wet traction)
  6. *Emergency Vehicle Approaching* (Siren acoustic detection, corridor yield)
  7. *Human Takeover Required* (Unmarked construction detour, 10s countdown)
- **Dynamic Parameter Injection**: Speed slider (0–130 km/h), weather conditions, traffic density, and simulated sensor noise.

### 7. In-Cabin Anxiety Reduction Suite
- **Calm Mode**: One-click toggle simplifying the HUD and removing complex bounding boxes to prevent cognitive overload.
- **Ambient Lighting Palette**: Customizable mood glow (Cyber Cyan, Aurora Emerald, Warm Amber, Deep Violet, Sunset Coral).
- **Cockpit Audio Synthesizer**: Zero-dependency Web Audio API sound effects for chimes, warnings, turn signals, and safe stop confirmations.

---

## 🛠️ Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS & Glassmorphism Design System
- **Animations**: Framer Motion & HTML5 Canvas
- **Icons**: Lucide React
- **Data Visualization**: Recharts
- **Audio & Speech**: Web Audio API & Web Speech Synthesis API
- **Data Source**: Local reactive mock state (no external API keys required)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation & Launch
```bash
# Install dependencies
npm install

# Run the local development server
npm run dev

# Open in browser
http://localhost:5173/
```

### Production Build
```bash
npm run build
npm run preview
```

---

## ⚠️ Educational Simulation Notice
*TrustDrive AI is developed for academic demonstration, interaction design research, and college project exhibitions. All confidence values, takeover countdowns, and driving telemetry are simulated models and do not represent certified OEM automotive control logic.*

