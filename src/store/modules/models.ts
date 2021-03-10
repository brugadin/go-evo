import { Store } from 'vuex';
import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';

// eslint-disable-next-line
export interface RootState {}

export interface GameState {
  players: PlayerData[];
  territories: IntersectionData[];
  currentPlayer?: PlayerData;
}

export interface AppState extends RootState {
  game: GameState;
}

export type AppStore = Store<AppState | {}>

export interface StartGamePayload {
  territories: IntersectionData[];
  players: PlayerData[];
  currentPlayer: PlayerData;
}

export interface ClaimTerritoryPayload {
  nextPlayer: PlayerData;
  territories: IntersectionData[];
}
