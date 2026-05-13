# Echo Lantern Tower

Echo Lantern Tower is a beautiful, atmospheric vertical climbing and lantern-lighting game built on Base. You are the last **Lantern Bearer**, climbing an endless, ancient mystical tower while lighting magical lanterns.

## Overview

Each lantern you light creates powerful echoes that help you reach higher, reveal hidden paths, and awaken the tower's forgotten magic. The game is an endless vertical climber with swipe-to-move and tap-to-jump mechanics. Carefully manage your Lantern Flame — it slowly fades and must be replenished by lighting new lanterns.

## Features

- **Endless Vertical Climber:** Physics-based mechanics with procedural generation constraints as you climb.
- **Lantern Memories & Echoes:** Light different lanterns to restore your flame and propel you up the tower.
- **Sanctuary Upgrades:** Unlock and discover visual combinations in the Codex.
- **On-chain Integration:** Fully integrated with Base Mainnet (ERC-8021 and ERC-8004 capabilities) using SIWE and wagmi/viem.
- **Agent Orchestrator:** Designed to host an AI automation layer interacting directly through MCP and its internal engine APIs. 

## Technical Details

- **Frontend:** React + Canvas + Tailwind CSS + Framer Motion.
- **Backend:** Express Server to handle routing and AI Agent endpoints (`/api/mcp` and `/api/agent`).
- **Web3 Ecosystem:** Wagmi, Viem, SIWE authentication.
- **Tooling:** Vite, TypeScript.

## Getting Started

1. Clone or download the repository.
2. Run \`npm install\` to get the dependencies.
3. Run \`npm run dev\` for the local server.

The dev server will boot using Vite middleware on the custom Express server allowing full stack routing while handling Canvas rendering on the frontend.
