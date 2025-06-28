export interface TopYellowCardEntry {
  rank: number;
  player: { id: number; name: string };
  team: { id: number; name: string; logo: string };
  yellow: number;
}

export interface TopRedCardEntry {
  rank: number;
  player: { id: number; name: string };
  team: { id: number; name: string; logo: string };
  red: number;
}

export interface TopCardsDTO {
  leagueId: number;
  season: number;
  yellow: TopYellowCardEntry[];
  red: TopRedCardEntry[];
}
