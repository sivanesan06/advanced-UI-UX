import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SCENARIOS, INITIAL_SENTIMENT_HISTORY, INITIAL_DECISION_HISTORY, DRIVEMATE_FAQ } from '../data/mockData';
import { cockpitAudio } from '../utils/audioSynth';

const SimulationContext = createContext(null);

export function SimulationProvider({ children }) {
  const [currentScenarioKey, setCurrentScenarioKey] = useState('highway');
  const scenarioData = SCENARIOS[currentScenarioKey] || SCENARIOS.highway;

  const [vehicleSpeed, setVehicleSpeed] = useState(scenarioData.speed);
  const [targetSpeed, setTargetSpeed] = useState(scenarioData.targetSpeed);
  const [driveMode, setDriveMode] = useState(scenarioData.driveMode);
  const [turnSignal, setTurnSignal] = useState(scenarioData.turnSignal);
  const [wipers, setWipers] = useState(scenarioData.wipers);
  const [headlights, setHeadlights] = useState(scenarioData.headlights);
  const [gear, setGear] = useState('D');

  // Anxiety reduction & cabin preferences
  const [calmMode, setCalmMode] = useState(false);
  const [ambientColor, setAmbientColor] = useState('cyan'); // 'cyan', 'emerald', 'amber', 'purple', 'sunset'
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);

  // Trust & passenger states
  const [trustScore, setTrustScore] = useState(scenarioData.trustScore);
  const [passengerFeedback, setPassengerFeedback] = useState(null);
  const [sentimentHistory, setSentimentHistory] = useState(INITIAL_SENTIMENT_HISTORY);
  const [decisionHistory, setDecisionHistory] = useState(INITIAL_DECISION_HISTORY);

  // Biometrics
  const [biometrics, setBiometrics] = useState(scenarioData.biometrics);

  // Takeover (TOR / MRM) State
  const [takeoverState, setTakeoverState] = useState({
    isActive: false,
    countdown: 10,
    reason: 'Construction zone ahead with non-standard lane barricades.',
    driverInputs: {
      handsOnWheel: false,
      eyesOnRoad: true,
      footOnPedal: false,
    },
    fallbackStage: 'none', // 'none' | 'hazards_on' | 'lane_shift' | 'controlled_braking' | 'safe_stop'
    completedHandover: false,
    fallbackTriggered: false
  });

  // DriveMate AI Messages
  const [driveMateMessages, setDriveMateMessages] = useState([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      time: '13:00',
      text: "Hello! I'm DriveMate, your AI cabin companion. I monitor driving physics and will transparently explain any maneuver. Feel free to ask why we are slowing down or changing lanes!"
    }
  ]);

  // Sync state when scenario changes
  const switchScenario = (scenarioKey) => {
    const next = SCENARIOS[scenarioKey];
    if (!next) return;
    setCurrentScenarioKey(scenarioKey);
    setTargetSpeed(next.targetSpeed);
    setTurnSignal(next.turnSignal);
    setWipers(next.wipers);
    setHeadlights(next.headlights);
    setTrustScore(next.trustScore);
    setBiometrics(next.biometrics);

    // Audio cue
    if (scenarioKey === 'takeover') {
      cockpitAudio.playChime('takeover');
      startTakeoverDemo(next.xai.primaryExplanation);
    } else {
      setDriveMode(next.driveMode);
      setTakeoverState(prev => ({ ...prev, isActive: false, countdown: 10, fallbackStage: 'none', fallbackTriggered: false, completedHandover: false }));
      if (scenarioKey === 'obstacle' || scenarioKey === 'pedestrian') {
        cockpitAudio.playChime('warning');
      } else {
        cockpitAudio.playChime('reassurance');
      }
    }

    // Add decision to history log
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newDecision = {
      id: `dec-${Date.now()}`,
      time: timeStr,
      title: next.xai.badge,
      category: next.xai.reasoningCategory,
      speed: `${next.speed} km/h`,
      confidence: `${next.xai.confidenceScore}%`,
      description: next.xai.primaryExplanation,
      outcome: next.xai.layers.safety,
      severity: scenarioKey === 'takeover' ? 'alert' : scenarioKey === 'obstacle' ? 'caution' : 'info'
    };
    setDecisionHistory(prev => [newDecision, ...prev.slice(0, 15)]);

    // Update sentiment history
    setSentimentHistory(prev => {
      const updated = [...prev.slice(1), {
        time: timeStr.slice(0, 5),
        trust: next.trustScore,
        stress: next.biometrics.stressLevel,
        comfort: next.biometrics.comfortRating,
        speed: next.speed
      }];
      return updated;
    });

    if (voiceEnabled) {
      cockpitAudio.speak(next.xai.primaryExplanation);
    }
  };

  // Speed animation loop (smoothly interpolates towards targetSpeed)
  useEffect(() => {
    const interval = setInterval(() => {
      setVehicleSpeed(prev => {
        const diff = targetSpeed - prev;
        if (Math.abs(diff) < 0.5) return targetSpeed;
        return Number((prev + diff * 0.15).toFixed(1));
      });
    }, 100);
    return () => clearInterval(interval);
  }, [targetSpeed]);

  // Turn signal audio pulse
  useEffect(() => {
    if (turnSignal === 'none' || !soundEnabled) return;
    const interval = setInterval(() => {
      cockpitAudio.playChime('turn_signal');
    }, 650);
    return () => clearInterval(interval);
  }, [turnSignal, soundEnabled]);

  // Takeover countdown & fallback procedure
  useEffect(() => {
    if (!takeoverState.isActive || takeoverState.completedHandover || takeoverState.fallbackTriggered) {
      return;
    }

    const timer = setInterval(() => {
      setTakeoverState(prev => {
        if (prev.countdown <= 1) {
          // Timer expired without driver takeover -> Trigger Minimal Risk Maneuver (MRM) fallback!
          clearInterval(timer);
          triggerFallbackManeuver();
          return { ...prev, countdown: 0, fallbackTriggered: true };
        }
        if (soundEnabled) {
          cockpitAudio.playChime('takeover');
        }
        return { ...prev, countdown: prev.countdown - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [takeoverState.isActive, takeoverState.completedHandover, takeoverState.fallbackTriggered, soundEnabled]);

  // Launch Takeover workflow
  const startTakeoverDemo = (customReason) => {
    setDriveMode('TAKEOVER_PENDING');
    setTakeoverState({
      isActive: true,
      countdown: 10,
      reason: customReason || 'Operational boundary reached: irregular construction lane shift.',
      driverInputs: {
        handsOnWheel: false,
        eyesOnRoad: true,
        footOnPedal: false,
      },
      fallbackStage: 'none',
      completedHandover: false,
      fallbackTriggered: false
    });
    cockpitAudio.playChime('takeover');
    if (voiceEnabled) {
      cockpitAudio.speak("Takeover alert: Please place hands on the steering wheel and prepare to take manual control.");
    }
  };

  // Driver acknowledges and takes over
  const acknowledgeTakeover = () => {
    setDriveMode('MANUAL');
    setTakeoverState(prev => ({
      ...prev,
      isActive: false,
      completedHandover: true,
      driverInputs: { handsOnWheel: true, eyesOnRoad: true, footOnPedal: true }
    }));
    cockpitAudio.playChime('reassurance');
    setPassengerFeedback('explained');

    const msg = {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      time: new Date().toTimeString().slice(0, 5),
      text: "Manual control acknowledged. Autonomous steering and acceleration have been safely transferred to you. Drive safely!"
    };
    setDriveMateMessages(prev => [...prev, msg]);

    if (voiceEnabled) {
      cockpitAudio.speak("Manual control confirmed. You have full vehicle control.");
    }
  };

  // Minimal Risk Maneuver (MRM) execution steps
  const triggerFallbackManeuver = () => {
    setDriveMode('MINIMAL_RISK_MANEUVER');
    setTakeoverState(prev => ({
      ...prev,
      isActive: false,
      fallbackTriggered: true,
      fallbackStage: 'hazards_on'
    }));

    cockpitAudio.playChime('warning');
    if (voiceEnabled) {
      cockpitAudio.speak("No driver response detected. Initiating automated Minimal Risk Maneuver: pulling over to roadside shoulder.");
    }

    // Step 1: Hazards On (0s)
    // Step 2: Lane Shift to Shoulder (2.5s)
    setTimeout(() => {
      setTurnSignal('right');
      setTakeoverState(prev => ({ ...prev, fallbackStage: 'lane_shift' }));
      setTargetSpeed(35);
    }, 2200);

    // Step 3: Controlled Braking (5s)
    setTimeout(() => {
      setTakeoverState(prev => ({ ...prev, fallbackStage: 'controlled_braking' }));
      setTargetSpeed(12);
    }, 5000);

    // Step 4: Safe Stop on Shoulder & Parking Brake (8s)
    setTimeout(() => {
      setTakeoverState(prev => ({ ...prev, fallbackStage: 'safe_stop' }));
      setTargetSpeed(0);
      setGear('P');
      cockpitAudio.playChime('reassurance');
    }, 7800);
  };

  // Reset Takeover state back to Autonomous
  const resetTakeoverToFSD = () => {
    setDriveMode('AUTONOMOUS_FSD');
    setGear('D');
    setTurnSignal('none');
    setTargetSpeed(scenarioData.targetSpeed);
    setTakeoverState({
      isActive: false,
      countdown: 10,
      reason: '',
      driverInputs: { handsOnWheel: false, eyesOnRoad: true, footOnPedal: false },
      fallbackStage: 'none',
      completedHandover: false,
      fallbackTriggered: false
    });
    cockpitAudio.playChime('reassurance');
  };

  // Passenger Comfort Feedback actions
  const submitPassengerFeedback = (type) => {
    setPassengerFeedback(type);
    cockpitAudio.playChime('click');

    let reply = '';
    if (type === 'safe') {
      reply = "Thank you! I am glad you are feeling comfortable. I will continue maintaining gentle acceleration and safe spacing.";
      setTrustScore(prev => Math.min(100, prev + 2));
    } else if (type === 'uncomfortable') {
      reply = "I notice you are uncomfortable. I have slightly softened the suspension response, expanded our following distance buffer, and enabled Calm Mode.";
      setCalmMode(true);
      setTrustScore(prev => Math.max(70, prev - 3));
    } else if (type === 'explain') {
      reply = `Current Decision: ${scenarioData.xai.primaryExplanation} Our sensor suite is operating at ${scenarioData.xai.confidenceScore}% confidence.`;
    } else if (type === 'request_takeover') {
      startTakeoverDemo('Passenger initiated manual control handover request.');
      return;
    }

    if (reply) {
      const msg = {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        time: new Date().toTimeString().slice(0, 5),
        text: reply
      };
      setDriveMateMessages(prev => [...prev, msg]);
      if (voiceEnabled) cockpitAudio.speak(reply);
    }
  };

  // DriveMate conversational logic
  const sendDriveMateMessage = (query) => {
    if (!query || !query.trim()) return;
    const cleanQuery = query.trim();
    const userMsg = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      time: new Date().toTimeString().slice(0, 5),
      text: cleanQuery
    };
    setDriveMateMessages(prev => [...prev, userMsg]);
    cockpitAudio.playChime('click');

    // Context-aware match
    const lower = cleanQuery.toLowerCase();
    const matchedFaq = DRIVEMATE_FAQ.find(f => f.keywords.some(k => lower.includes(k)));

    let responseText = '';
    const ctx = {
      scenario: scenarioData,
      vehicleSpeed,
      driveMode
    };

    if (matchedFaq) {
      responseText = matchedFaq.answer(ctx);
    } else {
      responseText = `I'm analyzing our trajectory. We are on ${scenarioData.road} at ${Math.round(vehicleSpeed)} km/h. Everything is normal and all 6 redundant perception sensors are operating at peak efficiency.`;
    }

    setTimeout(() => {
      const assistantMsg = {
        id: `asst-${Date.now()}`,
        sender: 'assistant',
        time: new Date().toTimeString().slice(0, 5),
        text: responseText
      };
      setDriveMateMessages(prev => [...prev, assistantMsg]);
      cockpitAudio.playChime('reassurance');
      if (voiceEnabled) {
        cockpitAudio.speak(responseText);
      }
    }, 400);
  };

  return (
    <SimulationContext.Provider
      value={{
        currentScenarioKey,
        scenarioData,
        vehicleSpeed,
        targetSpeed,
        setTargetSpeed,
        driveMode,
        setDriveMode,
        turnSignal,
        setTurnSignal,
        wipers,
        setWipers,
        headlights,
        setHeadlights,
        gear,
        setGear,
        calmMode,
        setCalmMode,
        toggleCalmMode: () => {
          setCalmMode(prev => !prev);
          cockpitAudio.playChime('click');
        },
        ambientColor,
        setAmbientColor,
        soundEnabled,
        toggleSound: () => {
          setSoundEnabled(prev => {
            cockpitAudio.enabled = !prev;
            return !prev;
          });
        },
        voiceEnabled,
        toggleVoice: () => {
          setVoiceEnabled(prev => !prev);
          cockpitAudio.playChime('click');
        },
        trustScore,
        passengerFeedback,
        submitPassengerFeedback,
        biometrics,
        sentimentHistory,
        decisionHistory,
        takeoverState,
        startTakeoverDemo,
        acknowledgeTakeover,
        triggerFallbackManeuver,
        resetTakeoverToFSD,
        switchScenario,
        driveMateMessages,
        sendDriveMateMessage
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};

