import { FixtureDTO } from "../../domain/models/fixture.js";
import { TeamDTO } from "../../domain/models/team.js";
import { StandingsDTO, StandingRow } from "../../domain/models/standings.js";

import { FootballApiService } from "../../infrastructure/services/footballApiService.js";

export class FootballService {
  constructor(private api: FootballApiService = new FootballApiService()) {}

  async getFixturesByDate(date: string): Promise<FixtureDTO[]> {
    const data = await this.api.fetchFixturesByDate(date);
    return data.response.map((item: any) => ({
      fixtureId: item.fixture.id,
      date: item.fixture.date,
      venue: item.fixture.venue.name,
      home: {
        id: item.teams.home.id,
        name: item.teams.home.name,
        logo: item.teams.home.logo,
        winner: item.teams.home.winner,
      },
      away: {
        id: item.teams.away.id,
        name: item.teams.away.name,
        logo: item.teams.away.logo,
        winner: item.teams.away.winner,
      },
      score: {
        fulltime: item.score.fulltime,
        halftime: item.score.halftime,
      },
      status: item.fixture.status.short,
    })) as FixtureDTO[];
  }

  async getTeam(teamId: number): Promise<TeamDTO> {
    const data = await this.api.fetchTeam(teamId);
    const t = data.response[0].team;
    return {
      id: t.id,
      name: t.name,
      code: t.code,
      country: t.country,
      founded: t.founded,
      logo: t.logo,
    };
  }

  async getStandings(leagueId: number, season: number): Promise<StandingsDTO> {
    const data = await this.api.fetchStandings(leagueId, season);
    const list = data.response[0].league;
    const rows: StandingRow[] = list.standings[0].map((row: StandingRow) => ({
      rank: row.rank,
      team: { id: row.team.id, name: row.team.name, logo: row.team.logo },
      points: row.points,
      goalsDiff: row.goalsDiff,
      played: row.played,
      won: row.won,
      draw: row.draw,
      lose: row.lose,
    }));
    return {
      leagueId,
      season,
      rows,
    };
  }
  
}
