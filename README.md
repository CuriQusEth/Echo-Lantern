# Echo Lantern Tower

[![Network: Base](https://img.shields.io/badge/Network-Base%20Mainnet%20%7C%20Sepolia-0052FF?style=flat-square&logo=ethereum&logoColor=white)](https://base.org)
[![Upgrade: Denim 200ms](https://img.shields.io/badge/Base%20Upgrade-Denim%20200ms%20Blocks-00D4FF?style=flat-square)](https://docs.base.org/upgrades/overview/)
[![Protocol: ERC-8004](https://img.shields.io/badge/Agent%20Standard-ERC--8004-F2A93B?style=flat-square)](https://eips.ethereum.org/EIPS/eip-8004)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

**Echo Lantern Tower** is an atmospheric, vertical platforming climber built on Base. Stepping into the shoes of the last **Lantern Bearer**, you must ascend an infinite, forgotten monolith by kindling mystical beacons whose acoustic and luminescent shockwaves propel you upward through encroaching darkness.

---

## 🕯️ Game Lore & Mechanics

In an era where shadows have enveloped the lower sanctuaries, only the high beacon towers remain untouched. As the Lantern Bearer, you ascend the tower while carefully guarding your flame against time and cold drafts.

### Core Gameplay Loops
- **Endless Vertical Ascent:** Continuous vertical level generation with procedurally spaced ancient stone platforms, floating ledges, and ascending currents.
- **Lantern Kindling & Echo Waves:** Touching or striking dormant beacons awakens them into radiant bursts. Each ignition unleashes an **Echo Wave**—a physical shockwave granting upward impulse.
- **Flame Meter Management:** Your lantern's flame steadily burns down. Extinction halts your ascent; rekindle your flame by activating lanterns and gathering adrift luminous motes.
- **Agile Physics Engine:** Tuned platformer physics featuring variable jump height, momentum preservation, wall-sliding, and precision wall-jumps.

### Lantern Types
| Lantern | Rune | Visual | Echo Effect |
| :--- | :---: | :--- | :--- |
| **Golden Lantern** | $\Phi$ | Amber Flame | Delivers standard upward propulsion and restores base flame memory. |
| **Resonance Lantern** | $\Omega$ | Violet Core | Produces a resonant blast wave, launching the bearer several floors higher. |
| **Void Lantern** | $\Psi$ | Azure Aura | Casts warding luminesce that shields against hostile shadow entities. |

---

## 🎮 Controls

The game is designed with a mobile-first philosophy while offering full desktop keyboard and controller support:

### Desktop (Keyboard)
- **`A` / `D` or `Left` / `Right` Arrow:** Move left / right
- **`W` / `Up` Arrow / `Space`:** Jump & Wall-Jump
- **`Esc`:** Return to sanctuary or menu

### Mobile & Touch
- **Horizontal Drag / Swipe:** Direct horizontal momentum
- **Tap Screen:** Jump / Wall-jump in mid-air
- **Direct Lantern Tap:** Focus light pulses on nearby lanterns

---

## ⛓️ On-Chain Integrations (Base)

Echo Lantern Tower is built natively on **Base** to take full advantage of low-latency transaction throughput and autonomous on-chain identity standards.

### 1. Base Denim Mainnet Upgrade (200ms Native Blocks)
- Configured for the **Base Denim upgrade**, which activated on **Base Mainnet on November 5, 2026 at 18:00 UTC** (and Base Sepolia on October 21, 2026).
- Replaces Flashblocks and `"pending"` state with canonical **200ms native blocks**.
- Transports in `Web3Provider` connect to `https://mainnet.base.org` using batched JSON-RPC calls with 200ms poll and retry cycles for sub-second, canonical confirmations without preconfirmation drift.

### 2. "Say GM" On-Chain Interaction
- Players with connected Web3 wallets can broadcast a greeting to the tower network.
- Sends zero-value verification transactions to the designated contract:
  ```
  Contract Address: 0xcD0dd3716C5561De47a24949335dF8a8CD8F71a3
  ```

### 3. Cryptographic Climb Verification (SIWE & ERC-8021)
- At the end of each run, players can seal their highest reached floor using an EIP-4361 Sign-In with Ethereum (SIWE) message.
- Climb receipts encapsulate player address, floor depth, timestamp, and builder attribution calldata.

### 4. ERC-8004 Autonomous Agent & MCP Server
- Operates in conjunction with the **Echo Lantern Orchestrator**—an ERC-8004 compliant intelligent agent.
- Provides standard Agent-to-Agent discovery endpoints:
  - Agent Card: `/.well-known/agent-card.json`
  - Model Context Protocol (MCP) Endpoint: `/api/mcp`
  - Agent Status API: `/api/agent`
- Supported MCP tools:
  - `get_race_status`: Query active tower climb states.
  - `start_race`: Initialize climb session.
  - `get_leaderboard`: Retrieve recorded floor standings.
  - `optimize_speed`: Fetch timing recommendations.
  - `get_track_info`: Inspect environmental tower hazards.

---

## 💻 Tech Stack

- **Client Runtime:** React 19, TypeScript
- **Bundler & Tooling:** Vite 6, tsx, esbuild
- **Game Engine:** Custom HTML5 Canvas engine with 60 FPS physics loops, lighting overlays, and particle emitters
- **Styling & Motion:** Tailwind CSS v4, Framer Motion
- **State Management:** Zustand
- **Web3 Ecosystem:** Wagmi v2, Viem v2, TanStack React Query, SIWE
- **Server:** Node.js Express server managing API and MCP routes alongside Vite middlewares

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.x or v20.x recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/echo-lantern-tower.git
   cd echo-lantern-tower
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch local development server:
   ```bash
   npm run dev
   ```
   The application and API routes will be accessible at `http://localhost:3000`.

### Building for Production

Compile the client bundle and bundle the Express production server:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

Run TypeScript verification:
```bash
npm run lint
```

---

## 📁 Project Structure

```
├── app/
│   └── api/
│       ├── agent/route.ts       # Agent information endpoint
│       └── mcp/route.ts         # Model Context Protocol router
├── public/
│   └── .well-known/
│       └── agent-card.json      # ERC-8004 agent discovery descriptor
├── src/
│   ├── components/
│   │   ├── CanvasGame.tsx       # Canvas render loop and user interaction bridge
│   │   └── screens/             # TitleScreen, GameUI, GameOverScreen, CodexScreen, LeaderboardScreen
│   ├── engine/
│   │   └── GameEngine.ts        # Physics, camera, collision, lighting, and entity manager
│   ├── lib/
│   │   ├── erc8004/agents.ts    # Agent registration and MCP schemas
│   │   ├── erc8021/attribution.ts # Transaction attribution helpers
│   │   └── web3/chains.ts       # Base & Base Sepolia Denim configurations
│   ├── providers/
│   │   └── Web3Provider.tsx     # Wagmi and TanStack Query setup
│   ├── store/
│   │   └── gameStore.ts         # Zustand store for flame, score, and game states
│   ├── App.tsx                  # Root application router and GM triggers
│   └── main.tsx                 # Client entry point
├── server.ts                    # Express server with Vite middleware integration
└── README.md                    # Project documentation
```

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
