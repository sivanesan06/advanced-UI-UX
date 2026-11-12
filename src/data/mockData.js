// Comprehensive mock driving datasets, sensor configurations, and XAI models

export const SCENARIOS = {
  highway: {
    id: 'highway',
    name: 'Normal Highway Cruising',
    category: 'Optimal Driving',
    description: 'Smooth 105 km/h autonomous cruising with active lane-centering and multi-vehicle headway monitoring.',
    speed: 105,
    speedLimit: 110,
    targetSpeed: 105,
    road: 'Interstate 880 North – Mile 34.2',
    weather: 'clear',
    timeOfDay: 'Day',
    laneIndex: 2, // 1: Left, 2: Center, 3: Right
    totalLanes: 3,
    driveMode: 'AUTONOMOUS_FSD',
    turnSignal: 'none',
    trafficLight: 'green',
    wipers: 'off',
    headlights: 'auto',
    battery: 84,
    batteryRangeKm: 428,
    cabinTemp: 21.5,
    trustScore: 98,
    passengerStatus: 'Optimal Comfort',
    biometrics: {
      heartRate: 68,
      stressLevel: 14,
      comfortRating: 98,
      cabinJerkG: 0.04
    },
    xai: {
      badge: 'Normal Cruising',
      badgeColor: 'emerald',
      primaryExplanation: 'Maintaining 105 km/h cruising speed and 55m safe headway distance from leading vehicle.',
      reasoningCategory: 'Safe Following Distance',
      confidenceScore: 99.4,
      safetyBufferMeters: 55,
      timeToCollisionSeconds: 12.8,
      layers: {
        perception: 'LiDAR + 8x Cameras confirm clear multi-lane forward corridor with 3 identified dynamic targets.',
        prediction: 'Lead Sedan #1 traveling at steady 104 km/h with 0.1% lane deviation probability.',
        planning: 'Cruising speed locked to 105 km/h. Regulated headway buffer maintained with zero throttle jerk.',
        safety: 'ISO 26262 ASIL-D margin compliant. Following gap exceeds statutory 2.5-second rule by 140%.'
      }
    },
    nearbyActors: [
      { id: 'lead', type: 'car', lane: 2, distance: 55, speed: 104, color: '#38bdf8', label: 'Lead Sedan' },
      { id: 'left_car', type: 'car', lane: 1, distance: 30, speed: 115, color: '#94a3b8', label: 'SUV Passing' },
      { id: 'right_truck', type: 'truck', lane: 3, distance: -20, speed: 92, color: '#64748b', label: 'Freight Truck' }
    ]
  },

  traffic: {
    id: 'traffic',
    name: 'Heavy Traffic & Stop-and-Go',
    category: 'Congestion Management',
    description: 'Bumper-to-bumper urban congestion with micro-acceleration smoothing to eliminate passenger motion sickness.',
    speed: 26,
    speedLimit: 60,
    targetSpeed: 30,
    road: 'Financial District Arterial Ave',
    weather: 'clear',
    timeOfDay: 'Day',
    laneIndex: 2,
    totalLanes: 3,
    driveMode: 'AUTONOMOUS_FSD',
    turnSignal: 'none',
    trafficLight: 'yellow',
    wipers: 'off',
    headlights: 'auto',
    battery: 81,
    batteryRangeKm: 412,
    cabinTemp: 22.0,
    trustScore: 93,
    passengerStatus: 'Mild Congestion Alert',
    biometrics: {
      heartRate: 74,
      stressLevel: 26,
      comfortRating: 92,
      cabinJerkG: 0.08
    },
    xai: {
      badge: 'Traffic Jam Assist',
      badgeColor: 'sky',
      primaryExplanation: 'Smoothing acceleration curves and increasing headway to 18m to eliminate passenger stop-start jerk.',
      reasoningCategory: 'Jerk-Free Congestion Crawl',
      confidenceScore: 97.8,
      safetyBufferMeters: 18,
      timeToCollisionSeconds: 6.4,
      layers: {
        perception: 'Radar array tracking 5 clustered vehicles ahead. Micro-distance sensors tracking lead bumper.',
        prediction: 'Traffic wave oscillating between 0 km/h and 35 km/h every 45 seconds.',
        planning: 'Filtering accelerator inputs: using regenerative braking glide instead of sudden friction brakes.',
        safety: 'Zero-collision creeping envelope engaged with ultrasonic proximity guard active.'
      }
    },
    nearbyActors: [
      { id: 'lead', type: 'car', lane: 2, distance: 18, speed: 22, color: '#f59e0b', label: 'Taxi' },
      { id: 'lead2', type: 'car', lane: 2, distance: 36, speed: 20, color: '#94a3b8', label: 'Coupe' },
      { id: 'left_van', type: 'truck', lane: 1, distance: 12, speed: 24, color: '#64748b', label: 'Delivery Van' },
      { id: 'right_car', type: 'car', lane: 3, distance: 8, speed: 25, color: '#38bdf8', label: 'Sedan' }
    ]
  },

  pedestrian: {
    id: 'pedestrian',
    name: 'Pedestrian Crossing Crosswalk',
    category: 'Vulnerable Road Users',
    description: 'Dynamic pedestrian detection and smooth deceleration to a complete standstill yielding right-of-way.',
    speed: 0,
    speedLimit: 50,
    targetSpeed: 0,
    road: 'Oakland Blvd & 4th Street Crosswalk',
    weather: 'clear',
    timeOfDay: 'Day',
    laneIndex: 3,
    totalLanes: 3,
    driveMode: 'AUTONOMOUS_FSD',
    turnSignal: 'none',
    trafficLight: 'red',
    wipers: 'off',
    headlights: 'auto',
    battery: 79,
    batteryRangeKm: 402,
    cabinTemp: 21.8,
    trustScore: 97,
    passengerStatus: 'Reassured by Full Stop',
    biometrics: {
      heartRate: 76,
      stressLevel: 22,
      comfortRating: 96,
      cabinJerkG: 0.12
    },
    xai: {
      badge: 'Pedestrian Yield',
      badgeColor: 'emerald',
      primaryExplanation: 'Slowing to a complete stop: Pedestrian detected entering crosswalk 14m ahead with right-of-way.',
      reasoningCategory: 'Crosswalk Safety Assurance',
      confidenceScore: 99.8,
      safetyBufferMeters: 14,
      timeToCollisionSeconds: 99.0,
      layers: {
        perception: 'Stereo Vision & LiDAR confirmed 1 human pedestrian stepping off curb into illuminated crosswalk.',
        prediction: 'Pedestrian crossing trajectory: moving east-to-west at 1.2 m/s. Clear crosswalk in 6.2s.',
        planning: 'Gentle deceleration applied (-1.6 m/s²). Vehicle halted cleanly 4.5m before stop bar.',
        safety: 'Zero-tolerance safety margin for vulnerable road users. Autonomous hold brake engaged.'
      }
    },
    nearbyActors: [
      { id: 'ped_1', type: 'pedestrian', lane: 3, distance: 14, speed: 4, color: '#00f0ff', label: 'Pedestrian Crossing' },
      { id: 'left_car', type: 'car', lane: 2, distance: 16, speed: 0, color: '#94a3b8', label: 'Stopped Sedan' }
    ]
  },

  obstacle: {
    id: 'obstacle',
    name: 'Sudden Road Obstacle / Debris',
    category: 'Evasive Path Planning',
    description: 'Proactive detection of disabled vehicle/debris ahead with predictive blind-spot clearing and smooth lane change.',
    speed: 82,
    speedLimit: 100,
    targetSpeed: 85,
    road: 'Bayshore Bypass – Curve Section',
    weather: 'night',
    timeOfDay: 'Night',
    laneIndex: 1, // Switched to lane 1 (left)
    totalLanes: 3,
    driveMode: 'AUTONOMOUS_FSD',
    turnSignal: 'left',
    trafficLight: 'green',
    wipers: 'off',
    headlights: 'high',
    battery: 76,
    batteryRangeKm: 388,
    cabinTemp: 22.1,
    trustScore: 89,
    passengerStatus: 'Evasive Maneuver Alert',
    biometrics: {
      heartRate: 85,
      stressLevel: 44,
      comfortRating: 88,
      cabinJerkG: 0.22
    },
    xai: {
      badge: 'Obstacle Evasion',
      badgeColor: 'amber',
      primaryExplanation: 'Executing smooth left lane change: Stationary hazard detected 65m ahead in center lane.',
      reasoningCategory: 'Collision Avoidance Path Re-routing',
      confidenceScore: 96.2,
      safetyBufferMeters: 38,
      timeToCollisionSeconds: 4.8,
      layers: {
        perception: 'Forward LiDAR point cloud detected non-reflective stationary cargo box (0.9m x 1.2m) at 65m.',
        prediction: 'Remaining in center lane would force harsh emergency braking (-4.5 m/s²) within 2.8s.',
        planning: 'Left adjacent lane scanned clear. Left turn indicator activated, smooth spline trajectory generated.',
        safety: 'Lateral g-force limited to 0.22g for passenger stability. 360° blind spot radar confirmed safe clearance.'
      }
    },
    nearbyActors: [
      { id: 'hazard', type: 'obstacle', lane: 2, distance: 45, speed: 0, color: '#ef4444', label: 'Debris Hazard' },
      { id: 'trailing_car', type: 'car', lane: 1, distance: -40, speed: 80, color: '#64748b', label: 'Trailing Sedan' }
    ]
  },

  rain: {
    id: 'rain',
    name: 'Heavy Rain & Reduced Visibility',
    category: 'Adverse Weather',
    description: 'Dynamic adaptation to wet surface friction, prioritizing millimeter-wave radar and widening safety margins.',
    speed: 68,
    speedLimit: 100,
    targetSpeed: 70,
    road: 'Pacific Coast Highway 1 – Rain Zone',
    weather: 'rain',
    timeOfDay: 'Dusk',
    laneIndex: 2,
    totalLanes: 3,
    driveMode: 'AUTONOMOUS_FSD',
    turnSignal: 'none',
    trafficLight: 'green',
    wipers: 'high',
    headlights: 'on',
    battery: 73,
    batteryRangeKm: 372,
    cabinTemp: 22.5,
    trustScore: 92,
    passengerStatus: 'Weather Adapted Caution',
    biometrics: {
      heartRate: 75,
      stressLevel: 34,
      comfortRating: 91,
      cabinJerkG: 0.06
    },
    xai: {
      badge: 'Weather Adapted',
      badgeColor: 'sky',
      primaryExplanation: 'Cruising speed reduced by 32% due to heavy rain; following distance expanded to 80m for hydroplane safety.',
      reasoningCategory: 'Wet Road Friction Adaptation',
      confidenceScore: 94.6,
      safetyBufferMeters: 80,
      timeToCollisionSeconds: 14.2,
      layers: {
        perception: 'Optical camera clarity diminished by 28% water spray. 4D Imaging Radar given 80% perception weight.',
        prediction: 'Estimated road surface friction μ = 0.52 (reduced from dry 0.85). Stopping distance increases by 45%.',
        planning: 'Target cruising speed reduced from 100 km/h to 68 km/h. Headway buffer expanded from 55m to 80m.',
        safety: 'Traction control on Wet Alert mode. Wipers set to continuous high. Battery thermal heating active.'
      }
    },
    nearbyActors: [
      { id: 'lead', type: 'car', lane: 2, distance: 80, speed: 66, color: '#38bdf8', label: 'Lead SUV (Spray)' },
      { id: 'right_truck', type: 'truck', lane: 3, distance: 35, speed: 60, color: '#64748b', label: 'Commercial Tanker' }
    ]
  },

  emergency: {
    id: 'emergency',
    name: 'Emergency Vehicle Approaching',
    category: 'Corridor Yielding',
    description: 'Acoustic and strobe recognition of emergency ambulance, initiating polite right-lane yield maneuver.',
    speed: 62,
    speedLimit: 90,
    targetSpeed: 60,
    road: 'Interstate 280 South Corridor',
    weather: 'clear',
    timeOfDay: 'Day',
    laneIndex: 3, // Merged to right lane
    totalLanes: 3,
    driveMode: 'AUTONOMOUS_FSD',
    turnSignal: 'right',
    trafficLight: 'green',
    wipers: 'off',
    headlights: 'auto',
    battery: 71,
    batteryRangeKm: 360,
    cabinTemp: 21.6,
    trustScore: 95,
    passengerStatus: 'Yielding Corridor',
    biometrics: {
      heartRate: 78,
      stressLevel: 36,
      comfortRating: 94,
      cabinJerkG: 0.10
    },
    xai: {
      badge: 'Emergency Yield',
      badgeColor: 'amber',
      primaryExplanation: 'Merging to right shoulder lane: Approaching emergency ambulance detected 95m behind with active siren.',
      reasoningCategory: 'Emergency Corridor Priority',
      confidenceScore: 98.9,
      safetyBufferMeters: 45,
      timeToCollisionSeconds: 8.5,
      layers: {
        perception: 'External acoustic microphones detected 750 Hz alternating siren; rear cameras detected blue/red strobes.',
        prediction: 'Emergency vehicle traveling at 125 km/h in center express lane. Will overtake in approximately 4.8 seconds.',
        planning: 'Right turn signal activated. Seamless merge executed into lane 3 to establish an open center corridor.',
        safety: 'Compliant with emergency vehicle clearance statutes. Monitored right-side blind spot before merge.'
      }
    },
    nearbyActors: [
      { id: 'ambulance', type: 'emergency', lane: 2, distance: -65, speed: 125, color: '#ff1744', label: 'Ambulance (Fast)' },
      { id: 'lead_right', type: 'car', lane: 3, distance: 60, speed: 60, color: '#94a3b8', label: 'Yielding Sedan' }
    ]
  },

  takeover: {
    id: 'takeover',
    name: 'Human Takeover Required (TOR)',
    category: 'Critical Handover Workflow',
    description: 'Unmapped construction zone with missing road markings and barrier chicane exceeding autonomous operational design domain.',
    speed: 48,
    speedLimit: 60,
    targetSpeed: 45,
    road: 'Highway 9 Skyway Bridge Construction',
    weather: 'fog',
    timeOfDay: 'Dusk',
    laneIndex: 2,
    totalLanes: 3,
    driveMode: 'TAKEOVER_PENDING',
    turnSignal: 'none',
    trafficLight: 'yellow',
    wipers: 'intermittent',
    headlights: 'on',
    battery: 68,
    batteryRangeKm: 345,
    cabinTemp: 21.5,
    trustScore: 82,
    passengerStatus: 'Takeover Action Required',
    biometrics: {
      heartRate: 98,
      stressLevel: 68,
      comfortRating: 80,
      cabinJerkG: 0.16
    },
    xai: {
      badge: 'Takeover Alert (TOR)',
      badgeColor: 'red',
      primaryExplanation: 'Immediate Takeover Required: Irregular construction lane deviation without standardized markers ahead.',
      reasoningCategory: 'Operational Design Domain (ODD) Boundary',
      confidenceScore: 54.2,
      safetyBufferMeters: 25,
      timeToCollisionSeconds: 10.0,
      layers: {
        perception: 'Lane markings end at 70m. Concrete barricades redirecting traffic onto unpaved service detour.',
        prediction: 'Autonomous trajectory confidence falls below ASIL-D threshold (54.2% < 85.0% required).',
        planning: 'Audible and visual Takeover Request (TOR) issued with 10-second transition buffer.',
        safety: 'Fail-Safe Protocol: If driver does not take control, Minimal Risk Maneuver (MRM) will safely pull car to shoulder.'
      }
    },
    nearbyActors: [
      { id: 'barrier', type: 'obstacle', lane: 2, distance: 30, speed: 0, color: '#ef4444', label: 'Construction Barrier' },
      { id: 'escort_truck', type: 'truck', lane: 3, distance: 40, speed: 30, color: '#f59e0b', label: 'Pilot Truck' }
    ]
  }
};

