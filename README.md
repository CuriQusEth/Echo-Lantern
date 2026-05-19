# Echo Lantern Tower

Echo Lantern Tower is a beautiful, atmospheric vertical climbing and lantern-lighting game built on Base. You are the last **Lantern Bearer**, climbing an endless, ancient mystical tower while lighting magical lanterns. 

## 🌟 Overview
Each lantern you light creates powerful echoes that help you reach higher, reveal hidden paths, and awaken the tower's forgotten magic. The game is an endless vertical climber with swipe-to-move and tap-to-jump mechanics. Carefully manage your Lantern Flame — it slowly fades and must be replenished by lighting new lanterns.

## 🛠 Tech Stack
- **Framework:** Next.js 14 App Router / React
- **Styling:** Tailwind CSS + Framer Motion
- **Web3 Ecosystem:** Wagmi, Viem, SIWE authentication
- **On-chain Integration:** Fully integrated with Base Mainnet (ERC-8021 and ERC-8004 Trustless Agents capabilities).

## 🔗 MCP Connection Guide
The project utilizes the **Model Context Protocol (MCP)** to allow secure agent interactions via standardized routes.

**MCP Endpoint:** `https://echo-lantern.vercel.app/api/mcp`
- Method: `POST` / `GET`
- Accepts standard MCP json-rpc payloads (`initialize`, `tools/list`, `tools/call`, `prompts/list`, `resources/list`)
- Exposes integrated tools.

**Agent Registration:** 
The primary agent identity and active services can be dynamically retrieved at standard registry endpoints:
`https://echo-lantern.vercel.app/.well-known/agent-card.json`

## 🤖 Agent Capabilities
The **Echo Lantern Orchestrator** intelligent agent is equipped with the following capabilities:
- `echo-lantern-mechanics`
- `light-guidance`
- `narrative-illumination`
- `atmospheric-automation`
- `path-finding`
- `mystic-orchestration`
- `mcp-command-execution`

## 🚀 How to Run Locally

1. Clone or download the repository.
2. Run `npm install` to get the dependencies.
3. Start the dev server using `npm run dev`.
