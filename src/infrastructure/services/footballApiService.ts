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
}
