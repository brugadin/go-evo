import { Board } from '@/core/entities/board/board';
import { BoardData } from '@/core/entities/board/board.data';
import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/territory';

export interface PlayResults {
  nextPlayer: PlayerData;
  territories: IntersectionData[];
}

export class GameService {
    private readonly boardSize = 19;

    private readonly numberOfPlayers = 2;

    startGame = (): BoardData => {
      const players = this.generatePlayers();
      const territories = this.generateTerritories();
      const [currentPlayer] = players;
      return { territories, players, currentPlayer };
    }

    play = (territoryId: number, boardData: BoardData): PlayResults | undefined => {
      const board = new Board(boardData);

      const territory = board.territories
        .find((item) => item?.id === territoryId && !item.owner) as IntersectionData;

      if (!board.currentPlayer || !territory) { return undefined; }

      territory.owner = board.currentPlayer;
      const capturedTerritoriesIds = board.getCapturedTerritoriesIds(territory);
      if (capturedTerritoriesIds.length === 0) {
        const isSuicidalMove = board.getGroup(territory).liberties === 0;
        if (isSuicidalMove) { return undefined; }
      }

      board.liberateTerritoriesById(capturedTerritoriesIds);
      const nextPlayer = this.getNextPlayer(board);
      return {
        nextPlayer,
        territories: board.territories,
      };
    }

    private generatePlayers = (): PlayerData[] => Array.from(
      Array(this.numberOfPlayers),
      (rowItem, playerNumber) => ({
        id: playerNumber, name: `Player ${playerNumber + 1}`, score: 0, color: playerNumber === 0 ? 'black' : 'red',
      }),
    );

    private generateTerritories = (): IntersectionData[] => Array.from(
      Array(this.boardSize),
      (rowItem, rowNumber) => Array.from(Array(this.boardSize),
        (columnItem, columnNumber) => ({
          id: (rowNumber * this.boardSize) + columnNumber, column: columnNumber, row: rowNumber,
        })),
    )
      .flat(1);

    private getNextPlayer = (board: Board): PlayerData => {
      const playerIndex = board.players
        .findIndex((player: PlayerData) => (board.currentPlayer.name === player.name));
      return board.players[playerIndex + 1] || board.players[0];
    }
}
