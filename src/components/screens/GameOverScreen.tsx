import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useAccount, useSignMessage } from 'wagmi';
import { BUILDER_CODE, encodeAttributionCalldata } from '../../lib/erc8021/attribution';

export function GameOverScreen() {
  const score = useGameStore((state) => state.score);
  const maxScore = useGameStore((state) => state.maxScore);
  const setGameState = useGameStore((state) => state.setGameState);
  
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleRecordClimb = async () => {
    if (!isConnected) {
      alert("Please connect wallet first via standard Web3 modal (simulation).");
      return;
    }
    try {
      setIsSubmitting(true);
      // Simulate SIWE + On-chain TX logic
      const message = `Record highest floor: ${score}\nBuilder Code: ${BUILDER_CODE}`;
      const signature = await signMessageAsync({ message });
      
      // Here you would do the actual WriteContract from wagmi to an ERC-8021 compliant contract
      console.log("Mock TX Signature:", signature);
      encodeAttributionCalldata("0xMOCK_CALLDATA", { builderCode: BUILDER_CODE });
      
      setTimeout(() => {
        setTxHash("0x123...abc");
        setIsSubmitting(false);
      }, 1500);

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const handleSayGM = async () => {
    alert(`On-chain GM transaction initiated! Attributed to Builder ${BUILDER_CODE}`);
  };

  return (
    <motion.div 
      className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#050508]/80 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.h1 
        className="text-4xl font-serif italic text-white mb-2 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Flame Extinguished
      </motion.h1>
      <motion.p className="text-[#F2A93B] font-mono tracking-wider mb-8">
        Your light faded at Floor {score}
      </motion.p>
      
      <div className="flex flex-col gap-4 mb-12 w-full max-w-xs">
        <button
          onClick={handleRecordClimb}
          disabled={isSubmitting || !!txHash}
          className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs font-medium hover:bg-white/10 transition-colors"
        >
          {txHash ? "Climb Recorded!" : isSubmitting ? "Signing..." : "Record This Climb On-Chain"}
        </button>
        
        <button
          onClick={handleSayGM}
          className="w-full py-4 rounded-xl bg-blue-600 border border-blue-400 text-white font-bold text-sm flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:brightness-110 transition-all"
        >
          Say "GM" On-Chain
        </button>

        <button
          onClick={() => {
            // Need a way to trigger engine reset from outside. 
            // In a better architecture we'd expose a reset method or unmount/remount canvas.
            // For now, we will just force state transition and handle it in App.
            setGameState('TITLE');
          }}
          className="w-full py-3 rounded-xl bg-[#F2A93B] text-black font-bold uppercase tracking-widest text-xs hover:brightness-110 transition-all mt-4"
        >
          Return to Sanctuary
        </button>
      </div>

    </motion.div>
  );
}