// Hardware sensor suite status
export const SENSOR_SUITE = [
  { id: 'lidar', name: 'Ultra-HD Solid State LiDAR', status: 'Optimal', health: 99, fov: '360° × 45°', range: '280m', latency: '4ms' },
  { id: 'radar', name: '4D Imaging Radar Array', status: 'Optimal', health: 98, fov: '140° Forward / Rear', range: '320m', latency: '6ms' },
  { id: 'cameras', name: '8x Surround 8MP HDR Vision', status: 'Optimal', health: 97, fov: '360° Surround Spherical', range: '250m', latency: '11ms' },
  { id: 'ultrasonic', name: '12x Ultrasonic Near-Field Array', status: 'Optimal', health: 100, fov: 'Perimeter Proximity', range: '8m', latency: '2ms' },
  { id: 'compute', name: 'Dual FSD Neural Inference Core', status: 'Optimal', health: 99, fov: 'Redundant Dual-Core', range: '1,440 TOPS', latency: '12ms' },
  { id: 'gnss', name: 'RTK High-Precision GPS/IMU', status: 'Optimal', health: 96, fov: 'Centimeter Precision', range: 'Global', latency: '5ms' }
];

// Historical passenger comfort & trust trend data (for Recharts)
export const INITIAL_SENTIMENT_HISTORY = [
  { time: '12:45', trust: 92, stress: 24, comfort: 94, speed: 90 },
  { time: '12:48', trust: 94, stress: 20, comfort: 95, speed: 102 },
  { time: '12:51', trust: 96, stress: 18, comfort: 97, speed: 105 },
  { time: '12:54', trust: 91, stress: 32, comfort: 90, speed: 65 },
  { time: '12:57', trust: 95, stress: 22, comfort: 96, speed: 70 },
  { time: '13:00', trust: 98, stress: 14, comfort: 98, speed: 105 },
  { time: '13:03', trust: 97, stress: 16, comfort: 98, speed: 104 }
];

