export interface SidelinedDTO {
  player: {
    id: number;
    name: string;
  };
  type: string;
  detail: string;
  since: string | null;
  expectedReturn: string | null;
}
