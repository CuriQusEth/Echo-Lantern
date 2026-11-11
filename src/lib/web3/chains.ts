import { defineChain } from 'viem';
import { base as baseDefault } from 'viem/chains';

/**
 * Base Mainnet with Denim Upgrade:
 * - Denim activated on Base Mainnet on November 5, 2026 at 18:00 UTC.
 * - Flashblocks retired; replaced by canonical 200ms native blocks.
 * - Native sub-second settlement and block production.
 */
export const baseMainnetDenim = defineChain({
  ...baseDefault,
  id: 8453,
  name: 'Base Mainnet (Denim)',
  network: 'base',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.base.org'],
      webSocket: ['wss://mainnet.base.org'],
    },
    public: {
      http: ['https://mainnet.base.org'],
      webSocket: ['wss://mainnet.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://basescan.org',
      apiUrl: 'https://api.basescan.org/api',
    },
  },
  contracts: {
    ...baseDefault.contracts,
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 5022,
    },
  },
});

export const GM_CONTRACT_ADDRESS = '0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3' as const;
export const BASE_DENIM_BLOCK_TIME_MS = 200;
