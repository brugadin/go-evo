import { Board } from '@/core/entities/board/board';
import { BoardData } from '@/core/entities/board/board.data';
import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';
import { TerritoryService } from './territory.service';
import mockData from './tmpTerritories';

export interface PlayResults {
  nextPlayer: PlayerData;
  intersections: IntersectionData[];
}

export class GameService {
    private readonly boardSize = 19;

    private readonly numberOfPlayers = 2;

    constructor(private territoryService: TerritoryService) {}

    startGame = (): BoardData => {
      const players = this.generatePlayers();
      // const intersections = this.generateIntersections();
      const { intersections } = mockData;
      const [currentPlayer] = players;
      return { intersections, players, currentPlayer };
    }

    play = (intersectionId: number, boardData: BoardData): PlayResults | undefined => {
      const board = new Board(boardData);
      this.territoryService.getTerritories(board);
      return undefined;
      // const intersection = board.intersections
      //   .find((item) => item?.id === intersectionId && !item.owner) as IntersectionData;

      // if (!board.currentPlayer || !intersection) { return undefined; }

      // intersection.owner = board.currentPlayer;
      // const capturedIntersectionsIds = board.getCapturedIntersectionsIds(intersection);
      // if (capturedIntersectionsIds.length === 0) {
      //   const isSuicidalMove = board.getIntersectionGroup(intersection).liberties === 0;
      //   if (isSuicidalMove) { return undefined; }
      // }

      // board.liberateIntersectionsById(capturedIntersectionsIds);
      // const nextPlayer = this.getNextPlayer(board);
      // return {
      //   nextPlayer,
      //   intersections: board.intersections,
      // };
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
