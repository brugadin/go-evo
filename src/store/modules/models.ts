import { Player, Territory } from '@/core/models';

export interface GameState {
    players: Player[];
    territories: Territory[];
    currentPlayer?: Player;
  }
