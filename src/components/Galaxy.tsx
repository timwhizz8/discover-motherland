"use client";
import React, { useRef, useEffect } from "react";

interface GalaxyProps {
  mouseRepulsion?: boolean;
  mouseInteraction?: boolean;
  density?: number;
  glowIntensity?: number;
  saturation?: number;
  hueShift?: number;
  twinkleIntensity?: number;
  rotationSpeed?: number;
  repulsionStrength?: number;
  autoCenterRepulsion?: number;
  starSpeed?: number;
  speed?: number;
}

interface Star {
  r: number;             // Distance from center
  angle: number;         // Current orbital angle
  speed: number;         // Orbital speed
  size: number;          // Size of the star
  baseBrightness: number; // Base opacity
  brightness: number;     // Current opacity
  twinkleSpeed: number;  // Twinkle frequency
  color: string;         // Precomputed HSL color
  offsetX: number;       // Repulsion offset X
  offsetY: number;       // Repulsion offset Y
}

export default function Galaxy({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1,
  glowIntensity = 0.3,
  saturation = 0,
  hueShift = 140,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  starSpeed = 0.5,
  speed = 1,
}: GalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: Star[] = [];
    const starCount = Math.floor(600 * density);

    // Resize handler
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initializeStars();
    };

    // Initialize stars in a spiral galaxy pattern
    const initializeStars = () => {
      stars = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;

      for (let i = 0; i < starCount; i++) {
        // Distribute distance with a bias toward the center
        const r = Math.pow(Math.random(), 2.2) * maxRadius + 10;
        
        // Group stars into spiral arms
        const armsCount = 2;
        const armIndex = i % armsCount;
        const armAngle = (armIndex * 2 * Math.PI) / armsCount;
        
        // Add random scatter to form natural spiral shape
        const spiralScatter = (Math.random() - 0.5) * 0.45;
        const angle = (r * 0.003) + armAngle + spiralScatter;

        const size = Math.random() * 1.5 + 0.4;
        const baseBrightness = Math.random() * 0.7 + 0.3;
        const twinkleSpeed = Math.random() * 0.05 + 0.01;

        // Custom color selection based on saturation and hueShift
        let color = "#ffffff";
        if (saturation > 0) {
          const hue = (hueShift + (Math.random() - 0.5) * 40 + 360) % 360;
          color = `hsl(${hue}, ${saturation}%, ${Math.floor(Math.random() * 20 + 75)}%)`;
        }

        stars.push({
          r,
          angle,
          speed: (1 / (r + 10)) * starSpeed * 1.5,
          size,
          baseBrightness,
          brightness: baseBrightness,
          twinkleSpeed,
          color,
          offsetX: 0,
          offsetY: 0,
        });
      }
    };

    // Tracking mouse movements
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseInteraction) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Attach listeners
    window.addEventListener("resize", resizeCanvas);
    const parentElement = canvas.parentElement || window;
    parentElement.addEventListener("mousemove", handleMouseMove as EventListener);
    parentElement.addEventListener("mouseleave", handleMouseLeave as EventListener);

    // Initial sizing
    resizeCanvas();

    // Loop
    const tick = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const mouse = mouseRef.current;

      // Glow/bloom setup
      if (glowIntensity > 0) {
        ctx.shadowBlur = glowIntensity * 12;
        ctx.shadowColor = `hsl(${hueShift}, ${saturation || 100}%, 60%)`;
      } else {
        ctx.shadowBlur = 0;
      }

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Orbit update
        star.angle += star.speed * speed * 0.2 + (rotationSpeed * 0.001 * speed);

        // Calculate basic orbital position
        let starX = centerX + Math.cos(star.angle) * star.r;
        let starY = centerY + Math.sin(star.angle) * star.r;

        // Apply mouse repulsion force
        if (mouseRepulsion && mouse.active) {
          const dx = starX + star.offsetX - mouse.x;
          const dy = starY + star.offsetY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 160;

          if (dist < repulsionRadius && dist > 1) {
            const force = (1 - dist / repulsionRadius) * repulsionStrength * 1.5;
            star.offsetX += (dx / dist) * force;
            star.offsetY += (dy / dist) * force;
          }
        }

        // Apply autoCenter repulsion
        if (autoCenterRepulsion > 0) {
          const dx = starX + star.offsetX - centerX;
          const dy = starY + star.offsetY - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 1) {
            star.offsetX += (dx / dist) * autoCenterRepulsion * 0.05;
            star.offsetY += (dy / dist) * autoCenterRepulsion * 0.05;
          }
        }

        // Elastic return to base orbit path
        star.offsetX *= 0.93;
        star.offsetY *= 0.93;

        // Twinkle effect (alpha oscillation)
        if (twinkleIntensity > 0) {
          const sinFactor = Math.sin(time * star.twinkleSpeed);
          star.brightness = star.baseBrightness + sinFactor * twinkleIntensity * 0.25;
          star.brightness = Math.max(0.1, Math.min(1.0, star.brightness));
        }

        // Draw star
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.brightness;
        ctx.beginPath();
        ctx.arc(starX + star.offsetX, starY + star.offsetY, star.size, 0, 2 * Math.PI);
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      parentElement.removeEventListener("mousemove", handleMouseMove as EventListener);
      parentElement.removeEventListener("mouseleave", handleMouseLeave as EventListener);
      cancelAnimationFrame(animationFrameId);
    };
  }, [
    mouseRepulsion,
    mouseInteraction,
    density,
    glowIntensity,
    saturation,
    hueShift,
    twinkleIntensity,
    rotationSpeed,
    repulsionStrength,
    autoCenterRepulsion,
    starSpeed,
    speed,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none", // Allows clicking elements through background
        zIndex: 0,
      }}
    />
  );
}
