import React, { useRef, useEffect, useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import { Eye, Layers, ShieldCheck, AlertCircle, Compass, Radio, Wind, Sparkles } from 'lucide-react';

export default function PerceptionVisualizer() {
  const canvasRef = useRef(null);
  const {
    scenarioData,
    vehicleSpeed,
    turnSignal,
    takeoverState,
    driveMode,
    calmMode,
    ambientColor
  } = useSimulation();

  const [cameraMode, setCameraMode] = useState('perspective'); // 'perspective' or 'birdseye'
  const [selectedActor, setSelectedActor] = useState(null);
  const [showSensorBeams, setShowSensorBeams] = useState(true);

  // Animation frame reference
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let offset = 0;
    let scanAngle = 0;
    let rainDrops = [];

    // Initialize rain drops
    for (let i = 0; i < 70; i++) {
      rainDrops.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        speed: 12 + Math.random() * 8,
        length: 15 + Math.random() * 12
      });
    }

    const render = () => {
      // Handle canvas resolution
      const width = canvas.width;
      const height = canvas.height;

      // Road movement speed proportional to vehicle speed
      const roadSpeed = Math.max(vehicleSpeed * 0.08, 0.2);
      offset = (offset + roadSpeed) % 60;
      scanAngle = (scanAngle + 0.04) % (Math.PI * 2);

      // Clear screen
      ctx.clearRect(0, 0, width, height);

      // Background gradient (deep space navy / asphalt glow)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (scenarioData.weather === 'rain') {
        bgGrad.addColorStop(0, '#040813');
        bgGrad.addColorStop(1, '#07111e');
      } else if (scenarioData.weather === 'night') {
        bgGrad.addColorStop(0, '#020409');
        bgGrad.addColorStop(1, '#050a14');
      } else {
        bgGrad.addColorStop(0, '#060d1b');
        bgGrad.addColorStop(1, '#0a1628');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Horizon & Perspective Grid / Sky
      const horizonY = cameraMode === 'perspective' ? height * 0.28 : height * 0.08;
      const vpX = width / 2;
      const vpY = horizonY;

      // Ambient horizon glow
      const horizonGlow = ctx.createRadialGradient(vpX, vpY, 10, vpX, vpY, width * 0.7);
      horizonGlow.addColorStop(0, 'rgba(6, 182, 212, 0.18)');
      horizonGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
      ctx.fillStyle = horizonGlow;
      ctx.fillRect(0, 0, width, height * 0.6);

      // 2. Road geometry
      const roadBottomLeft = width * 0.12;
      const roadBottomRight = width * 0.88;
      const roadTopLeft = cameraMode === 'perspective' ? width * 0.40 : width * 0.25;
      const roadTopRight = cameraMode === 'perspective' ? width * 0.60 : width * 0.75;

      // Road Surface
      ctx.beginPath();
      ctx.moveTo(roadTopLeft, horizonY);
      ctx.lineTo(roadTopRight, horizonY);
      ctx.lineTo(roadBottomRight, height);
      ctx.lineTo(roadBottomLeft, height);
      ctx.closePath();
      const roadGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      roadGrad.addColorStop(0, '#0e1826');
      roadGrad.addColorStop(1, '#111e32');
      ctx.fillStyle = roadGrad;
      ctx.fill();

      // Road edge glow lines (Solid shoulder markers)
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#0284c7';
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#00f0ff';
      ctx.beginPath();
      ctx.moveTo(roadTopLeft, horizonY);
      ctx.lineTo(roadBottomLeft, height);
      ctx.moveTo(roadTopRight, horizonY);
      ctx.lineTo(roadBottomRight, height);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // 3. Lane Dividers (3-lane highway)
      const numLanes = 3;
      for (let l = 1; l < numLanes; l++) {
        const laneRatio = l / numLanes;
        const topLaneX = roadTopLeft + (roadTopRight - roadTopLeft) * laneRatio;
        const btmLaneX = roadBottomLeft + (roadBottomRight - roadBottomLeft) * laneRatio;

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
        ctx.lineWidth = 2;
        ctx.setLineDash([20, 25]);
        ctx.lineDashOffset = -offset;
        ctx.beginPath();
        ctx.moveTo(topLaneX, horizonY);
        ctx.lineTo(btmLaneX, height);
        ctx.stroke();
        ctx.setLineDash([]); // reset
      }

      // Pedestrian Crosswalk stripes (if pedestrian scenario)
      if (scenarioData.id === 'pedestrian') {
        const crosswalkY = height * 0.58;
        const cwTop = crosswalkY - 14;
        const cwBtm = crosswalkY + 14;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        for (let i = roadBottomLeft + 30; i < roadBottomRight - 30; i += 32) {
          ctx.fillRect(i, cwTop, 16, 28);
        }
      }

      // 4. Ego Vehicle Placement & Path
      const egoLane = scenarioData.laneIndex || 2;
      const egoLaneCenterRatio = (egoLane - 0.5) / numLanes;
      const egoY = height * 0.76;
      const egoX = roadBottomLeft + (roadBottomRight - roadBottomLeft) * egoLaneCenterRatio;

      // Trajectory Ribbon (Cyan path plotted ahead)
      ctx.beginPath();
      ctx.moveTo(egoX - 22, egoY + 20);
      let targetX = vpX + (egoLane - 2) * (width * 0.08);
      if (scenarioData.id === 'obstacle') targetX -= 40; // evasive curve
      if (scenarioData.id === 'emergency') targetX += 45; // right yield curve

      ctx.bezierCurveTo(
        egoX - 16, egoY - 80,
        targetX - 8, horizonY + 80,
        targetX, horizonY + 30
      );
      ctx.lineTo(targetX + 8, horizonY + 30);
      ctx.bezierCurveTo(
        targetX + 8, horizonY + 80,
        egoX + 16, egoY - 80,
        egoX + 22, egoY + 20
      );
      ctx.closePath();
      const ribbonGrad = ctx.createLinearGradient(0, egoY, 0, horizonY);
      ribbonGrad.addColorStop(0, 'rgba(0, 240, 255, 0.45)');
      ribbonGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.25)');
      ribbonGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = ribbonGrad;
      ctx.fill();

      // 5. Sensor Perception Wave / LiDAR sweep (Forward Cone)
      if (showSensorBeams && !calmMode) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(egoX, egoY - 10);
        ctx.arc(egoX, egoY - 10, 220, -Math.PI * 0.85, -Math.PI * 0.15);
        ctx.closePath();
        const lidarGrad = ctx.createRadialGradient(egoX, egoY - 10, 10, egoX, egoY - 10, 220);
        lidarGrad.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
        lidarGrad.addColorStop(0.5 + Math.sin(scanAngle) * 0.3, 'rgba(0, 240, 255, 0.08)');
        lidarGrad.addColorStop(1, 'rgba(6, 182, 212, 0)');
        ctx.fillStyle = lidarGrad;
        ctx.fill();

        // Animated radial pulse ring
        const pulseR = 40 + ((offset * 4) % 180);
        ctx.beginPath();
        ctx.arc(egoX, egoY - 10, pulseR, -Math.PI * 0.82, -Math.PI * 0.18);
        ctx.strokeStyle = `rgba(0, 240, 255, ${Math.max(0, 0.4 - pulseR / 220)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 6. Draw Surrounding Actors (Dynamic simulated vehicles / pedestrians / obstacles)
      scenarioData.nearbyActors.forEach((actor) => {
        const actorLaneRatio = (actor.lane - 0.5) / numLanes;
        // Map distance (-50m to +80m) to Y screen position
        const yPct = 0.74 - (actor.distance / 120) * 0.52;
        const clampedY = Math.max(horizonY + 15, Math.min(height - 30, height * yPct));

        // Perspective horizontal position interpolation
        const laneLeft = roadTopLeft + (roadBottomLeft - roadTopLeft) * (clampedY - horizonY) / (height - horizonY);
        const laneRight = roadTopRight + (roadBottomRight - roadTopRight) * (clampedY - horizonY) / (height - horizonY);
        const actorX = laneLeft + (laneRight - laneLeft) * actorLaneRatio;

        // Size scaling with perspective
        const scale = 0.45 + (clampedY - horizonY) / (height - horizonY) * 0.75;
        const boxW = (actor.type === 'truck' ? 36 : actor.type === 'pedestrian' ? 14 : 26) * scale;
        const boxH = (actor.type === 'truck' ? 65 : actor.type === 'pedestrian' ? 14 : 44) * scale;

        // Bounding Box / 3D Wireframe
        ctx.save();
        ctx.translate(actorX, clampedY);

        if (actor.type === 'pedestrian') {
          // Pedestrian rendering
          ctx.fillStyle = '#00f0ff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(0, -boxH * 0.4, 4 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillRect(-boxW / 2, -boxH * 0.2, boxW, boxH * 0.8);

          // Pedestrian crosswalk walking indicator
          ctx.strokeStyle = '#00f0ff';
          ctx.strokeRect(-boxW * 0.8, -boxH * 0.6, boxW * 1.6, boxH * 1.4);
        } else if (actor.type === 'obstacle') {
          // Road Hazard Cone / Debris Box
          ctx.fillStyle = '#ef4444';
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 12;
          ctx.beginPath();
          ctx.moveTo(0, -boxH / 2);
          ctx.lineTo(boxW / 2, boxH / 2);
          ctx.lineTo(-boxW / 2, boxH / 2);
          ctx.closePath();
          ctx.fill();

          // Pulsing hazard ring
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.strokeRect(-boxW * 0.9, -boxH * 0.7, boxW * 1.8, boxH * 1.5);
        } else if (actor.type === 'emergency') {
          // Emergency Ambulance with active strobe flashes
          ctx.fillStyle = '#f8fafc';
          ctx.strokeStyle = '#ef4444';
          ctx.lineWidth = 2;
          ctx.fillRect(-boxW / 2, -boxH / 2, boxW, boxH);
          ctx.strokeRect(-boxW / 2, -boxH / 2, boxW, boxH);

          // Strobe alternating
          const strobe = Math.floor(Date.now() / 150) % 2 === 0;
          ctx.fillStyle = strobe ? '#ff1744' : '#00f0ff';
          ctx.shadowColor = ctx.fillStyle;
          ctx.shadowBlur = 16;
          ctx.fillRect(-boxW * 0.3, -boxH * 0.5, boxW * 0.6, 6);
        } else {
          // Standard Vehicle (Car / Truck)
          ctx.fillStyle = actor.color || '#38bdf8';
          ctx.shadowColor = actor.color || '#38bdf8';
          ctx.shadowBlur = 8;

          // Vehicle body
          ctx.beginPath();
          ctx.roundRect(-boxW / 2, -boxH / 2, boxW, boxH, 4 * scale);
          ctx.fill();

          // Windshield & roof
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.fillRect(-boxW * 0.35, -boxH * 0.25, boxW * 0.7, boxH * 0.45);

          // Taillights
          ctx.fillStyle = '#ef4444';
          ctx.fillRect(-boxW * 0.42, boxH * 0.36, 6 * scale, 3 * scale);
          ctx.fillRect(boxW * 0.42 - 6 * scale, boxH * 0.36, 6 * scale, 3 * scale);

          // Bounding Box HUD
          if (!calmMode) {
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
            ctx.lineWidth = 1;
            ctx.strokeRect(-boxW * 0.65, -boxH * 0.65, boxW * 1.3, boxH * 1.3);
          }
        }

        // Actor Telemetry Label (Distance & Speed vector)
        if (!calmMode) {
          ctx.shadowBlur = 0;
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.4)';
          ctx.lineWidth = 1;
          const tagW = 74;
          const tagH = 26;
          ctx.fillRect(-tagW / 2, -boxH * 0.7 - tagH, tagW, tagH);
          ctx.strokeRect(-tagW / 2, -boxH * 0.7 - tagH, tagW, tagH);

          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 9px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(`${actor.label}`, 0, -boxH * 0.7 - 14);
          ctx.fillStyle = '#94a3b8';
          ctx.fillText(`${actor.distance > 0 ? '+' : ''}${actor.distance}m | ${actor.speed}km/h`, 0, -boxH * 0.7 - 4);
        }

        ctx.restore();
      });

      // 7. Draw Ego Vehicle (The Autonomous Car)
      const egoScale = 1.0;
      const egoW = 42 * egoScale;
      const egoH = 72 * egoScale;

      ctx.save();
      ctx.translate(egoX, egoY);

      // Ego Ground shadow
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.ellipse(0, 6, egoW * 0.7, egoH * 0.6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Ego Headlight Light Cones
      const headlightGrad = ctx.createLinearGradient(0, -egoH / 2, 0, -egoH * 2.8);
      headlightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
      headlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = headlightGrad;
      ctx.beginPath();
      ctx.moveTo(-egoW * 0.35, -egoH * 0.4);
      ctx.lineTo(-egoW * 1.4, -egoH * 2.6);
      ctx.lineTo(egoW * 1.4, -egoH * 2.6);
      ctx.lineTo(egoW * 0.35, -egoH * 0.4);
      ctx.closePath();
      ctx.fill();

      // Car Body (Aerodynamic Cyber Form)
      const carGrad = ctx.createLinearGradient(0, -egoH / 2, 0, egoH / 2);
      carGrad.addColorStop(0, '#0c4a6e');
      carGrad.addColorStop(0.5, '#0369a1');
      carGrad.addColorStop(1, '#075985');
      ctx.fillStyle = carGrad;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.roundRect(-egoW / 2, -egoH / 2, egoW, egoH, [14, 14, 8, 8]);
      ctx.fill();
      ctx.shadowBlur = 0; // reset

      // Glass Canopy / Roof
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.roundRect(-egoW * 0.36, -egoH * 0.28, egoW * 0.72, egoH * 0.52, [8, 8, 4, 4]);
      ctx.fill();

      // Cabin Ambient Light Glow inside the glass!
      ctx.fillStyle = ambientColor === 'emerald' ? 'rgba(16, 185, 129, 0.4)' :
                      ambientColor === 'amber' ? 'rgba(245, 158, 11, 0.4)' :
                      ambientColor === 'purple' ? 'rgba(168, 85, 247, 0.4)' :
                      ambientColor === 'sunset' ? 'rgba(244, 63, 94, 0.4)' :
                      'rgba(6, 182, 212, 0.4)';
      ctx.beginPath();
      ctx.roundRect(-egoW * 0.28, -egoH * 0.18, egoW * 0.56, egoH * 0.34, [6, 6, 2, 2]);
      ctx.fill();

      // Brake Taillights
      const isBraking = vehicleSpeed < scenarioData.targetSpeed || vehicleSpeed < 5;
      ctx.fillStyle = isBraking ? '#ff1744' : '#b91c1c';
      ctx.shadowColor = isBraking ? '#ff1744' : '#ef4444';
      ctx.shadowBlur = isBraking ? 20 : 6;
      ctx.fillRect(-egoW * 0.45, egoH * 0.42, 10, 4);
      ctx.fillRect(egoW * 0.45 - 10, egoH * 0.42, 10, 4);

      // Turn Signals (Amber blink)
      const isTurnBlink = Math.floor(Date.now() / 350) % 2 === 0;
      if (isTurnBlink && (turnSignal === 'left' || takeoverState.isActive)) {
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 15;
        ctx.fillRect(-egoW * 0.48, -egoH * 0.45, 8, 4);
        ctx.fillRect(-egoW * 0.48, egoH * 0.42, 8, 4);
      }
      if (isTurnBlink && (turnSignal === 'right' || takeoverState.isActive)) {
        ctx.fillStyle = '#f59e0b';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 15;
        ctx.fillRect(egoW * 0.48 - 8, -egoH * 0.45, 8, 4);
        ctx.fillRect(egoW * 0.48 - 8, egoH * 0.42, 8, 4);
      }

      ctx.restore();

      // 8. Overhead Traffic Light Gantry (if near or pedestrian crosswalk)
      if (scenarioData.trafficLight) {
        const tlX = roadBottomRight - 20;
        const tlY = horizonY + 25;
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 2;
        ctx.fillRect(tlX - 12, tlY, 24, 60);
        ctx.strokeRect(tlX - 12, tlY, 24, 60);

        // Red light
        ctx.fillStyle = scenarioData.trafficLight === 'red' ? '#ef4444' : '#331515';
        if (scenarioData.trafficLight === 'red') {
          ctx.shadowColor = '#ef4444';
          ctx.shadowBlur = 12;
        }
        ctx.beginPath();
        ctx.arc(tlX, tlY + 12, 6, 0, Math.PI * 2);
        ctx.fill();

        // Yellow light
        ctx.fillStyle = scenarioData.trafficLight === 'yellow' ? '#f59e0b' : '#302008';
        if (scenarioData.trafficLight === 'yellow') {
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 12;
        }
        ctx.beginPath();
        ctx.arc(tlX, tlY + 30, 6, 0, Math.PI * 2);
        ctx.fill();

        // Green light
        ctx.fillStyle = scenarioData.trafficLight === 'green' ? '#10b981' : '#082515';
        if (scenarioData.trafficLight === 'green') {
          ctx.shadowColor = '#10b981';
          ctx.shadowBlur = 12;
        }
        ctx.beginPath();
        ctx.arc(tlX, tlY + 48, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 9. Rain particles (if weather is rain)
      if (scenarioData.weather === 'rain') {
        ctx.strokeStyle = 'rgba(186, 230, 253, 0.35)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        rainDrops.forEach(drop => {
          drop.y += drop.speed;
          if (drop.y > height) {
            drop.y = -20;
            drop.x = Math.random() * width;
          }
          ctx.moveTo(drop.x, drop.y);
          ctx.lineTo(drop.x - 3, drop.y + drop.length);
        });
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cameraMode, scenarioData, vehicleSpeed, turnSignal, takeoverState, driveMode, calmMode, ambientColor, showSensorBeams]);

  return (
    <div className="relative w-full h-[480px] lg:h-[540px] rounded-2xl overflow-hidden border border-cyan-500/30 bg-cyber-dark shadow-2xl flex flex-col">
      {/* Top HUD bar over canvas */}
      <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
        {/* Drive Status Badge */}
        <div className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono">
          <div className={`w-2.5 h-2.5 rounded-full ${driveMode === 'AUTONOMOUS_FSD' ? 'bg-emerald-400 animate-pulse' : driveMode === 'TAKEOVER_PENDING' ? 'bg-red-500 animate-ping' : 'bg-cyan-400'}`} />
          <span className="font-semibold text-slate-200">
            {driveMode === 'AUTONOMOUS_FSD' ? 'FSD v12.5 • ACTIVE' : driveMode === 'TAKEOVER_PENDING' ? 'TAKEOVER REQUIRED' : driveMode === 'MINIMAL_RISK_MANEUVER' ? 'MRM SAFE STOP' : 'MANUAL CONTROL'}
          </span>
        </div>

        {/* Camera and sensor layer controls */}
        <div className="pointer-events-auto flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-lg border border-slate-700/60 text-xs">
          <button
            onClick={() => setCameraMode(prev => prev === 'perspective' ? 'birdseye' : 'perspective')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${cameraMode === 'perspective' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'}`}
            title="Toggle Cockpit vs Top-Down Birds Eye Camera"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="font-mono uppercase">{cameraMode === 'perspective' ? '3D Cockpit' : 'Birds Eye'}</span>
          </button>
          <button
            onClick={() => setShowSensorBeams(prev => !prev)}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1.5 ${showSensorBeams ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40' : 'text-slate-400 hover:text-slate-200'}`}
            title="Toggle LiDAR / Radar Point Field"
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="font-mono">Sensors</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Canvas */}
      <canvas
        ref={canvasRef}
        width={800}
        height={540}
        className="w-full h-full object-cover cursor-crosshair select-none"
      />

      {/* Bottom Telemetry Bar on Visualizer */}
      {!calmMode && (
        <div className="absolute bottom-3 left-4 right-4 z-20 pointer-events-none flex flex-wrap items-center justify-between gap-2">
          {/* Following Buffer */}
          <div className="bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/70 flex items-center gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px] block">SAFE BUFFER</span>
              <span className="font-bold text-cyan-300">{scenarioData.xai.safetyBufferMeters} m</span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 text-[10px] block">COLLISION TTC</span>
              <span className="font-bold text-emerald-400">{scenarioData.xai.timeToCollisionSeconds}s</span>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 text-[10px] block">AI CONFIDENCE</span>
              <span className="font-bold text-sky-400">{scenarioData.xai.confidenceScore}%</span>
            </div>
          </div>

          {/* Road & Weather Indicator */}
          <div className="bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/70 flex items-center gap-2 text-xs font-mono text-slate-300">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span className="truncate max-w-[200px]">{scenarioData.road}</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-800 text-cyan-300 uppercase font-semibold">
              {scenarioData.weather}
            </span>
          </div>
        </div>
      )}

      {/* Calm mode pill indicator */}
      {calmMode && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-spin" />
          <span>Calm Mode Active • Visual Distractions Minimized</span>
        </div>
      )}
    </div>
  );
}

