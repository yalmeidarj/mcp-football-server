export interface TopAssistEntry {
  rank: number;
  player: { id: number; name: string };
  team: { id: number; name: string; logo: string };
  assists: number;
}

export interface TopAssistsDTO {
  leagueId: number;
  season: number;
  assists: TopAssistEntry[];
}
