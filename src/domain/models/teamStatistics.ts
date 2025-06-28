export interface TeamStatisticsDTO {
  leagueId: number;
  season: number;
  teamId: number;
  form: string;
  played: number;
  won: number;
  draw: number;
  lose: number;
  goalsFor: number;
  goalsAgainst: number;
}
