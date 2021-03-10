import { Player } from '@/core/entities/player';

export interface IntersectionData {
    id: number;
    row: number;
    column: number;
    owner?: Player;
}

export interface AdjacentIntersections {
    top?: IntersectionData;
    right?: IntersectionData;
    bottom?: IntersectionData;
    left?: IntersectionData;
}
