import { Player, Territory } from '@/core/models';

export interface GameState {
    players: Player[];
    territories: Territory[];
    currentPlayer?: Player;
  }

export interface StartGamePayload {
  territories: Territory[];
  players: Player[];
  currentPlayer: Player;
}

export interface ClaimTerritoryPayload {
  territoryId: number;
  currentPlayer: Player;
  nextPlayer: Player;
  capturedTerritoriesIds: number[];
}
