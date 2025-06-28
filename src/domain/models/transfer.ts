export interface TransferDTO {
  player: {
    id: number;
    name: string;
  };
  from: {
    id: number;
    name: string;
  };
  to: {
    id: number;
    name: string;
  };
  date: string;
  type: string;
}
