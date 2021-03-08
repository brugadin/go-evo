import { TerritoryData } from '@/core/entities/territory';
import { PlayerData } from '@/core/entities/player';
import { BoardData } from '../entities/board/board.data';

export class BoardService {
    private readonly boardSize = 19;

    private readonly numberOfPlayers = 2;

    startGame = (): BoardData => {
      const players = this.generatePlayers();
      const territories = this.generateTerritories();
      const [currentPlayer] = players;
      return { territories, players, currentPlayer };
    }

    private generatePlayers = (): PlayerData[] => Array.from(
      Array(this.numberOfPlayers),
      (rowItem, playerNumber) => ({
        id: playerNumber, name: `Player ${playerNumber + 1}`, score: 0, color: playerNumber === 0 ? 'black' : 'red',
      }),
    );

    private generateTerritories = (): TerritoryData[] => Array.from(
      Array(this.boardSize),
      (rowItem, rowNumber) => Array.from(Array(this.boardSize),
        (columnItem, columnNumber) => ({
          id: (rowNumber * this.boardSize) + columnNumber, column: columnNumber, row: rowNumber,
        })),
    )
      .flat(1);
}
