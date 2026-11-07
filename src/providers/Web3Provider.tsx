import React, { ReactNode } from 'react';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Base Denim Mainnet Upgrade:
 * - Denim activated on Base Mainnet on November 5, 2026 at 18:00 UTC
 *   (and Base Sepolia on October 21, 2026).
 * - Base retired Flashblocks and replaced them with canonical 200ms native blocks.
 * - Flashblocks subscriptions, websocket streams, and "pending" preconfirmation states
 *   have been replaced by canonical 200ms native blocks.
 * - Configured with 200ms pollingInterval and batched RPC transports.
 */
export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [injected()],
  ssr: false,
  pollingInterval: 200, // 200ms canonical blocks on Denim Mainnet
  transports: {
    [base.id]: http('https://mainnet.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
    [baseSepolia.id]: http('https://sepolia.base.org', {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 1000,
      staleTime: 200,
    },
  },
});

export function Web3Provider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

