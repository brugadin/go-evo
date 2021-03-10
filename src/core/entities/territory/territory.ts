/* eslint-disable no-underscore-dangle */
import { IntersectionData } from '@/core/entities/intersection';
import { TerritoryData, TerritoryOwner } from './territory.model';

export class Territory implements TerritoryData {
    readonly intersections: IntersectionData[];

    private _owner: TerritoryOwner;

    isRoot = false;

    constructor(data: TerritoryData) {
      this.intersections = data.intersections;
      this._owner = data.owner;
    }

    get owner(): TerritoryOwner {
      return this._owner;
    }

    set owner(territoryOwner: TerritoryOwner) {
      if (this._owner !== 'neutral') {
        if (this._owner === 'unknown') {
          this._owner = territoryOwner;
        } else if (this._owner !== territoryOwner) {
          this._owner = 'neutral';
        }
      }
    }

    isInTerritory = (
      intersection: IntersectionData,
    ): boolean => this.intersections.findIndex((item) => item.id === intersection.id) !== -1
}
