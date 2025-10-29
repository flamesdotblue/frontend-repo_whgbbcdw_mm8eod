import React from 'react';
import { motion } from 'framer-motion';

const events = [
  { year: '1947', title: 'Roswell Incident', desc: 'Alleged crash of a mysterious craft near Roswell, New Mexico.' },
  { year: '1961', title: 'Hill Abduction', desc: 'Betty and Barney Hill report one of the first widely publicized abduction cases.' },
  { year: '1980', title: 'Rendlesham Forest', desc: 'USAF personnel encounter unexplained lights and a triangular craft in the UK.' },
  { year: '1997', title: 'Phoenix Lights', desc: 'Thousands witness massive V-shaped lights over Arizona.' },
  { year: '2019', title: 'Navy UAP Videos', desc: 'U.S. Navy confirms authenticity of pilot footage of unknown aerial phenomena.' },
];

export default function Timeline() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-[#07001a] to-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-white">Mystery Timeline</h2>
          <p className="text-cyan-100/80 mt-2">A horizontal trail of encounters and sightings across decades.</p>
        </div>

        <div className="relative overflow-x-auto overflow-y-hidden no-scrollbar">
          <div className="min-w-[900px] md:min-w-[1100px] lg:min-w-[1300px]">
            <div className="relative h-40 flex items-center">
              <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-fuchsia-500/30 via-cyan-400/40 to-emerald-400/30" />
              <div className="relative w-full grid grid-flow-col auto-cols-[minmax(220px,1fr)] gap-8">
                {events.map((e, i) => (
                  <motion.div
                    key={e.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.08 }}
                    className="relative"
                  >
                    <div className="h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)] mx-auto" />
                    <div className="mt-4 p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center text-white">
                      <div className="text-sm text-cyan-300/90">{e.year}</div>
                      <div className="mt-1 font-medium">{e.title}</div>
                      <p className="text-sm text-cyan-100/80 mt-1">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
