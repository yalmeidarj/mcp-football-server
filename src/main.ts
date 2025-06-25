
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { FootballToolsController } from "./interface/controllers/footballToolsController.js";
import { FootballApiService } from "./infrastructure/services/footballApiService.js";
import { FootballService } from "./application/services/footballService.js";


async function main() {
  const server = new McpServer({
    name: "football",
    version: "0.1.0",
    capabilities: {
      resources: {},
      tools: {}, // habilita registerTool()
    },
  });

  // injeta serviços e registra ferramentas
  const api = new FootballApiService();
  const footballService = new FootballService(api);
  new FootballToolsController(server, footballService);

  // transport stdio
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("⚽ MCP Football Server rodando em STDIO");
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
