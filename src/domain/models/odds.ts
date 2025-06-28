export interface OddValue {
  value: string;
  odd: string;
}

export interface BetOdds {
  id: number;
  name: string;
  values: OddValue[];
}

export interface BookmakerOdds {
  id: number;
  name: string;
  bets: BetOdds[];
}

export interface OddsDTO {
  fixtureId: number;
  leagueId: number;
  league: string;
  bookmakers: BookmakerOdds[];
}
