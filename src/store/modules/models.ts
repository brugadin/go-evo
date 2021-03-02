import { Board } from '@/core/board';
import { Player } from '@/core/models';

export interface GameState {
    players: Player[];
    currentPlayer?: Player;
    board?: Board;
  }