// Contextual Knowledge Base for DriveMate AI Passenger Assistant
export const DRIVEMATE_FAQ = [
  {
    keywords: ['why', 'stop', 'stopped', 'stopping', 'brake', 'halt'],
    answer: (ctx) => {
      if (ctx.scenario.id === 'pedestrian') {
        return "I have brought the car to a smooth stop because a pedestrian is in the illuminated crosswalk 14 meters ahead. I will wait until they have safely stepped onto the sidewalk before continuing.";
      }
      if (ctx.scenario.id === 'traffic') {
        return "We are stopping due to dense urban congestion ahead. I am keeping a generous 18-meter safety gap to absorb sudden stops from the vehicle in front.";
      }
      return `We are currently driving at ${Math.round(ctx.vehicleSpeed)} km/h. Our forward sensors are monitoring leading traffic at a safe headway distance.`;
    }
  },
  {
    keywords: ['safe', 'safety', 'danger', 'secure', 'anxious', 'scared', 'worry'],
    answer: (ctx) => {
      return `You are in safe hands! Our dual-redundant AI compute and 360° LiDAR/Radar sensors are operating at ${ctx.scenario.xai.confidenceScore}% confidence. Every maneuver is calibrated for zero-jerk passenger comfort and strict ISO 26262 functional safety.`;
    }
  },
  {
    keywords: ['lane', 'change', 'changing', 'overtake', 'move'],
    answer: (ctx) => {
      if (ctx.scenario.id === 'obstacle') {
        return "I am initiating a smooth lane change to the left because my LiDAR detected road debris 65 meters ahead in our current lane. I already verified the left lane is 100% clear.";
      }
      if (ctx.scenario.id === 'emergency') {
        return "I am moving over to the right lane to yield an open express corridor for an emergency vehicle approaching from behind.";
      }
      return "We are currently well-centered in our designated travel lane with optimal lateral stability.";
    }
  },
  {
    keywords: ['arrive', 'arrival', 'eta', 'time', 'destination', 'when'],
    answer: (ctx) => {
      const remainingMin = Math.round((ctx.scenario.batteryRangeKm / Math.max(ctx.vehicleSpeed || 60, 40)) * 60 * 0.15);
      return `Our estimated arrival time at Silicon Valley Tech Campus is in approximately ${Math.max(remainingMin, 12)} minutes. Battery remaining is ${ctx.scenario.battery}%, which gives us plenty of range.`;
    }
  },
  {
    keywords: ['respond', 'takeover', 'driver', 'fail', 'sleep', 'unresponsive', 'handover'],
    answer: () => {
      return "If the driver does not acknowledge a Takeover Request within the 10-second countdown, our Minimal Risk Maneuver (MRM) automatically activates: the vehicle turns on hazard lights, executes a safe lane change to the roadside shoulder, comes to a controlled stop, and alerts emergency services.";
    }
  },
  {
    keywords: ['rain', 'weather', 'storm', 'wet', 'traction'],
    answer: (ctx) => {
      return `Our weather perception suite has detected precipitation. I have reduced our cruising speed to ${Math.round(ctx.vehicleSpeed)} km/h, switched priority to 4D imaging radar (which penetrates water spray), and expanded our safety following distance to 80 meters.`;
    }
  }
];

