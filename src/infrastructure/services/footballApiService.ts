import fetch from "node-fetch";

import * as dotenv from "dotenv";
dotenv.config();

const BASE_URL = "https://api-football-v1.p.rapidapi.com/v3";
const HEADERS = {
  "X-RapidAPI-Key": process.env.RAPIDAPI_KEY ?? "",
  "X-RapidAPI-Host":
    process.env.RAPIDAPI_HOST ?? "api-football-v1.p.rapidapi.com",
};

export class FootballApiService {
  // ⬇️⬇️⬇️  GENERIC + CAST  ⬇️⬇️⬇️
  private async get<T = any>(
    path: string,
    params: Record<string, string | number>
  ): Promise<T> {
    const url = new URL(BASE_URL + path);
    Object.entries(params).forEach(([k, v]) =>
      url.searchParams.append(k, String(v))
    );

    const res = await fetch(url.toString(), { headers: HEADERS });
    if (!res.ok) {
      throw new Error(`API-Football error ${res.status}: ${await res.text()}`);
    }

    // Response.json() agora é unknown -> convertemos p/ T
    return (await res.json()) as T;
  }

  /* -------- wrappers -------- */
  fetchFixturesByDate<T = any>(date: string) {
    return this.get<T>("/fixtures", { date });
  }

  fetchTeam<T = any>(teamId: number) {
    return this.get<T>("/teams", { id: teamId });
  }

  fetchStandings<T = any>(leagueId: number, season: number) {
    return this.get<T>("/standings", { league: leagueId, season });
  }

  fetchCountries<T = any>() {
    return this.get<T>("/countries", {});
  }

  fetchSeasons<T = any>() {
    return this.get<T>("/seasons", {});
  }

  fetchLeagues<T = any>(country?: string, season?: number) {
    const params: Record<string, string | number> = {};
    if (country) params.country = country;
    if (season) params.season = season;
    return this.get<T>("/leagues", params);
  }

  fetchTeamsByLeague<T = any>(leagueId: number, season: number) {
    return this.get<T>("/teams", { league: leagueId, season });
  }

  fetchTeamStatistics<T = any>(
    leagueId: number,
    season: number,
    teamId: number
  ) {
    return this.get<T>("/teams/statistics", {
      league: leagueId,
      season,
      team: teamId,
    });
  }

  fetchSquad<T = any>(teamId: number) {
    return this.get<T>("/players/squads", { team: teamId });
  }

  fetchPlayers<T = any>(params: Record<string, string | number>) {
    return this.get<T>("/players", params);
  }

  fetchFixturesByTeam<T = any>(
    teamId: number,
    season: number,
    status?: string
  ) {
    const params: Record<string, string | number> = { team: teamId, season };
    if (status) params.status = status;
    return this.get<T>("/fixtures", params);
  }

  fetchFixturesByLeague<T = any>(leagueId: number, from: string, to: string) {
    return this.get<T>("/fixtures", { league: leagueId, from, to });
  }

  fetchFixture<T = any>(fixtureId: number) {
    return this.get<T>("/fixtures", { id: fixtureId });
  }

  fetchFixtureEvents<T = any>(fixtureId: number) {
    return this.get<T>("/fixtures/events", { fixture: fixtureId });
  }

  fetchFixtureLineups<T = any>(fixtureId: number) {
    return this.get<T>("/fixtures/lineups", { fixture: fixtureId });
  }

  fetchFixtureStatistics<T = any>(fixtureId: number) {
    return this.get<T>("/fixtures/statistics", { fixture: fixtureId });
  }

  fetchHeadToHead<T = any>(team1: number, team2: number) {
    return this.get<T>("/fixtures/headtohead", { h2h: `${team1}-${team2}` });
  }

  fetchInjuries<T = any>(teamId: number, season?: number) {
    const params: Record<string, string | number> = { team: teamId };
    if (season) params.season = season;
    return this.get<T>("/injuries", params);
  }

  fetchTransfers<T = any>(teamId?: number, playerId?: number) {
    const params: Record<string, string | number> = {};
    if (teamId) params.team = teamId;
    if (playerId) params.player = playerId;
    return this.get<T>("/transfers", params);
  }

  fetchVenues<T = any>(id?: number, name?: string) {
    const params: Record<string, string | number> = {};
    if (id) params.id = id;
    if (name) params.name = name;
    return this.get<T>("/venues", params);
  }

  fetchTrophies<T = any>(teamId?: number, playerId?: number) {
    const params: Record<string, string | number> = {};
    if (teamId) params.team = teamId;
    if (playerId) params.player = playerId;
    return this.get<T>("/trophies", params);
  }

  fetchCoach<T = any>(coachId: number) {
    return this.get<T>("/coachs", { id: coachId });
  }

  fetchSidelined<T = any>(teamId: number) {
    return this.get<T>("/sidelined", { team: teamId });
  }
}
