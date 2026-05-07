import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../game/GameEngine';
import { useGameStore } from '../store/gameStore';

export function CanvasGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<GameEngine | null>(null);
  
  const setScore = useGameStore((state) => state.setScore);
  const setFlameLevel = useGameStore((state) => state.setFlameLevel);
  const setGameState = useGameStore((state) => state.setGameState);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Resize handling
    const updateSize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize();

    engineRef.current = new GameEngine(canvasRef.current);
    
    engineRef.current.onScoreChange = setScore;
    engineRef.current.onFlameChange = setFlameLevel;
    engineRef.current.onGameOver = () => setGameState('GAME_OVER');

    engineRef.current.start();

    return () => {
      window.removeEventListener('resize', updateSize);
      engineRef.current?.cleanup();
    };
  }, [setScore, setFlameLevel, setGameState]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ touchAction: 'none' }}
    />
  );
}