export const INITIAL_DECISION_HISTORY = [
  {
    id: 'dec-1',
    time: '12:58:14',
    title: 'Speed Adjustment for Wet Pavement',
    category: 'Speed Control',
    speed: '68 km/h',
    confidence: '95.8%',
    description: 'Reduced cruise speed from 95 to 68 km/h upon detecting wet road surface coefficient μ = 0.54.',
    outcome: 'Optimal hydroplane safety margin maintained',
    severity: 'info'
  },
  {
    id: 'dec-2',
    time: '13:00:22',
    title: 'Lane Centering Micro-Correction',
    category: 'Steering',
    speed: '72 km/h',
    confidence: '99.1%',
    description: 'Applied 0.8° steering angle adjustment to compensate for 14 km/h crosswind on bridge.',
    outcome: 'Zero passenger lateral drift',
    severity: 'info'
  },
  {
    id: 'dec-3',
    time: '13:01:45',
    title: 'Ahead Vehicle Cut-In Detection',
    category: 'Proximity',
    speed: '70 km/h',
    confidence: '98.4%',
    description: 'Detected silver sedan changing lanes into our forward path; modulated throttle to restore 50m buffer.',
    outcome: 'Braking was gentle (-0.9 m/s²), avoiding passenger alarm',
    severity: 'caution'
  },
  {
    id: 'dec-4',
    time: '13:02:50',
    title: 'Pedestrian Crosswalk Scan Active',
    category: 'Perception',
    speed: '48 km/h',
    confidence: '99.6%',
    description: 'Illuminated crosswalk marked as primary focal zone; reduced speed anticipating pedestrian entry.',
    outcome: 'Smooth stop prepared in advance',
    severity: 'info'
  }
];

