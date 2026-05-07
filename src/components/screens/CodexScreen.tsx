import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function CodexScreen() {
  const setGameState = useGameStore((state) => state.setGameState);
  
  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center bg-[#050508]/95 p-8 overflow-y-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-serif italic text-white mt-12 mb-8">LANTERN CODEX</h1>
      
      <div className="w-full max-w-md flex flex-col gap-6">
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-serif text-xl">Φ</div>
          <div>
            <p className="text-sm font-medium text-white">Golden Lantern</p>
            <p className="text-[10px] text-white/40">Provides a standard upward echo. Restores basic flame memory.</p>
          </div>
        </div>
        
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 font-serif text-xl">Ω</div>
          <div>
            <p className="text-sm font-medium text-white">Resonance Lantern</p>
            <p className="text-[10px] text-white/40">Creates a massive push echo, launching the bearer further up.</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3 opacity-50">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-serif text-xl">Ψ</div>
          <div>
            <p className="text-sm font-medium text-white">Void Lantern (Locked)</p>
            <p className="text-[10px] text-white/40">Protects against shadowy entities of the higher floors.</p>
          </div>
        </div>
      </div>

      <button
        onClick={() => setGameState('TITLE')}
        className="mt-8 mb-8 px-8 py-3 rounded-xl bg-[#F2A93B] text-black font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all"
      >
        Back
      </button>
    </motion.div>
  );
}
