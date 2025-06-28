# MCP Football Server

**MCP Football Server** is a lightweight [Model Context Protocol](https://github.com/modelcontextprotocol) (MCP) tool server that provides football (soccer) data to clients and AI assistants via API-Football. Designed for sports analysts and general users, it enables real-time access to fixtures, standings, teams, players, and more.

## Features
MCP Football Server exposes a suite of tools that an AI or application can call to fetch football data. Key features include:

- Fixtures by date  
- League standings  
- Team and player info  
- Transfers, injuries, head-to-head  
- Easy integration with MCP clients

## Setup (Local Server)

1. **Clone & install dependencies**  
   ```bash
   git clone https://github.com/yalmeidarj/mcp-football-server.git
   cd mcp-football-server
   npm install
   ```

2. **Start in development**  
   ```bash
   npm run dev
   ```

3. **Or build for production**  
   ```bash
   npm run build
   npm start
   ```

The server communicates via STDIN/STDOUT using MCP JSON-RPC.
The build step transpiles source files into the build/ directory, and npm start runs the compiled server
GitHub.
After building, you can also use the football command (defined as a binary in the package) to start the server
GitHub.

## Client Setup (Claude Desktop)

To use with Claude Desktop:

- Add the following to your `claude_desktop_config.json`:
  ```json
  {
    "mcpServers": {
      "football": {
        "command": "node",
        "args": ["<path_to>/build/main.js"],
        "env": {
          "RAPIDAPI_KEY": "<your_rapidapi_key>",
          "RAPIDAPI_HOST": "api-football-v1.p.rapidapi.com"
        }
      }
    }
  }
  ```

Claude will launch the server automatically and use its tools for football-related queries.

## Tech Stack

- **Node.js** + **TypeScript**
- **MCP SDK** for stdio-based tool serving
- **node-fetch** for API calls
- **Zod** for parameter validation

## License

Released under the ISC License.

---