import React, { useEffect, useRef } from 'react';

const AmbientVideoSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for high tech network graph - slowed down for extreme slow-motion
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const nodeCount = 45;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.04, // Extreme slow motion drift
        vy: (Math.random() - 0.5) * 0.04, // Extreme slow motion drift
        radius: Math.random() * 2 + 1,
        color: i % 3 === 0 ? 'rgba(99, 91, 255, 0.65)' : i % 3 === 1 ? 'rgba(14, 165, 233, 0.65)' : 'rgba(217, 70, 239, 0.55)'
      });
    }

    // Binary streams for data cascade visualization - slowed down for extreme slow-motion
    const streams: { x: number; text: string; speed: number; y: number; fontSize: number }[] = [];
    for (let i = 0; i < 15; i++) {
      streams.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        text: Math.random() > 0.5 ? '10101011' : '01101010011',
        speed: Math.random() * 0.06 + 0.03, // Extreme slow motion stream descent
        fontSize: Math.floor(Math.random() * 6) + 8
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw glowing digital grid
      ctx.strokeStyle = 'rgba(99, 91, 255, 0.12)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render Binary Code Streams
      ctx.fillStyle = 'rgba(14, 165, 233, 0.35)';
      streams.forEach((stream) => {
        ctx.font = `${stream.fontSize}px monospace`;
        ctx.fillText(stream.text, stream.x, stream.y);
        stream.y += stream.speed;
        if (stream.y > height) {
          stream.y = -50;
          stream.x = Math.random() * width;
        }
      });

      // 3. Draw high-tech active nodes and connecting lasers
      nodes.forEach((node, idx) => {
        node.x += node.vx;
        node.y += node.vy;

        // Boundaries checks
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Connect nodes near each other
        for (let j = idx + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.35;
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full -z-10 pointer-events-none overflow-hidden bg-transparent">
      {/* Absolute soft high contrast pastel gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-radial from-brand-purple/20 via-transparent to-transparent blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-10%] w-[60%] h-[60%] bg-radial from-brand-cyan/20 via-transparent to-transparent blur-[140px]" />
      <div className="absolute top-[40%] right-[20%] w-[40%] h-[40%] bg-radial from-brand-magenta/15 via-transparent to-transparent blur-[130px]" />
      <canvas ref={canvasRef} className="w-full h-full opacity-90" />
    </div>
  );
};

export default AmbientVideoSimulation;
