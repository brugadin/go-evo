import { PlayerData } from '../player';
import { TerritoryData } from '../territory';
import { BoardData } from './board.data';

export class Board implements BoardData {
    territories: TerritoryData[];

    players: PlayerData[];

    currentPlayer: PlayerData;

    constructor(data: BoardData) {
      this.territories = data.territories;
      this.players = data.players;
      this.currentPlayer = data.currentPlayer;
    }
}
