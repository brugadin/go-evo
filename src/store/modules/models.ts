export type PlayerColor = 'black' | 'white';

export interface Player {
    name: string;
    score: number;
    color: PlayerColor | null;
}

export interface Territory {
    id: number;
    owner: Player | null;
}

export interface Board {
    cellData: Territory[][];
}

export interface GameState {
    players: Player[];
    currentPlayer: Player | null;
    board: Board | null;
  }
