import { PlayerColor } from '@/core/entities/player';

export type TerritoryOwner = PlayerColor | 'unknown' | 'neutral';

export interface TerritoryData {
  linkedIntersectionsIds: number[];
  owner: TerritoryOwner;
}
