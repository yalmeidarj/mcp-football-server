import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { FootballService } from "../../application/services/footballService.js";

export class FootballToolsController {
  constructor(
    private server: McpServer,
    private footballService: FootballService
  ) {
    this.registerTools();
  }

  private registerTools(): void {
    this.registerGetFixturesByDateToolHandler();
    this.registerGetTeamToolHandler();
    this.registerGetStandingsToolHandler();
  }

  /** ---- get-fixtures-by-date ---- */
  private registerGetFixturesByDateToolHandler(): void {
    this.server.tool(
      "get-fixtures-by-date",
      "Lista todas as partidas de futebol em uma data (YYYY-MM-DD)",
      {
        date: z
          .string()
          .regex(/\d{4}-\d{2}-\d{2}/)
          .describe("Data no formato YYYY-MM-DD"),
      },
      async ({ date }) => {
        const fixtures = await this.footballService.getFixturesByDate(date);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(fixtures), // 👈 agora é texto
            },
          ],
        };
      }
    );
  }

  /** ---- get-team ---- */
  private registerGetTeamToolHandler(): void {
    this.server.tool(
      "get-team",
      "Informações básicas de um time pelo ID",
      {
        teamId: z.number().describe("ID numérico do time"),
      },
      async ({ teamId }) => {
        const team = await this.footballService.getTeam(teamId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(team), // 👈 também texto
            },
          ],
        };
      }
    );
  }

  /** ---- get-standings ---- */
  private registerGetStandingsToolHandler(): void {
    this.server.tool(
      "get-standings",
      "Classificação de uma liga por temporada",
      {
        leagueId: z.number().describe("ID da liga"),
        season: z.number().describe("Ano da temporada (ex.: 2024)"),
      },
      async ({ leagueId, season }) => {
        const standings = await this.footballService.getStandings(
          leagueId,
          season
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(standings), // 👈 idem
            },
          ],
        };
      }
    );
  }
}
