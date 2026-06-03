const TOOLS = [
  { name: 'get_race_status', description: 'Get the current race status', inputSchema: { type: 'object', properties: {} } },
  { name: 'start_race', description: 'Start the race', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_leaderboard', description: 'Get the current leaderboard', inputSchema: { type: 'object', properties: {} } },
  { name: 'optimize_speed', description: 'Optimize speed', inputSchema: { type: 'object', properties: {} } },
  { name: 'get_track_info', description: 'Get track information', inputSchema: { type: 'object', properties: {} } }
];

export default function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Echo Lantern MCP Endpoint",
      status: "active",
      description: "Active MCP server for Echo Lantern Orchestrator Agent",
      capabilities: ["echo-lantern-mechanics", "light-guidance", "narrative-illumination"],
      timestamp: new Date().toISOString()
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const { method, id } = body;
      
      const sendResponse = (result: any) => {
        if (id !== undefined) {
          return res.status(200).json({ jsonrpc: "2.0", id, result });
        }
        return res.status(200).json(result);
      };

      if (method === 'initialize') {
        return sendResponse({ 
          protocolVersion: "2024-11-05", 
          capabilities: { tools: {}, prompts: {}, resources: {} }, 
          serverInfo: { name: "Echo Lantern MCP", version: "1.0.0" }
        });
      } else if (method === 'tools/list') {
        return sendResponse({ tools: TOOLS });
      } else if (method === 'tools/call') {
        const toolName = body.params?.name || 'tool';
        return sendResponse({ 
          content: [
            { type: "text", text: `Successfully executed ${toolName}` }
          ],
          isError: false
        });
      } else if (method === 'prompts/list') {
        return sendResponse({ prompts: [] });
      } else if (method === 'resources/list') {
        return sendResponse({ resources: [] });
      }

      return res.status(200).json({
        status: "success",
        message: "MCP command received",
        agent: "Echo Lantern Orchestrator",
        receivedAt: new Date().toISOString(),
        payload: body
      });
    } catch (error) {
      return res.status(400).json({ error: "Invalid MCP request" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
