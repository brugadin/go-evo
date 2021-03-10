import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/territory';

export interface BoardData {
    territories: IntersectionData[];
    players: PlayerData[];
    currentPlayer: PlayerData;
}
