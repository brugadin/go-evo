import { PlayerData } from '@/core/entities/player';
import { TerritoryData } from '@/core/entities/territory';

export interface BoardData {
    territories: TerritoryData[];
    players: PlayerData[];
    currentPlayer: PlayerData;
}
