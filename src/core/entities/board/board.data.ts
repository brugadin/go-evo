import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';

export interface BoardData {
    intersections: IntersectionData[];
    players: PlayerData[];
    currentPlayer: PlayerData;
}
