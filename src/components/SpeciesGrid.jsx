import React from 'react';
import { motion } from 'framer-motion';

const species = [
  {
    name: 'Greys',
    color: 'from-cyan-500/20 to-fuchsia-500/20',
    front: 'Short, large-headed beings with black almond eyes.',
    back: 'Often linked to abduction narratives and telepathic communication.',
  },
  {
    name: 'Reptilians',
    color: 'from-emerald-500/20 to-cyan-500/20',
    front: 'Tall, scaled entities with reptilian features.',
    back: 'Featured in conspiracy lore as shapeshifting influencers.',
  },
  {
    name: 'Nordics',
    color: 'from-indigo-500/20 to-cyan-500/20',
    front: 'Humanoid, tall, light-haired, often benevolent in myth.',
    back: 'Associated with advanced wisdom and warnings for humanity.',
  },
  {
    name: 'Mantis',
    color: 'from-fuchsia-500/20 to-emerald-500/20',
    front: 'Insectoid, mantis-like posture with elongated limbs.',
    back: 'Described as calm observers with telepathic presence.',
  },
];

function Card({ s, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: i * 0.05 }}
      className="group [perspective:1200px]"
    >
      <div className="relative h-56 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.15)] transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className={`absolute inset-0 p-5 bg-gradient-to-br ${s.color}`} style={{ backfaceVisibility: 'hidden' }}>
          <div className="text-cyan-200 text-sm">Species</div>
          <div className="mt-1 text-2xl font-semibold text-white">{s.name}</div>
          <p className="mt-3 text-cyan-100/80">{s.front}</p>
        </div>
        <div className="absolute inset-0 p-5 bg-black/40" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}>
          <div className="text-cyan-200 text-sm">Profile</div>
          <div className="mt-1 text-lg font-medium text-white">{s.name}</div>
          <p className="mt-2 text-cyan-100/80">{s.back}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function SpeciesGrid() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-[#020011] to-[#040015]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Alien Species Database</h2>
          <p className="text-cyan-100/80 mt-2">Flip the cards to reveal alleged details.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {species.map((s, i) => (
            <Card key={s.name} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
