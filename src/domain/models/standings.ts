export interface StandingRow {
  rank: number;
  team: { id: number; name: string; logo: string };
  points: number;
  goalsDiff: number;
  played: number;
  won: number;
  draw: number;
  lose: number;
}

export interface StandingsDTO {
  leagueId: number;
  season: number;
  rows: StandingRow[];
}
