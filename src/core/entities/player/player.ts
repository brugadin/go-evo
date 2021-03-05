import { PlayerData, PlayerColor } from './player.model';

export class Player implements PlayerData {
    readonly id: number;

    readonly name: string;

    readonly score: number;

    readonly color: PlayerColor;

    constructor(data: PlayerData) {
      this.id = data.id;
      this.name = data.name;
      this.score = data.score;
      this.color = data.color;
    }
}
