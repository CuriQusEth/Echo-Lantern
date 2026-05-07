import { create } from 'zustand';

export type GameState = 'TITLE' | 'PLAYING' | 'CODEX' | 'LEADERBOARD' | 'SANCTUM' | 'GAME_OVER';

interface GameStore {
  gameState: GameState;
  score: number;
  maxScore: number;
  flameLevel: number;
  setGameState: (state: GameState) => void;
  setScore: (score: number) => void;
  setFlameLevel: (level: number) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: 'TITLE',
  score: 0,
  maxScore: 0,
  flameLevel: 100,
  setGameState: (state) => set({ gameState: state }),
  setScore: (score) => set((prev) => ({ 
    score, 
    maxScore: Math.max(prev.maxScore, score)
  })),
  setFlameLevel: (level) => set({ flameLevel: level }),
}));
