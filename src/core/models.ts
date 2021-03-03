export type PlayerColor = 'black' | 'red';

export interface Player {
    name: string;
    score: number;
    color: PlayerColor;
}

export interface Territory {
    id: number;
    row: number;
    column: number;
    owner?: Player;
}

export interface AdjacentTerritories {
    top?: Territory;
    right?: Territory;
    bottom?: Territory;
    left?: Territory;
}

export interface TerritoryGroup {
    liberties: number;
    territories: Territory[];
  }
