import React, { useState, useEffect } from 'react';
import { CanvasGame } from './components/CanvasGame';
import { TitleScreen } from './components/screens/TitleScreen';
import { GameUI } from './components/screens/GameUI';
import { GameOverScreen } from './components/screens/GameOverScreen';
import { LeaderboardScreen } from './components/screens/LeaderboardScreen';
import { CodexScreen } from './components/screens/CodexScreen';
import { useGameStore } from './store/gameStore';
import { useAccount, useSendTransaction } from 'wagmi';
import { Sun } from 'lucide-react';
import { parseEther } from 'viem';

export default function App() {
  const gameState = useGameStore((state) => state.gameState);
  const maxScore = useGameStore((state) => state.maxScore);
  
  // We use key on CanvasGame to force remount and reset engine state
  const [gameKey, setGameKey] = useState(0);

  const { isConnected } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const [isSendingGM, setIsSendingGM] = useState(false);

  useEffect(() => {
    if (gameState === 'PLAYING') {
      setGameKey((prev) => prev + 1);
    }
  }, [gameState]);

  const sendGMTransaction = async () => {
    try {
      setIsSendingGM(true);
      const txHash = await sendTransactionAsync({
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
        value: parseEther('0'), // sending 0 ETH for GM
        data: '0x' // empty data or any required data
      });
      console.log('GM Transaction sent:', txHash);
      alert('GM Transaction sent! Hash: ' + txHash);
    } catch (error) {
      console.error('Failed to send GM:', error);
    } finally {
      setIsSendingGM(false);
    }
  };

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
      
      {/* Say GM Floating Button */}
      {isConnected && (
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={sendGMTransaction} 
            disabled={isSendingGM}
            className="px-3 py-2 rounded-lg bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center gap-2 font-['Cinzel'] text-xs font-bold"
          >
            <Sun size={16} />
            {isSendingGM ? "Sending GM..." : "Say GM"}
          </button>
        </div>
      )}
    </main>
  );
}
