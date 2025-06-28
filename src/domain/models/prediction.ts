export interface PredictionDTO {
  fixtureId: number;
  leagueId: number;
  league: string;
  winnerTeam: {
    id: number | null;
    name: string;
  };
  percent: {
    home: string;
    draw: string;
    away: string;
  };
  advice: string;
}
