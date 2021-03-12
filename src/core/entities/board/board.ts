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

    getIntersectionById(
      id: number,
    ): IntersectionData | undefined {
      return this.intersections.find(
        (intersection: IntersectionData) => intersection.id === id,
      );
    }

    getAdjacentIntersectionsList(
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
          foundIntersection.stoneOwner = undefined;
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
        const neighborOwner = neighborIntersection.stoneOwner;
        if (!!neighborOwner && neighborOwner.id !== intersection.stoneOwner?.id) {
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
      const visitedList: IntersectionData[] = [];
      const queue: IntersectionData[] = [intersection];
      let count = 0;
      const ownerId = intersection.stoneOwner?.id;

      while (queue.length > 0) {
        // eslint-disable-next-line
        const currentIntersection = queue.pop()!;
        const hasVisited = visitedList.find(
          (visitedIntersection) => visitedIntersection.id === currentIntersection?.id,
        );
        // eslint-disable-next-line
        if (hasVisited) { continue; }

        const neighbors = this.getAdjacentIntersectionsList(currentIntersection);
        count += neighbors.filter((neighbor: IntersectionData) => !neighbor.stoneOwner).length;
        neighbors.forEach((neighbor: IntersectionData) => {
          if (neighbor.stoneOwner?.id === ownerId) { queue.push(neighbor); }
        });

        visitedList.push(currentIntersection);
      }

      return {
        liberties: count,
        intersections: visitedList,
      } as IntersectionGroup;
    }
}
