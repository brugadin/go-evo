import { Board } from '@/core/entities/board/board';
import { BoardData } from '@/core/entities/board/board.data';
import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';

export interface PlayResults {
  nextPlayer: PlayerData;
  intersections: IntersectionData[];
}

export class GameService {
    private readonly boardSize = 19;

    private readonly numberOfPlayers = 2;

    startGame = (): BoardData => {
      const players = this.generatePlayers();
      const intersections = this.generateIntersections();
      const [currentPlayer] = players;
      return { intersections, players, currentPlayer };
    }

    play = (territoryId: number, boardData: BoardData): PlayResults | undefined => {
      const board = new Board(boardData);

      const territory = board.intersections
        .find((item) => item?.id === territoryId && !item.owner) as IntersectionData;

      if (!board.currentPlayer || !territory) { return undefined; }

      territory.owner = board.currentPlayer;
      const capturedIntersectionsIds = board.getCapturedIntersectionsIds(territory);
      if (capturedIntersectionsIds.length === 0) {
        const isSuicidalMove = board.getGroup(territory).liberties === 0;
        if (isSuicidalMove) { return undefined; }
      }

      board.liberateIntersectionsById(capturedIntersectionsIds);
      const nextPlayer = this.getNextPlayer(board);
      return {
        nextPlayer,
        intersections: board.intersections,
      };
    }

    private generatePlayers = (): PlayerData[] => Array.from(
      Array(this.numberOfPlayers),
      (rowItem, playerNumber) => ({
        id: playerNumber, name: `Player ${playerNumber + 1}`, score: 0, color: playerNumber === 0 ? 'black' : 'red',
      }),
    );

    private generateIntersections = (): IntersectionData[] => Array.from(
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
