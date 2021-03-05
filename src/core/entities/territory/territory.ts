import { Player } from '../player';
import { TerritoryData } from './territory.model';

export class Territory implements TerritoryData {
    readonly id: number;

    readonly row: number;

    readonly column: number;

    readonly owner?: Player;

    constructor(data: TerritoryData) {
      this.id = data.id;
      this.row = data.row;
      this.column = data.column;
      this.owner = data.owner;
    }
}
