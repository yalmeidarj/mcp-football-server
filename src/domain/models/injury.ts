export interface InjuryDTO {
  player: {
    id: number;
    name: string;
  };
  type: string;
  detail: string;
  since: string;
  expectedReturn: string | null;
}
