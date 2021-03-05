export type PlayerColor = 'black' | 'red';

export interface PlayerData {
    id: number;
    name: string;
    score: number;
    color: PlayerColor;
}
