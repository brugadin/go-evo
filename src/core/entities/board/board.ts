import { PlayerData } from '../player';
import {
  AdjacentIntersections,
  IntersectionData,
} from '../intersection';
import { BoardData } from './board.data';

export class Board implements BoardData {
    readonly intersections: IntersectionData[];

    readonly players: PlayerData[];

    readonly currentPlayer: PlayerData;

    constructor(data: BoardData) {
      this.intersections = data.intersections;
      this.players = data.players;
      this.currentPlayer = data.currentPlayer;
    }

    private getTerritoryByCoordinates = (
      row: number,
      column: number,
    ): IntersectionData | undefined => this.intersections.find(
      (intersection: IntersectionData) => intersection.column === column
      && intersection.row === row,
    );

    private getAdjacentIntersections = (
      intersection: IntersectionData,
    ): AdjacentIntersections => ({
      top: this.getTerritoryByCoordinates(intersection.row - 1, intersection.column),
      left: this.getTerritoryByCoordinates(intersection.row, intersection.column - 1),
      bottom: this.getTerritoryByCoordinates(intersection.row + 1, intersection.column),
      right: this.getTerritoryByCoordinates(intersection.row, intersection.column + 1),
    } as AdjacentIntersections);

    private getAdjacentIntersectionsList = (
      intersection: IntersectionData,
    ): IntersectionData[] => Object.values(this.getAdjacentIntersections(intersection))
      .filter(
        (filterTerritory: IntersectionData | undefined) => !!filterTerritory,
      ) as IntersectionData[];

    liberateIntersectionsById = (liberatedIntersectionsIds: number[]): IntersectionData[] => {
      const liberatedIntersections: IntersectionData[] = [];
      liberatedIntersectionsIds.forEach((id: number) => {
        const foundTerritory = this.intersections.find((item) => id === item.id);
        if (foundTerritory) {
          foundTerritory.owner = undefined;
          liberatedIntersections.push(foundTerritory);
        }
      });

      return liberatedIntersections;
    }

    getCapturedIntersectionsIds(
      intersection: IntersectionData,
    ): number[] {
      const neighbors = this.getAdjacentIntersectionsList(intersection);
      let capturedIntersections: IntersectionData[] = [];

      neighbors.forEach((neighborTerritory: IntersectionData) => {
        const neighborOwner = neighborTerritory.owner;
        if (!!neighborOwner && neighborOwner.id !== intersection.owner?.id) {
          const groupedItems = this.getGroup(neighborTerritory);
          if (groupedItems.liberties === 0) {
            capturedIntersections = capturedIntersections.concat(groupedItems.intersections);
          }
        }
      });
      return capturedIntersections
        .map((capturedTerritory: IntersectionData) => capturedTerritory.id);
    }

    getGroup = (
      intersection: IntersectionData,
    ): { liberties: number; intersections: IntersectionData[]} => {
      const visited: IntersectionData[] = [];
      const visitedList: IntersectionData[] = [];
      const queue: IntersectionData[] = [intersection];
      let count = 0;
      const ownerId = intersection.owner?.id;

      while (queue.length > 0) {
        // eslint-disable-next-line
        const currentTerritory = queue.pop()!;
        const hasVisited = visited.find(
          (visitedTerritory) => visitedTerritory.id === currentTerritory?.id,
        );
        // eslint-disable-next-line
        if (hasVisited) { continue; }

        const neighbors = this.getAdjacentIntersectionsList(currentTerritory);
        count += neighbors.filter((neighbor: IntersectionData) => !neighbor.owner).length;
        neighbors.forEach((neighbor: IntersectionData) => {
          if (neighbor.owner?.id === ownerId) { queue.push(neighbor); }
        });

        visited.push(currentTerritory);
        visitedList.push(currentTerritory);
      }

      return {
        liberties: count,
        intersections: visitedList,
      };
    };
}
