import React, { useState, useEffect } from 'react';
import { CanvasGame } from './components/CanvasGame';
import { TitleScreen } from './components/screens/TitleScreen';
import { GameUI } from './components/screens/GameUI';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';
import { CodexScreen } from './components/screens/CodexScreen';
import { useGameStore } from './store/gameStore';

export default function App() {
  const gameState = useGameStore((state) => state.gameState);
  const maxScore = useGameStore((state) => state.maxScore);
  
  // We use key on CanvasGame to force remount and reset engine state
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      setGameKey((prev) => prev + 1);
    }
  }, [gameState]);

  return (
    <main className="relative w-full h-[100dvh] bg-[#050508] text-[#D1D1D1] overflow-hidden font-sans select-none bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#050508_80%)]">
      
      {/* Background static canvas, we render CanvasGame and show/hide via CSS or conditionally */}
      {/* We only want it active when PLAYING or GAMEOVER (to see the final frame) */}
      {(gameState === 'PLAYING' || gameState === 'GAME_OVER') && (
        <CanvasGame key={gameKey} />
      )}

      {/* Screen Routing */}
      {gameState === 'TITLE' && <TitleScreen />}
      {gameState === 'PLAYING' && <GameUI />}
      {gameState === 'LEADERBOARD' && <LeaderboardScreen />}
      {gameState === 'CODEX' && <CodexScreen />}
      {gameState === 'GAME_OVER' && <GameOverScreen />}
      
    </main>
  );
}
