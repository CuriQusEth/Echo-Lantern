import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function LeaderboardScreen() {
  const setGameState = useGameStore((state) => state.setGameState);
  
  const mockLeaders = [
    { name: '0xabc...123', score: 1420 },
    { name: '0xdef...456', score: 980 },
    { name: '0x789...012', score: 450 },
  ];

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center bg-[#050508]/95 p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-3xl font-serif italic text-white mt-12 mb-8">GREAT BEARERS</h1>
      
      <div className="w-full max-w-md flex flex-col gap-4">
        {mockLeaders.map((l, i) => (
          <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
            <span className="text-[10px] font-mono text-orange-400">{i + 1}. {l.name}</span>
            <span className="text-[10px] text-white/60">{l.score}</span>
          </div>
        ))}
      </div>

      <button
        onClick={() => setGameState('TITLE')}
        className="mt-auto mb-8 px-8 py-3 rounded-xl bg-[#F2A93B] text-black font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all"
      >
        Back
      </button>
    </motion.div>
  );
}
