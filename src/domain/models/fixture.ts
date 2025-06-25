export interface FixtureTeam {
  id: number;
  name: string;
  logo: string;
  winner: boolean | null;
}

export interface FixtureScore {
  fulltime: { home: number | null; away: number | null };
  halftime: { home: number | null; away: number | null };
}

export interface FixtureDTO {
  fixtureId: number;
  date: string;
  venue: string;
  home: FixtureTeam;
  away: FixtureTeam;
  score: FixtureScore;
  status: string;
}
