export interface TopScorerEntry {
  rank: number;
  player: { id: number; name: string };
  team: { id: number; name: string; logo: string };
  goals: number;
}

export interface TopScorersDTO {
  leagueId: number;
  season: number;
  scorers: TopScorerEntry[];
}
