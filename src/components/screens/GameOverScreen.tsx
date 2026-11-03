import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/gameStore';
import { useAccount, useSignMessage, useSendTransaction } from 'wagmi';
import { BUILDER_CODE, encodeAttributionCalldata } from '../../lib/erc8021/attribution';
import { parseEther } from 'viem';
import { Sun } from 'lucide-react';

export function GameOverScreen() {
  const score = useGameStore((state) => state.score);
  const maxScore = useGameStore((state) => state.maxScore);
  const setGameState = useGameStore((state) => state.setGameState);
  
  const { isConnected, address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { sendTransactionAsync } = useSendTransaction();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingGM, setIsSendingGM] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [gmTxHash, setGmTxHash] = useState<string | null>(null);

  const handleRecordClimb = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    try {
      setIsSubmitting(true);
      const message = `Echo Lantern Tower Climb Record\nFloor Reached: ${score}\nBearer: ${address}\nBuilder Code: ${BUILDER_CODE}\nTimestamp: ${new Date().toISOString()}`;
      const signature = await signMessageAsync({ message });
      
      console.log("SIWE Climb Signature:", signature);
      encodeAttributionCalldata("0x", { builderCode: BUILDER_CODE });
      
      setTxHash(signature.slice(0, 10) + '...' + signature.slice(-8));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSayGM = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first.");
      return;
    }
    try {
      setIsSendingGM(true);
      const hash = await sendTransactionAsync({
        to: '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3',
        value: parseEther('0'),
        data: '0x'
      });
      console.log('GM TX Hash:', hash);
      setGmTxHash(hash.slice(0, 8) + '...' + hash.slice(-6));
      alert(`GM sent on Base! Hash: ${hash}`);
    } catch (error) {
      console.error('Failed to send GM:', error);
    } finally {
      setIsSendingGM(false);
    }
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
          disabled={isSendingGM}
          className="w-full py-3.5 rounded-xl bg-[#E8A020]/20 hover:bg-[#E8A020]/30 border border-[#E8A020]/40 text-[#E8A020] transition-colors flex items-center justify-center gap-2 font-['Cinzel'] text-xs font-bold shadow-[0_0_15px_rgba(232,160,32,0.2)]"
        >
          <Sun size={16} />
          {isSendingGM ? "Sending GM on Base..." : gmTxHash ? `GM Sent (${gmTxHash})` : "Say GM On-Chain"}
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
