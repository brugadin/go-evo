import { Player } from '../player';
import { IntersectionData } from './intersection.model';

export class Intersection implements IntersectionData {
    readonly id: number;

    readonly row: number;

    readonly column: number;

    readonly stoneOwner?: Player;

    constructor(data: IntersectionData) {
      this.id = data.id;
      this.row = data.row;
      this.column = data.column;
      this.stoneOwner = data.stoneOwner;
    }
}
