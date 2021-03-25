/* eslint-disable no-param-reassign */
import { MoveData } from '@/core/entities/move';
import { Board } from '@/core/entities/board/board';
import { BoardData } from '@/core/entities/board/board.model';
import { IntersectionData } from '@/core/entities/intersection';
import { PlayerData } from '@/core/entities/player';
import { TerritoryService } from './territory.service';

export interface PlayResults {
  nextPlayer: PlayerData;
  intersections: IntersectionData[];
  players: PlayerData[];
}

export class GameService {
    private readonly boardSize = 19;

    private readonly numberOfPlayers = 2;

    constructor(private territoryService: TerritoryService) {}

    startGame = (): BoardData => {
      const players = this.generatePlayers();
      const intersections = this.generateIntersections();
      const [currentPlayer] = players;
      return { intersections, players, currentPlayer };
    }

    play = (
      moveData: MoveData,
      boardData: BoardData,
      movesHistory: MoveData[],
    ): PlayResults | undefined => {
      const board = new Board(boardData);
      const intersection = board.intersections
        .find((item) => item?.id === moveData.intersectionId
        && !item.stoneOwner) as IntersectionData;

      if (this.isKo(moveData, movesHistory)) { return undefined; }

      intersection.stoneOwner = board.currentPlayer;
      const capturedIntersectionsIds = board.getCapturedIntersectionsIds(intersection);
      if (capturedIntersectionsIds.length === 0) {
        const isSuicidalMove = board.getIntersectionGroup(intersection).liberties === 0;
        if (isSuicidalMove) { return undefined; }
      }

      board.liberateIntersectionsById(capturedIntersectionsIds);
      if (this.canDetermineTerritory(board)) {
        this.territoryService.determineTerritoryOwners(board);
      }

      this.updatePlayersScore(board.intersections, board.players);
      return {
        nextPlayer: this.getNextPlayer(board.currentPlayer, board.players),
        intersections: board.intersections,
        players: board.players,
      };
    }

    passPlayerTurn = (
      currentPlayer: PlayerData,
      players: PlayerData[],
      moveHistory: MoveData[],
    ) => ({
      nextPlayer: this.getNextPlayer(currentPlayer, players),
      moveHistory: moveHistory.concat({ playerId: currentPlayer.id, intersectionId: -1 }),
    })

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

    private getNextPlayer = (
      currentPlayer: PlayerData,
      players: PlayerData[],
    ): PlayerData => {
      const playerIndex = players
        .findIndex((player: PlayerData) => (currentPlayer.name === player.name));
      return players[playerIndex + 1] || players[0];
    }

    private updatePlayersScore = (intersections: IntersectionData[], players: PlayerData[]) => {
      players.forEach((player: PlayerData) => {
        player.score = intersections.filter(
          (intersection) => intersection.territoryOwner?.id === player.id,
        ).length;
      });
    }

    private canDetermineTerritory = (
      board: Board,
    ): boolean => board.players.every((
      player: PlayerData,
    ) => board.intersections.some((
      intersection: IntersectionData,
    ) => intersection.stoneOwner?.id === player.id));

    private isKo = (
      moveData: MoveData,
      moveHistory: MoveData[],
    ): boolean => {
      const playerMoves = moveHistory.filter(
        (move) => move.playerId === moveData.playerId,
      );
      const lastMove = playerMoves.pop();
      const isKoMove = lastMove?.intersectionId === moveData.intersectionId;
      return isKoMove;
    }
}
