import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Rocket, Volume2, VolumeX } from 'lucide-react';

// WebAudio ambient generator (no external assets)
function useSpaceAmbience(enabled) {
  const ctxRef = useRef(null);
  const nodesRef = useRef({});

  useEffect(() => {
    if (!enabled) {
      if (nodesRef.current.gain) {
        const now = ctxRef.current?.currentTime ?? 0;
        nodesRef.current.gain.gain.cancelScheduledValues(now);
        nodesRef.current.gain.gain.linearRampToValueAtTime(0, now + 0.5);
        setTimeout(() => {
          nodesRef.current.osc?.stop();
          ctxRef.current?.close();
          ctxRef.current = null;
          nodesRef.current = {};
        }, 600);
      }
      return;
    }

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      ctxRef.current = ctx;
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 70;

      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.value = 0.07;

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 20;

      const noise = ctx.createOscillator();
      noise.type = 'triangle';
      noise.frequency.value = 0.3;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.002;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 1200;

      const gain = ctx.createGain();
      gain.gain.value = 0;

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      noise.connect(noiseGain);
      noiseGain.connect(filter);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      lfo.start();
      noise.start();

      const now = ctx.currentTime;
      gain.gain.linearRampToValueAtTime(0.08, now + 1.2);

      nodesRef.current = { osc, lfo, noise, gain };
    } catch (e) {
      // ignore autoplay errors
    }

    return () => {
      if (nodesRef.current.osc) {
        const now = ctxRef.current?.currentTime ?? 0;
        nodesRef.current.gain.gain.cancelScheduledValues(now);
        nodesRef.current.gain.gain.linearRampToValueAtTime(0, now + 0.5);
        setTimeout(() => {
          nodesRef.current.osc?.stop();
          ctxRef.current?.close();
          ctxRef.current = null;
          nodesRef.current = {};
        }, 600);
      }
    };
  }, [enabled]);
}

function GlitchHeading({ children }) {
  return (
    <div className="relative select-none">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-[0_0_30px_rgba(99,102,241,0.5)]">
        {children}
      </h1>
      <span className="absolute inset-0 text-white/70 mix-blend-screen blur-[1px] animate-pulse pointer-events-none" aria-hidden>
        {children}
      </span>
      <span className="absolute inset-0 translate-x-[2px] text-fuchsia-400/70 mix-blend-screen blur-[0.5px] animate-[glitch_2.2s_infinite] pointer-events-none" aria-hidden>
        {children}
      </span>
      <span className="absolute inset-0 -translate-x-[2px] text-cyan-400/70 mix-blend-screen blur-[0.5px] animate-[glitch_1.8s_infinite] pointer-events-none" aria-hidden>
        {children}
      </span>
      <style>{`
        @keyframes glitch {
          0%, 100% { clip-path: inset(0 0 0 0); }
          20% { clip-path: inset(10% 0 0 0); }
          40% { clip-path: inset(0 0 15% 0); }
          60% { clip-path: inset(5% 0 10% 0); }
          80% { clip-path: inset(12% 0 5% 0); }
        }
      `}</style>
    </div>
  );
}

export default function Hero({ onEnter }) {
  const [soundOn, setSoundOn] = useState(false);
  useSpaceAmbience(soundOn);

  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const spotlight = useTransform([springX, springY], ([x, y]) => `radial-gradient(600px 400px at ${x}px ${y}px, rgba(99,102,241,0.35), transparent 60%)`);

  const containerRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', onMove);
    return () => el?.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  // Konami code easter egg
  const [secret, setSecret] = useState(false);
  useEffect(() => {
    const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let idx = 0;
    const handler = (e) => {
      if (e.key === seq[idx]) {
        idx += 1;
        if (idx === seq.length) {
          setSecret(true);
          setTimeout(() => setSecret(false), 5000);
          idx = 0;
        }
      } else {
        idx = 0;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden bg-gradient-to-b from-[#0a0116] via-[#060013] to-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/0CT1-dbOQTa-XJKt/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <motion.div style={{ background: spotlight }} className="absolute inset-0 pointer-events-none" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0116]/40 to-black/80 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.35), transparent), radial-gradient(1px 1px at 120px 80px, rgba(150,200,255,0.25), transparent), radial-gradient(1.5px 1.5px at 260px 200px, rgba(255,255,255,0.25), transparent)', backgroundRepeat: 'repeat' }} />

      <div className="relative h-full flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-md px-4 py-2 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
            <Rocket className="h-4 w-4 text-fuchsia-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-cyan-300/80">Classified Access</span>
          </div>

          <div className="mt-6">
            <GlitchHeading>Enter the Unknown</GlitchHeading>
            <p className="mt-4 text-base sm:text-lg text-cyan-100/80 max-w-3xl mx-auto">
              An immersive archive of extraterrestrial mysteries, sightings, and artifacts. Proceed if you dare.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(99,102,241,0.45)' }}
              whileTap={{ scale: 0.98 }}
              onClick={onEnter}
              className="relative group overflow-hidden px-8 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-cyan-500 text-white font-medium shadow-[0_0_20px_rgba(168,85,247,0.35)]"
            >
              <span className="relative z-10">Access Archive</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700 pointer-events-none" />
            </motion.button>

            <button
              onClick={() => setSoundOn((s) => !s)}
              className="h-12 w-12 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={soundOn ? 'Mute ambience' : 'Play ambience'}
            >
              {soundOn ? <VolumeX /> : <Volume2 />}
            </button>
          </div>

          {secret && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-6 text-sm text-emerald-300/90"
            >
              Transmission unlocked: WE ARE NOT ALONE
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
