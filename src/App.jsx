import React, { useState } from 'react';
import Hero from './components/Hero.jsx';
import Timeline from './components/Timeline.jsx';
import SpeciesGrid from './components/SpeciesGrid.jsx';
import EvidenceViewer from './components/EvidenceViewer.jsx';
import { motion } from 'framer-motion';

export default function App() {
  const [entered, setEntered] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Hero onEnter={() => setEntered(true)} />

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative py-16 bg-gradient-to-b from-black via-[#0b0120] to-black"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6">
            <h3 className="text-xl text-cyan-300">Welcome, Operative</h3>
            <p className="text-cyan-100/80 mt-2">
              You are now connected to the Nexus. Scroll to review classified findings across time, species hypotheses, and tangible evidence.
            </p>
          </div>
        </div>
      </motion.section>

      <Timeline />
      <SpeciesGrid />
      <EvidenceViewer />

      <footer className="relative py-10 bg-black text-center text-cyan-100/70">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-sm">© {new Date().getFullYear()} The Nexus Initiative — Stay vigilant.</div>
        </div>
      </footer>
    </div>
  );
}
