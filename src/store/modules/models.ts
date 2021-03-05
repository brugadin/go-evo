import { PlayerData } from '@/core/entities/player';
import { TerritoryData } from '@/core/entities/territory';

export interface GameState {
    players: PlayerData[];
    territories: TerritoryData[];
    currentPlayer?: PlayerData;
  }

export interface StartGamePayload {
  territories: TerritoryData[];
  players: PlayerData[];
  currentPlayer: PlayerData;
}

export interface ClaimTerritoryPayload {
  territoryId: number;
  currentPlayer: PlayerData;
  nextPlayer: PlayerData;
  capturedTerritoriesIds: number[];
}
