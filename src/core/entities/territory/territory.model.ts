import { IntersectionData } from '@/core/entities/intersection';
import { PlayerColor } from '@/core/entities/player';

export type TerritoryOwner = PlayerColor | 'unknown' | 'neutral';

export interface TerritoryData {
  intersections: IntersectionData[];
  owner: TerritoryOwner;
}
