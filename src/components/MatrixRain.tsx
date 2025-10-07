import React from 'react';

type Drop = {
  y: number;            // head position in rows
  speed: number;        // rows per second
  tail: number;         // tail length in rows
};

const CHARSET = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=<>';

const MatrixRain: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const fontSize = 18;
    const columns = Math.floor(window.innerWidth / fontSize);
    const drops: Drop[] = Array.from({ length: columns }, () => ({
      y: -Math.random() * 30,
      speed: 10 + Math.random() * 6, // rows/sec (slower overall)
      tail: 18 + Math.floor(Math.random() * 10),
    }));

    let last = performance.now();

    ctx.font = `${fontSize}px Hack, monospace`;
    ctx.textBaseline = 'top';

    const white = { r: 255, g: 255, b: 255 };
    const teal = { r: 0, g: 212, b: 170 };   // themes.matrix_crt.dark.blue
    const green = { r: 0, g: 255, b: 136 };  // themes.matrix_crt.dark.green

    const mix = (a: { r: number; g: number; b: number }, b: { r: number; g: number; b: number }, t: number) => ({
      r: Math.round(a.r + (b.r - a.r) * t),
      g: Math.round(a.g + (b.g - a.g) * t),
      b: Math.round(a.b + (b.b - a.b) * t),
    });

    const rgba = (c: { r: number; g: number; b: number }, a: number) => `rgba(${c.r},${c.g},${c.b},${a})`;

    const draw = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000); // clamp to avoid jumps
      last = now;

      if (!canvas || !ctx) return;

      // faint clear for trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // subtle glow
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(0,255,136,0.18)';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        // advance head by speed
        d.y += d.speed * dt;

        // draw head + tail
        for (let k = 0; k <= d.tail; k++) {
          const row = d.y - k;
          const y = Math.floor(row * fontSize);
          if (y < -fontSize || y > canvas.height) continue;

          const x = i * fontSize;
          // color gradient: head=white, then teal, then green
          let color;
          if (k === 0) {
            color = white;
          } else if (k <= 4) {
            color = mix(white, teal, k / 4);
          } else {
            const t = Math.min(1, (k - 4) / Math.max(1, d.tail - 4));
            color = mix(teal, green, t);
          }
          const alpha = Math.max(0, 1 - k / (d.tail + 2));
          ctx.fillStyle = rgba(color, alpha);

          const ch = CHARSET[Math.floor(Math.random() * CHARSET.length)];
          ctx.fillText(ch, x, y);
        }

        // reset with random gap when out of screen
        if (d.y * fontSize > canvas.height + d.tail * fontSize) {
          d.y = -Math.random() * 30;
          d.speed = 10 + Math.random() * 6;
          d.tail = 18 + Math.floor(Math.random() * 10);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-rain"
      aria-hidden
    />
  );
};

export default MatrixRain;
