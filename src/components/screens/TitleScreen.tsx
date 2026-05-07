import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';

export function TitleScreen() {
  const setGameState = useGameStore((state) => state.setGameState);

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050508]/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute top-1/4 flex flex-col items-center">
        {/* Animated single glowing lantern */}
        <motion.div 
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F2A93B] to-[#FF6B00] shadow-[0_0_15px_rgba(242,169,59,0.4)] mb-8"
          animate={{
            boxShadow: [
              "0 0 15px 5px rgba(242, 169, 59, 0.4)",
              "0 0 40px 15px rgba(242, 169, 59, 0.6)",
              "0 0 15px 5px rgba(242, 169, 59, 0.4)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.h1 
          className="text-5xl font-serif italic tracking-wide text-white mb-2 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Echo Lantern
        </motion.h1>
        <motion.h2 
          className="text-2xl font-serif italic tracking-widest text-[#F2A93B] mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Tower
        </motion.h2>

        <motion.button
          className="px-8 py-3 rounded-xl bg-[#F2A93B] text-black font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all"
          onClick={() => setGameState('PLAYING')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          BEGIN CLIMB
        </motion.button>
      </div>

      <div className="absolute bottom-12 flex gap-6">
        <button onClick={() => setGameState('LEADERBOARD')} className="text-white/40 text-sm tracking-widest hover:text-white transition-colors">GREAT BEARERS</button>
        <div className="text-white/20">|</div>
        <button onClick={() => setGameState('CODEX')} className="text-white/40 text-sm tracking-widest hover:text-white transition-colors">CODEX</button>
      </div>
    </motion.div>
  );
}
