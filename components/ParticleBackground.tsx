import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    // Google Brand Colors
    const COLORS = {
      BLUE: '#4285F4',
      RED: '#EA4335',
      YELLOW: '#FBBC05',
      GREEN: '#34A853',
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      originX: number;
      originY: number;
      vx: number;
      vy: number;
      color: string;
      angle: number;
      baseAngle: number;
      size: number;
      
      // Physics constants
      friction = 0.94; // Higher friction = smoother slow down
      ease = 0.08; // Spring strength

      constructor(x: number, y: number, color: string, angle: number) {
        this.x = x;
        this.y = y;
        this.originX = x;
        this.originY = y;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.baseAngle = angle;
        this.angle = angle;
        this.size = 12; // Fixed size for uniformity
      }

      update() {
        // 1. Calculate distance to mouse
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceDistance = 250; // Large interaction radius
        
        let forceX = 0;
        let forceY = 0;

        // 2. Mouse Repulsion Force
        if (distance < forceDistance) {
          const force = (forceDistance - distance) / forceDistance;
          const angle = Math.atan2(dy, dx);
          const pushStrength = 40 * force; // Strong push
          
          forceX = -Math.cos(angle) * pushStrength;
          forceY = -Math.sin(angle) * pushStrength;
          
          // Rotate to align with the "push" (force field lines)
          // This makes them point away from mouse
          this.angle = angle; 
        } else {
          // Smoothly rotate back to original tangent angle
          // Shortest path interpolation for angle
          let diff = this.baseAngle - this.angle;
          while (diff < -Math.PI) diff += Math.PI * 2;
          while (diff > Math.PI) diff -= Math.PI * 2;
          
          this.angle += diff * 0.1;
        }

        // 3. Apply forces
        this.vx += forceX;
        this.vy += forceY;

        // 4. Spring back to origin
        const homeDx = this.originX - this.x;
        const homeDy = this.originY - this.y;
        
        this.vx += homeDx * this.ease;
        this.vy += homeDy * this.ease;

        // 5. Apply friction
        this.vx *= this.friction;
        this.vy *= this.friction;

        // 6. Update position
        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle); 
        
        ctx.fillStyle = this.color;
        
        // Draw capsule
        const length = this.size;
        const thickness = 4;
        const radius = thickness / 2;
        
        ctx.beginPath();
        ctx.arc(-length / 2 + radius, 0, radius, Math.PI / 2, Math.PI * 1.5);
        ctx.lineTo(length / 2 - radius, -radius);
        ctx.arc(length / 2 - radius, 0, radius, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(-length / 2 + radius, radius);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      }
    }

    const getGoogleColor = (angle: number) => {
      // Normalize angle to 0-2PI
      let normalizedAngle = angle % (Math.PI * 2);
      if (normalizedAngle < 0) normalizedAngle += Math.PI * 2;
      
      // Convert to degrees for easier mapping
      const degrees = normalizedAngle * (180 / Math.PI);

      // Map sectors to Google Colors (approximate quadrants)
      // Top-Right (270-360) & (0-45): Red
      // Bottom-Right (45-135): Yellow
      // Bottom-Left (135-225): Green
      // Top-Left (225-270): Blue
      
      // Adjusted slightly to match visual flow
      if (degrees >= 315 || degrees < 45) return COLORS.RED;
      if (degrees >= 45 && degrees < 135) return COLORS.YELLOW;
      if (degrees >= 135 && degrees < 225) return COLORS.GREEN;
      return COLORS.BLUE;
    };

    const initParticles = () => {
      particles = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY) + 100;
      const gap = 24; // Tighter gap for higher density
      
      // Start from a small radius so the center isn't empty
      for (let radius = 40; radius < maxRadius; radius += gap) {
        const circumference = 2 * Math.PI * radius;
        // Ensure consistent density along the ring
        const particleCount = Math.floor(circumference / 20); 
        
        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          
          const color = getGoogleColor(angle);
          
          // Tangent angle: angle + 90deg
          particles.push(new Particle(x, y, color, angle + Math.PI / 2));
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      // Multiply blend mode helps it look like ink on paper
      style={{ mixBlendMode: 'multiply' }} 
    />
  );
};

export default ParticleBackground;
