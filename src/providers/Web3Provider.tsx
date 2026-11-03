import React, { ReactNode } from 'react';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Base Denim Upgrade Integration:
 * - Denim introduces canonical 200ms native blocks (live on Base Sepolia, Base Mainnet)
 * - Deprecates Flashblocks and "pending" block tags in favor of canonical 200ms blocks
 * - Configured with responsive batching and fast polling for near-instant confirmations
 */
export const wagmiConfig = createConfig({
  chains: [base, baseSepolia],
  connectors: [injected()],
  transports: {
    [base.id]: http(undefined, {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
    [baseSepolia.id]: http(undefined, {
      batch: true,
      retryCount: 3,
      retryDelay: 200,
    }),
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 2000,
      staleTime: 1000,
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
