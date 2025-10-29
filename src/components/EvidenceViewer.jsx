import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const artifacts = [
  {
    title: 'Obsidian Relic',
    desc: 'A dense, unknown alloy with micro-etched glyphs.',
    color: 'from-fuchsia-500/20 to-cyan-500/20',
  },
  {
    title: 'Iridescent Fragment',
    desc: 'Holographic surface bends light at irregular angles.',
    color: 'from-cyan-500/20 to-emerald-500/20',
  },
  {
    title: 'Geometric Seed',
    desc: 'Self-similar fractal structure with latent magnetism.',
    color: 'from-indigo-500/20 to-fuchsia-500/20',
  },
];

function TiltCard({ a }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const sx = useSpring(rx, { stiffness: 120, damping: 12 });
  const sy = useSpring(ry, { stiffness: 120, damping: 12 });

  const onMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rx.set((0.5 - y) * 14);
    ry.set((x - 0.5) * 16);
  };

  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', rotateX: sx, rotateY: sy }}
      className={`relative h-64 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 overflow-hidden bg-gradient-to-br ${a.color} shadow-[0_0_40px_rgba(6,182,212,0.15)]`}
    >
      <div className="absolute -inset-10 opacity-30" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(56,189,248,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(168,85,247,0.2), transparent 40%)' }} />
      <div className="relative" style={{ transform: 'translateZ(40px)' }}>
        <div className="text-cyan-200 text-sm">Artifact</div>
        <div className="mt-1 text-2xl font-semibold text-white">{a.title}</div>
        <p className="mt-2 text-cyan-100/80 max-w-sm">{a.desc}</p>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.06) 0deg 8deg, transparent 8deg 16deg)' }} />
    </motion.div>
  );
}

export default function EvidenceViewer() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-[#07001a] to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">3D Evidence Viewer</h2>
          <p className="text-cyan-100/80 mt-2">Rotate and inspect artifacts with holographic tilt.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {artifacts.map((a) => (
            <TiltCard key={a.title} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
