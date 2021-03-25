import { Store } from 'vuex';
import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';
import { MoveData } from '@/core/entities/move';

// eslint-disable-next-line
export interface RootState {}

export interface GameState {
  currentPlayer?: PlayerData;
  intersections: IntersectionData[];
  moveHistory: MoveData[];
  players: PlayerData[];
}

export interface AppState extends RootState {
  game: GameState;
}

export type AppStore = Store<AppState | {}>

export interface StartGamePayload {
  intersections: IntersectionData[];
  players: PlayerData[];
  currentPlayer: PlayerData;
}

export interface ClaimIntersectionPayload {
  nextPlayer: PlayerData;
  intersections: IntersectionData[];
  players: PlayerData[];
  moveHistory: MoveData[];
}
