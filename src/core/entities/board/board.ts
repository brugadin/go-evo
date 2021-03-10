import {
  IntersectionGroup,
  AdjacentIntersections,
  IntersectionData,
} from '@/core/entities/intersection';
import { PlayerData } from '../player';

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

    private getIntersectionByCoordinates(
      row: number,
      column: number,
    ): IntersectionData | undefined {
      return this.intersections.find(
        (intersection: IntersectionData) => intersection.column === column
      && intersection.row === row,
      );
    }

    private getAdjacentIntersectionsList(
      intersection: IntersectionData,
    ): IntersectionData[] {
      return Object.values(this.getAdjacentIntersections(intersection))
        .filter(
          (filterIntersection: IntersectionData | undefined) => !!filterIntersection,
        ) as IntersectionData[];
    }

    getAdjacentIntersections(
      intersection: IntersectionData,
    ): AdjacentIntersections {
      return {
        top: this.getIntersectionByCoordinates(intersection.row - 1, intersection.column),
        left: this.getIntersectionByCoordinates(intersection.row, intersection.column - 1),
        bottom: this.getIntersectionByCoordinates(intersection.row + 1, intersection.column),
        right: this.getIntersectionByCoordinates(intersection.row, intersection.column + 1),
      } as AdjacentIntersections;
    }

    liberateIntersectionsById(liberatedIntersectionsIds: number[]): IntersectionData[] {
      const liberatedIntersections: IntersectionData[] = [];
      liberatedIntersectionsIds.forEach((id: number) => {
        const foundIntersection = this.intersections.find((item) => id === item.id);
        if (foundIntersection) {
          foundIntersection.owner = undefined;
          liberatedIntersections.push(foundIntersection);
        }
      });

      return liberatedIntersections;
    }

    getCapturedIntersectionsIds(
      intersection: IntersectionData,
    ): number[] {
      const neighbors = this.getAdjacentIntersectionsList(intersection);
      let capturedIntersections: IntersectionData[] = [];

      neighbors.forEach((neighborIntersection: IntersectionData) => {
        const neighborOwner = neighborIntersection.owner;
        if (!!neighborOwner && neighborOwner.id !== intersection.owner?.id) {
          const groupedItems = this.getIntersectionGroup(neighborIntersection);
          if (groupedItems.liberties === 0) {
            capturedIntersections = capturedIntersections.concat(groupedItems.intersections);
          }
        }
      });
      return capturedIntersections
        .map((capturedIntersection: IntersectionData) => capturedIntersection.id);
    }

    getIntersectionGroup(
      intersection: IntersectionData,
    ): IntersectionGroup {
      const visited: IntersectionData[] = [];
      const visitedList: IntersectionData[] = [];
      const queue: IntersectionData[] = [intersection];
      let count = 0;
      const ownerId = intersection.owner?.id;

      while (queue.length > 0) {
        // eslint-disable-next-line
        const currentIntersection = queue.pop()!;
        const hasVisited = visited.find(
          (visitedIntersection) => visitedIntersection.id === currentIntersection?.id,
        );
        // eslint-disable-next-line
        if (hasVisited) { continue; }

        const neighbors = this.getAdjacentIntersectionsList(currentIntersection);
        count += neighbors.filter((neighbor: IntersectionData) => !neighbor.owner).length;
        neighbors.forEach((neighbor: IntersectionData) => {
          if (neighbor.owner?.id === ownerId) { queue.push(neighbor); }
        });

        visited.push(currentIntersection);
        visitedList.push(currentIntersection);
      }

      return {
        liberties: count,
        intersections: visitedList,
      } as IntersectionGroup;
    }
}
