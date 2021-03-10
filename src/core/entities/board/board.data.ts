import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';

export interface BoardData {
    territories: IntersectionData[];
    players: PlayerData[];
    currentPlayer: PlayerData;
}
