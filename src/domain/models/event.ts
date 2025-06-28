export interface EventDTO {
  time: {
    elapsed: number;
    extra?: number | null;
  };
  team: string;
  player: string;
  assist?: string | null;
  type: string;
  detail: string;
}
