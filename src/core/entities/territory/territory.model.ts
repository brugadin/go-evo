import { Player } from '@/core/entities/player';

export interface TerritoryData {
    id: number;
    row: number;
    column: number;
    owner?: Player;
}

export interface AdjacentTerritories {
    top?: TerritoryData;
    right?: TerritoryData;
    bottom?: TerritoryData;
    left?: TerritoryData;
}
