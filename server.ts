import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Static API file from public
  app.use(express.static('public'));

  // API Route: MCP
  app.get("/api/mcp", (req, res) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Echo Lantern MCP Endpoint",
      status: "active",
      description: "Active MCP server for Echo Lantern Orchestrator Agent",
      capabilities: ["echo-lantern-mechanics", "light-guidance", "narrative-illumination"],
      timestamp: new Date().toISOString()
    });
  });

  const TOOLS = [
    { name: 'get_race_status', description: 'Get the current race status', inputSchema: { type: 'object', properties: {} } },
    { name: 'start_race', description: 'Start the race', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_leaderboard', description: 'Get the current leaderboard', inputSchema: { type: 'object', properties: {} } },
    { name: 'optimize_speed', description: 'Optimize speed', inputSchema: { type: 'object', properties: {} } },
    { name: 'get_track_info', description: 'Get track information', inputSchema: { type: 'object', properties: {} } }
  ];

  app.post("/api/mcp", (req, res) => {
    try {
      const body = req.body;
      const { method } = body;
      
      if (method === 'initialize') {
        res.json({ 
          protocolVersion: "1.0.0", 
          capabilities: { tools: {}, prompts: {}, resources: {} }, 
          serverInfo: { name: "Echo Lantern MCP", version: "1.0.0" }
        });
        return;
      } else if (method === 'tools/list') {
        res.json({ tools: TOOLS });
        return;
      } else if (method === 'tools/call') {
        res.json({ 
          status: "success", 
          result: `Successfully executed ${body.params?.name || 'tool'}`, 
          tool: body.params?.name 
        });
        return;
      } else if (method === 'prompts/list') {
        res.json({ prompts: [] });
        return;
      } else if (method === 'resources/list') {
        res.json({ resources: [] });
        return;
      }

      res.json({
        status: "success",
        message: "MCP command received",
        agent: "Echo Lantern Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid MCP request" });
    }
  });

  // API Route: Agent
  app.get("/api/agent", (req, res) => {
    res.json({
      name: "Echo Lantern Orchestrator",
      status: "active",
      wallet: "0x29536D0bc1004ab274c4F0F59734Ad74D4559b7B",
      platform: "Echo Lantern",
      version: "1.0.0"
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
