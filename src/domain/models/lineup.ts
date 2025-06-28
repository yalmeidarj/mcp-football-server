import { PlayerDTO } from "./player.js";

export interface LineupDTO {
  team: string;
  formation: string;
  coach: string;
  lineup: PlayerDTO[];
  substitutes: PlayerDTO[];
}
