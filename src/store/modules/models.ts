import { Store } from 'vuex';
import { PlayerData } from '@/core/entities/player';
import { TerritoryData } from '@/core/entities/territory';

// eslint-disable-next-line
export interface RootState {}

export interface GameState {
  players: PlayerData[];
  territories: TerritoryData[];
  currentPlayer?: PlayerData;
}

export interface AppState extends RootState {
  game: GameState;
}

export type AppStore = Store<AppState | {}>

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
