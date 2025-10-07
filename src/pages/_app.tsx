import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import config from '../../config.json';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  React.useEffect(() => {
    // Respect persisted preference if present; otherwise fall back to config/theme
    const root = document.getElementById('terminal-root');
    if (!root) return;
    const stored = localStorage.getItem('effects_crt');
    const storedWarp = localStorage.getItem('effects_crt_warp');
    const storedCurve = localStorage.getItem('effects_crt_curve');
    const ensureBarrelMap = () => {
      try {
        const rootEl = document.getElementById('terminal-root');
        if (!rootEl) return;
        const size = 512; // square map; scaled to element by feImage (higher resolution to reduce artifacts)
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const imgData = ctx.createImageData(size, size);
        const data = imgData.data;
        const s = 0.16; // radial strength baked into map (scale controls px shift)
        for (let y = 0; y < size; y++) {
          for (let x = 0; x < size; x++) {
            const nx = (x / (size - 1)) * 2 - 1; // -1..1
            const ny = (y / (size - 1)) * 2 - 1; // -1..1
            const r2 = nx * nx + ny * ny; // 0..2
            const f = r2; // quadratic barrel
            // inward displacement so edges curve toward center to avoid outer cropping
            let dx = -nx * f * s;
            let dy = -ny * f * s;
            // clamp to safe range
            dx = Math.max(-0.5, Math.min(0.5, dx));
            dy = Math.max(-0.5, Math.min(0.5, dy));
            const R = Math.round(128 + dx * 255);
            const G = Math.round(128 + dy * 255);
            const idx = (y * size + x) * 4;
            data[idx + 0] = Math.max(0, Math.min(255, R));
            data[idx + 1] = Math.max(0, Math.min(255, G));
            data[idx + 2] = 128; // neutral blue
            data[idx + 3] = 255;
          }
        }
        ctx.putImageData(imgData, 0, 0);
        const url = canvas.toDataURL('image/png');
        const ids = ['crt-barrel-map-sm', 'crt-barrel-map-md', 'crt-barrel-map-lg'];
        ids.forEach((id) => {
          const el = document.getElementById(id) as any;
          if (el) {
            el.setAttribute('href', url);
            el.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', url);
          }
        });
      } catch {}
    };

    ensureBarrelMap();
    const onResize = () => ensureBarrelMap();
    window.addEventListener('resize', onResize);

    if (stored === 'true') {
      root.classList.add('crt');
      // apply persisted warp
      if (storedWarp === 'sm' || storedWarp === 'md' || storedWarp === 'lg') {
        root.classList.remove('crt-warp-sm', 'crt-warp-md', 'crt-warp-lg');
        root.classList.add(`crt-warp-${storedWarp}`);
      }
      if (storedCurve === 'true') root.classList.add('crt-curve');
      return () => window.removeEventListener('resize', onResize);
    }
    if (stored === 'false') {
      root.classList.remove('crt');
      return () => window.removeEventListener('resize', onResize);
    }
    if (config?.effects?.crt || config?.theme === 'matrix_crt') {
      root.classList.add('crt');
      // default warp strength
      root.classList.add('crt-warp-md');
    } else {
      root.classList.remove('crt');
    }
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Live updates for sumfetch datetime and age
  React.useEffect(() => {
    const birth = new Date(2005, 6, 26); // 26 July 2005 (month is 0-based)
    const pad = (n: number) => String(n).padStart(2, '0');
    const fmtNow = () => {
      const n = new Date();
      return `${n.getFullYear()}-${pad(n.getMonth() + 1)}-${pad(n.getDate())} ${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`;
    };
    const computeAge = () => {
      const n = new Date();
      let years = n.getFullYear() - birth.getFullYear();
      const anniv = new Date(n.getFullYear(), birth.getMonth(), birth.getDate());
      if (n < anniv) years -= 1;
      // Days since last birthday
      let lastBD = new Date(n.getFullYear(), birth.getMonth(), birth.getDate());
      if (n < lastBD) lastBD = new Date(n.getFullYear() - 1, birth.getMonth(), birth.getDate());
      const days = Math.floor((n.getTime() - lastBD.getTime()) / 86400000);
      return `${years}y ${days}d`;
    };
    const tick = () => {
      document.querySelectorAll('[data-sum-dt]').forEach((el) => {
        (el as HTMLElement).textContent = fmtNow();
      });
      document.querySelectorAll('[data-sum-age]').forEach((el) => {
        (el as HTMLElement).textContent = computeAge();
      });
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
          maximum-scale="1"
        />
        <link
          rel="preload"
          href="/assets/fonts/Hack-NF.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </Head>

      <div
        className="text-light-foreground dark:text-dark-foreground min-w-max text-xs md:min-w-full md:text-base"
        onClick={onClickAnywhere}
      >
        {/* Barrel distortion filters (map image is injected at runtime) */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
          <defs>
            <filter id="crt-barrel-sm" x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox">
              <feImage id="crt-barrel-map-sm" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
              <feDisplacementMap in="SourceGraphic" in2="map" scale="14" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="crt-barrel-md" x="-12%" y="-12%" width="124%" height="124%" filterUnits="objectBoundingBox">
              <feImage id="crt-barrel-map-md" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
              <feDisplacementMap in="SourceGraphic" in2="map" scale="24" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <filter id="crt-barrel-lg" x="-14%" y="-14%" width="128%" height="128%" filterUnits="objectBoundingBox">
              <feImage id="crt-barrel-map-lg" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="map" />
              <feDisplacementMap in="SourceGraphic" in2="map" scale="34" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <main
          id="terminal-root"
          className={
            `bg-light-background dark:bg-dark-background w-full h-full p-2 relative overflow-hidden` +
            ((config?.effects?.crt || config?.theme === 'matrix_crt') ? ' crt' : '')
          }
        >
          <div className="crt-frame">
            <div className="crt-inner">
              <Component {...pageProps} inputRef={inputRef} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default App;
