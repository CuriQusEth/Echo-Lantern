import React from 'react';
import { useGameStore } from '../../store/gameStore';

export function GameUI() {
  const score = useGameStore((state) => state.score);
  const flameLevel = useGameStore((state) => state.flameLevel);

  return (
    <div className="absolute top-0 left-0 w-full p-6 pointer-events-none z-10 flex justify-between items-start">
      <div className="flex flex-col gap-2">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Floor</span>
        <span className="text-xl font-serif text-white">{score}</span>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-[10px] uppercase tracking-widest text-white/40">Flame</span>
        <div className="w-32 h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
          <div 
            className="h-full bg-gradient-to-t from-[#F2A93B] to-[#FFDCAB] shadow-[0_-10px_30px_rgba(242,169,59,0.5)] transition-all duration-300"
            style={{ width: `${Math.max(0, Math.min(100, flameLevel))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
