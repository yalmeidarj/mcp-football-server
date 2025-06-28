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
    this.registerListCountriesToolHandler();
    this.registerListSeasonsToolHandler();
    this.registerListLeaguesToolHandler();
    this.registerListTeamsToolHandler();
    this.registerGetTeamStatisticsToolHandler();
    this.registerGetSquadToolHandler();
    this.registerGetPlayerToolHandler();
    this.registerGetPlayerStatsToolHandler();
    this.registerGetFixturesByTeamToolHandler();
    this.registerGetFixturesByLeagueToolHandler();
    this.registerGetFixtureDetailsToolHandler();
    this.registerGetFixtureEventsToolHandler();
    this.registerGetFixtureLineupsToolHandler();
    this.registerGetFixtureStatisticsToolHandler();
    this.registerGetHeadToHeadToolHandler();
    this.registerGetInjuriesToolHandler();
    this.registerGetTransfersToolHandler();
    this.registerGetVenuesToolHandler();
    this.registerGetTrophiesToolHandler();
    this.registerGetCoachToolHandler();
    this.registerGetSidelinedToolHandler();
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
              text: JSON.stringify(fixtures),
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
        teamId: z.number().describe("ID do time"),
      },
      async ({ teamId }) => {
        const team = await this.footballService.getTeam(teamId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(team),
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
              text: JSON.stringify(standings),
            },
          ],
        };
      }
    );
  }

  /** ---- list-countries ---- */
  private registerListCountriesToolHandler(): void {
    this.server.tool(
      "list-countries",
      "Lista todos os países disponíveis",
      {}, // no parameters
      async () => {
        const countries = await this.footballService.listCountries();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(countries),
            },
          ],
        };
      }
    );
  }

  /** ---- list-seasons ---- */
  private registerListSeasonsToolHandler(): void {
    this.server.tool(
      "list-seasons",
      "Lista todas as temporadas suportadas pela API",
      {}, // no parameters
      async () => {
        const seasons = await this.footballService.listSeasons();
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(seasons),
            },
          ],
        };
      }
    );
  }

  /** ---- list-leagues ---- */
  private registerListLeaguesToolHandler(): void {
    this.server.tool(
      "list-leagues",
      "Lista todas as ligas e copas para um país e/ou temporada",
      {
        country: z.string().optional().describe("Nome do país (opcional)"),
        season: z.number().optional().describe("Ano da temporada (opcional)"),
      },
      async ({ country, season }) => {
        const leagues = await this.footballService.listLeagues(country, season);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(leagues),
            },
          ],
        };
      }
    );
  }

  /** ---- list-teams ---- */
  private registerListTeamsToolHandler(): void {
    this.server.tool(
      "list-teams",
      "Lista todos os times de uma liga em uma temporada",
      {
        leagueId: z.number().describe("ID da liga"),
        season: z.number().describe("Ano da temporada"),
      },
      async ({ leagueId, season }) => {
        const teams = await this.footballService.listTeams(leagueId, season);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(teams),
            },
          ],
        };
      }
    );
  }

  /** ---- get-team-statistics ---- */
  private registerGetTeamStatisticsToolHandler(): void {
    this.server.tool(
      "get-team-statistics",
      "Estatísticas de um time em uma liga na temporada",
      {
        leagueId: z.number().describe("ID da liga"),
        season: z.number().describe("Ano da temporada"),
        teamId: z.number().describe("ID do time"),
      },
      async ({ leagueId, season, teamId }) => {
        const stats = await this.footballService.getTeamStatistics(
          leagueId,
          season,
          teamId
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(stats),
            },
          ],
        };
      }
    );
  }

  /** ---- get-squad ---- */
  private registerGetSquadToolHandler(): void {
    this.server.tool(
      "get-squad",
      "Lista o elenco atual de um time",
      {
        teamId: z.number().describe("ID do time"),
      },
      async ({ teamId }) => {
        const squad = await this.footballService.getSquad(teamId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(squad),
            },
          ],
        };
      }
    );
  }

  /** ---- get-player ---- */
  private registerGetPlayerToolHandler(): void {
    this.server.tool(
      "get-player",
      "Informações básicas de um jogador pelo ID",
      {
        playerId: z.number().describe("ID do jogador"),
      },
      async ({ playerId }) => {
        const player = await this.footballService.getPlayer(playerId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(player),
            },
          ],
        };
      }
    );
  }

  /** ---- get-player-stats ---- */
  private registerGetPlayerStatsToolHandler(): void {
    this.server.tool(
      "get-player-stats",
      "Estatísticas de um jogador em uma temporada",
      {
        playerId: z.number().describe("ID do jogador"),
        season: z.number().describe("Ano da temporada"),
      },
      async ({ playerId, season }) => {
        const stats = await this.footballService.getPlayerStats(
          playerId,
          season
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(stats),
            },
          ],
        };
      }
    );
  }

  /** ---- get-fixtures-by-team ---- */
  private registerGetFixturesByTeamToolHandler(): void {
    this.server.tool(
      "get-fixtures-by-team",
      "Lista todas as partidas de um time em uma temporada",
      {
        teamId: z.number().describe("ID do time"),
        season: z.number().describe("Ano da temporada"),
        status: z.string().optional().describe("Status dos jogos (opcional)"),
      },
      async ({ teamId, season, status }) => {
        const fixtures = await this.footballService.getFixturesByTeam(
          teamId,
          season,
          status
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(fixtures),
            },
          ],
        };
      }
    );
  }

  /** ---- get-fixtures-by-league ---- */
  private registerGetFixturesByLeagueToolHandler(): void {
    this.server.tool(
      "get-fixtures-by-league",
      "Lista todas as partidas de uma liga em um intervalo de datas",
      {
        leagueId: z.number().describe("ID da liga"),
        from: z
          .string()
          .regex(/\d{4}-\d{2}-\d{2}/)
          .describe("Data de início (YYYY-MM-DD)"),
        to: z
          .string()
          .regex(/\d{4}-\d{2}-\d{2}/)
          .describe("Data de fim (YYYY-MM-DD)"),
      },
      async ({ leagueId, from, to }) => {
        const fixtures = await this.footballService.getFixturesByLeague(
          leagueId,
          from,
          to
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(fixtures),
            },
          ],
        };
      }
    );
  }

  /** ---- get-fixture-details ---- */
  private registerGetFixtureDetailsToolHandler(): void {
    this.server.tool(
      "get-fixture-details",
      "Detalhes básicos de uma partida",
      {
        fixtureId: z.number().describe("ID da partida"),
      },
      async ({ fixtureId }) => {
        const details = await this.footballService.getFixtureDetails(fixtureId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(details),
            },
          ],
        };
      }
    );
  }

  /** ---- get-fixture-events ---- */
  private registerGetFixtureEventsToolHandler(): void {
    this.server.tool(
      "get-fixture-events",
      "Eventos (gols, cartões, etc.) de uma partida",
      {
        fixtureId: z.number().describe("ID da partida"),
      },
      async ({ fixtureId }) => {
        const events = await this.footballService.getFixtureEvents(fixtureId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(events),
            },
          ],
        };
      }
    );
  }

  /** ---- get-fixture-lineups ---- */
  private registerGetFixtureLineupsToolHandler(): void {
    this.server.tool(
      "get-fixture-lineups",
      "Escalações (titulares e reservas) de uma partida",
      {
        fixtureId: z.number().describe("ID da partida"),
      },
      async ({ fixtureId }) => {
        const lineups = await this.footballService.getFixtureLineups(fixtureId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(lineups),
            },
          ],
        };
      }
    );
  }

  /** ---- get-fixture-statistics ---- */
  private registerGetFixtureStatisticsToolHandler(): void {
    this.server.tool(
      "get-fixture-statistics",
      "Estatísticas do jogo para cada equipe em uma partida",
      {
        fixtureId: z.number().describe("ID da partida"),
      },
      async ({ fixtureId }) => {
        const stats = await this.footballService.getFixtureStatistics(
          fixtureId
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(stats),
            },
          ],
        };
      }
    );
  }

  /** ---- get-head-to-head ---- */
  private registerGetHeadToHeadToolHandler(): void {
    this.server.tool(
      "get-head-to-head",
      "Histórico de confrontos diretos entre dois times",
      {
        teamId1: z.number().describe("ID do primeiro time"),
        teamId2: z.number().describe("ID do segundo time"),
      },
      async ({ teamId1, teamId2 }) => {
        const h2h = await this.footballService.getHeadToHead(teamId1, teamId2);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(h2h),
            },
          ],
        };
      }
    );
  }

  /** ---- get-injuries ---- */
  private registerGetInjuriesToolHandler(): void {
    this.server.tool(
      "get-injuries",
      "Lista os jogadores lesionados de um time (temporada opcional)",
      {
        teamId: z.number().describe("ID do time"),
        season: z.number().optional().describe("Ano da temporada (opcional)"),
      },
      async ({ teamId, season }) => {
        const injuries = await this.footballService.getInjuries(teamId, season);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(injuries),
            },
          ],
        };
      }
    );
  }

  /** ---- get-transfers ---- */
  private registerGetTransfersToolHandler(): void {
    this.server.tool(
      "get-transfers",
      "List transfers involving a team or a player",
      {
        teamId: z.number().optional().describe("Team ID (optional)"),
        playerId: z.number().optional().describe("Player ID (optional)"),
      },
      async ({ teamId, playerId }) => {
        if (!teamId && !playerId) {
          throw new Error("You must provide teamId or playerId");
        }
        const transfers = await this.footballService.getTransfers(
          teamId,
          playerId
        );
        return {
          content: [{ type: "text", text: JSON.stringify(transfers) }],
        };
      }
    );
  }

  /** ---- get-venues ---- */
  private registerGetVenuesToolHandler(): void {
    this.server.tool(
      "get-venues",
      "Stadium info by ID or name",
      {
        id: z.number().optional().describe("Venue ID (optional)"),
        name: z.string().optional().describe("Venue name (optional)"),
      },
      async ({ id, name }) => {
        if (!id && !name) {
          throw new Error("Provide id or name to search a venue");
        }
        const venues = await this.footballService.getVenues(id, name);
        return {
          content: [{ type: "text", text: JSON.stringify(venues) }],
        };
      }
    );
  }

  /** ---- get-trophies ---- */
  private registerGetTrophiesToolHandler(): void {
    this.server.tool(
      "get-trophies",
      "Trophies won by a team or a player",
      {
        teamId: z.number().optional().describe("Team ID (optional)"),
        playerId: z.number().optional().describe("Player ID (optional)"),
      },
      async ({ teamId, playerId }) => {
        if (!teamId && !playerId) {
          throw new Error("You must provide teamId or playerId");
        }
        const trophies = await this.footballService.getTrophies(
          teamId,
          playerId
        );
        return {
          content: [{ type: "text", text: JSON.stringify(trophies) }],
        };
      }
    );
  }

  /** ---- get-coach ---- */
  private registerGetCoachToolHandler(): void {
    this.server.tool(
      "get-coach",
      "Perfil e carreira de um técnico pelo ID",
      {
        coachId: z.number().describe("ID do técnico"),
      },
      async ({ coachId }) => {
        const coach = await this.footballService.getCoach(coachId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(coach),
            },
          ],
        };
      }
    );
  }

  /** ---- get-sidelined ---- */
  private registerGetSidelinedToolHandler(): void {
    this.server.tool(
      "get-sidelined",
      "Lista suspensões e punições de um time",
      {
        teamId: z.number().describe("ID do time"),
      },
      async ({ teamId }) => {
        const sidelined = await this.footballService.getSidelined(teamId);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(sidelined),
            },
          ],
        };
      }
    );
  }
}
