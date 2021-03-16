import { PlayerData } from '@/core/entities/player';

export interface IntersectionData {
    id: number;
    row: number;
    column: number;
    stoneOwner?: PlayerData;
    territoryOwner?: PlayerData;
}

export interface AdjacentIntersections {
    top?: IntersectionData;
    right?: IntersectionData;
    bottom?: IntersectionData;
    left?: IntersectionData;
}

export interface IntersectionGroupData {
    intersections: IntersectionData[];
    liberties: number;
}
