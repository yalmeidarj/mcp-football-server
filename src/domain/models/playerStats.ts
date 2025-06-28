export interface PlayerStatsDTO {
  league: string;
  team: string;
  gamesPlayed: number;
  goals: number;
  assists: number;
  yellow: number;
  red: number;
  rating: string | null;
}
