import { FixtureDTO } from "../../domain/models/fixture.js";
import { TeamDTO } from "../../domain/models/team.js";
import { StandingsDTO, StandingRow } from "../../domain/models/standings.js";
import { CountryDTO } from "../../domain/models/country.js";
import { LeagueDTO } from "../../domain/models/league.js";
import { TeamStatisticsDTO } from "../../domain/models/teamStatistics.js";
import { PlayerDTO } from "../../domain/models/player.js";
import { PlayerStatsDTO } from "../../domain/models/playerStats.js";
import { EventDTO } from "../../domain/models/event.js";
import { LineupDTO } from "../../domain/models/lineup.js";
import { FixtureStatisticsDTO } from "../../domain/models/fixtureStatistics.js";
import { InjuryDTO } from "../../domain/models/injury.js";
import { SidelinedDTO } from "../../domain/models/sidelined.js";
import { TransferDTO } from "../../domain/models/transfer.js";
import { VenueDTO } from "../../domain/models/venue.js";
import { TrophyDTO } from "../../domain/models/trophy.js";
import { CoachDTO } from "../../domain/models/coach.js";

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

  async listCountries(): Promise<CountryDTO[]> {
    const data = await this.api.fetchCountries();
    return data.response.map((item: any) => ({
      name: item.name,
      code: item.code,
      flag: item.flag,
    })) as CountryDTO[];
  }

  async listSeasons(): Promise<number[]> {
    const data = await this.api.fetchSeasons();
    // Assuming response is an array of season years (numbers)
    return data.response as number[];
  }

  async listLeagues(country?: string, season?: number): Promise<LeagueDTO[]> {
    const data = await this.api.fetchLeagues(country, season);
    return data.response.map((item: any) => ({
      id: item.league.id,
      name: item.league.name,
      type: item.league.type,
      logo: item.league.logo,
      country: item.country.name,
      countryCode: item.country.code,
      countryFlag: item.country.flag,
    })) as LeagueDTO[];
  }

  async listTeams(leagueId: number, season: number): Promise<TeamDTO[]> {
    const data = await this.api.fetchTeamsByLeague(leagueId, season);
    return data.response.map((item: any) => ({
      id: item.team.id,
      name: item.team.name,
      code: item.team.code,
      country: item.team.country,
      founded: item.team.founded,
      logo: item.team.logo,
    })) as TeamDTO[];
  }

  async getTeamStatistics(
    leagueId: number,
    season: number,
    teamId: number
  ): Promise<TeamStatisticsDTO> {
    const data = await this.api.fetchTeamStatistics(leagueId, season, teamId);
    const stats = Array.isArray(data.response)
      ? data.response[0]
      : data.response;
    return {
      leagueId,
      season,
      teamId,
      form: stats.form,
      played: stats.fixtures.played.total,
      won: stats.fixtures.wins.total,
      draw: stats.fixtures.draws.total,
      lose:
        stats.fixtures.loses?.total ??
        stats.fixtures.loses ??
        stats.fixtures.lose.total,
      goalsFor: stats.goals.for.total.total,
      goalsAgainst: stats.goals.against.total.total,
    } as TeamStatisticsDTO;
  }

  async getSquad(teamId: number): Promise<PlayerDTO[]> {
    const data = await this.api.fetchSquad(teamId);
    const players = data.response[0].players;
    return players.map((p: any) => ({
      id: p.id,
      name: p.name,
      age: p.age ?? null,
      nationality: p.nationality ?? "",
      height: p.height ?? null,
      weight: p.weight ?? null,
      photo: p.photo,
      number: p.number ?? null,
      position: p.position ?? null,
    })) as PlayerDTO[];
  }

  async getPlayer(playerId: number): Promise<PlayerDTO> {
    // Use latest season data available (e.g., 2023) to get player info
    const data = await this.api.fetchPlayers({ id: playerId, season: 2023 });
    const entry = data.response[0];
    const info = entry.player;
    const firstStat = entry.statistics?.[0];
    return {
      id: info.id,
      name: info.name,
      age: info.age ?? null,
      nationality: info.nationality ?? "",
      height: info.height ?? null,
      weight: info.weight ?? null,
      photo: info.photo,
      number: firstStat?.games.number ?? null,
      position: firstStat?.games.position ?? null,
    } as PlayerDTO;
  }

  async getPlayerStats(
    playerId: number,
    season: number
  ): Promise<PlayerStatsDTO[]> {
    const data = await this.api.fetchPlayers({ id: playerId, season });
    // Flatten stats across possibly multiple teams/leagues
    const statsArray = data.response.flatMap((entry: any) =>
      entry.statistics.map((stat: any) => ({
        league: stat.league.name,
        team: stat.team.name,
        gamesPlayed: stat.games.appearances,
        goals: stat.goals.total,
        assists: stat.goals.assists ?? 0,
        yellow: stat.cards.yellow,
        red: stat.cards.red,
        rating: stat.games.rating ?? null,
      }))
    );
    return statsArray as PlayerStatsDTO[];
  }

  async getFixturesByTeam(
    teamId: number,
    season: number,
    status?: string
  ): Promise<FixtureDTO[]> {
    const data = await this.api.fetchFixturesByTeam(teamId, season, status);
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

  async getFixturesByLeague(
    leagueId: number,
    from: string,
    to: string
  ): Promise<FixtureDTO[]> {
    const data = await this.api.fetchFixturesByLeague(leagueId, from, to);
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

  async getFixtureDetails(fixtureId: number): Promise<FixtureDTO> {
    const data = await this.api.fetchFixture(fixtureId);
    const item = data.response[0];
    return {
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
    } as FixtureDTO;
  }

  async getFixtureEvents(fixtureId: number): Promise<EventDTO[]> {
    const data = await this.api.fetchFixtureEvents(fixtureId);
    return data.response.map((event: any) => ({
      time: { elapsed: event.time.elapsed, extra: event.time.extra ?? null },
      team: event.team.name,
      player: event.player.name,
      assist: event.assist?.name ? event.assist.name : null,
      type: event.type,
      detail: event.detail,
    })) as EventDTO[];
  }

  async getFixtureLineups(fixtureId: number): Promise<LineupDTO[]> {
    const data = await this.api.fetchFixtureLineups(fixtureId);
    return data.response.map((item: any) => ({
      team: item.team.name,
      formation: item.formation,
      coach: item.coach.name,
      lineup: item.startXI.map((p: any) => ({
        id: p.player.id,
        name: p.player.name,
        age: null,
        nationality: null,
        height: null,
        weight: null,
        photo: p.player.photo ?? "",
        number: p.player.number,
        position: p.player.pos,
      })) as PlayerDTO[],
      substitutes: item.substitutes.map((p: any) => ({
        id: p.player.id,
        name: p.player.name,
        age: null,
        nationality: null,
        height: null,
        weight: null,
        photo: p.player.photo ?? "",
        number: p.player.number,
        position: p.player.pos,
      })) as PlayerDTO[],
    })) as LineupDTO[];
  }

  async getFixtureStatistics(
    fixtureId: number
  ): Promise<FixtureStatisticsDTO[]> {
    const data = await this.api.fetchFixtureStatistics(fixtureId);
    return data.response.map((item: any) => {
      const stats: Record<string, number | string> = {};
      item.statistics.forEach((s: any) => {
        stats[s.type] = s.value;
      });
      return {
        team: item.team.name,
        statistics: stats,
      };
    }) as FixtureStatisticsDTO[];
  }

  async getHeadToHead(team1: number, team2: number): Promise<FixtureDTO[]> {
    const data = await this.api.fetchHeadToHead(team1, team2);
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

  async getInjuries(teamId: number, season?: number): Promise<InjuryDTO[]> {
    const data = await this.api.fetchInjuries(teamId, season);
    return data.response.map((item: any) => ({
      player: {
        id: item.player.id,
        name: item.player.name,
      },
      type: item.injury?.type ?? "Injury",
      detail: item.injury?.detail ?? item.reason ?? "",
      since: item.injury?.date ?? item.injury?.start_date ?? "",
      expectedReturn: item.injury?.end ?? item.injury?.end_date ?? null,
    })) as InjuryDTO[];
  }

  async getTransfers(
    teamId?: number,
    playerId?: number
  ): Promise<TransferDTO[]> {
    const data = await this.api.fetchTransfers(teamId, playerId);
    const entries: any[] = data.response;
    // Flatten all transfers
    const transfersList = entries.flatMap((item) =>
      item.transfers.map((t: any) => ({
        player: { id: item.player.id, name: item.player.name },
        from: { id: t.teams.out.id, name: t.teams.out.name },
        to: { id: t.teams.in.id, name: t.teams.in.name },
        date: t.date,
        type: t.type,
      }))
    );
    return transfersList as TransferDTO[];
  }

  async getVenues(id?: number, name?: string): Promise<VenueDTO[]> {
    const data = await this.api.fetchVenues(id, name);
    return data.response.map((item: any) => {
      const v = item.venue ?? item;
      return {
        id: v.id,
        name: v.name,
        address: v.address,
        city: v.city,
        capacity: v.capacity,
        surface: v.surface,
        image: v.image,
      };
    }) as VenueDTO[];
  }

  async getTrophies(teamId?: number, playerId?: number): Promise<TrophyDTO[]> {
    const data = await this.api.fetchTrophies(teamId, playerId);
    return data.response.map((item: any) => ({
      league: item.league.name,
      country: item.country?.name ?? "",
      team: item.team ? item.team.name : "",
      season: item.season,
      place:
        typeof item.place === "number"
          ? item.place === 1
            ? "Winner"
            : item.place === 2
            ? "Runner-up"
            : String(item.place)
          : item.place,
    })) as TrophyDTO[];
  }

  async getCoach(coachId: number): Promise<CoachDTO> {
    const data = await this.api.fetchCoach(coachId);
    const c = data.response[0];
    const coachName = c.name ?? `${c.firstname} ${c.lastname}`;
    return {
      id: c.id,
      name: coachName,
      age: c.age,
      nationality: c.nationality,
      photo: c.photo,
      career: c.career.map((job: any) => ({
        team: job.team.name,
        start: job.start,
        end: job.end ? job.end : "Present",
      })),
    } as CoachDTO;
  }

  async getSidelined(teamId: number): Promise<SidelinedDTO[]> {
    const data = await this.api.fetchSidelined(teamId);
    return data.response.map((item: any) => ({
      player: {
        id: item.player.id,
        name: item.player.name,
      },
      type: item.reason?.includes("Suspension")
        ? "Suspension"
        : item.reason
        ? "Other"
        : "Suspension",
      detail: item.reason ?? item.sidelined?.detail ?? "",
      since: item.sidelined?.start_date ?? null,
      expectedReturn: item.sidelined?.end_date ?? null,
    })) as SidelinedDTO[];
  }
}
