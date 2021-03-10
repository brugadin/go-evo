import { IntersectionData, IntersectionGroup } from '@/core/entities/intersection';
import { Board } from '@/core/entities/board';

export class TerritoryService {
    getTerritories = (board: Board): void => {
      const ownedGroups = this.getAllGroups(board);
      console.log(ownedGroups);
      this.getAllTerritoriesGroup(board, ownedGroups);
    }

    private getAllTerritoriesGroup(board: Board, ownedGroups: IntersectionGroup[]): void {
      let blackPoints = 0;
      board.intersections.forEach((intersection: IntersectionData) => {
        if (!this.isIntersectionInGroups(intersection, ownedGroups)) {
          let rightTerritory = board.getAdjacentIntersections(intersection).right;
          let groupIndex = -1;
          while (rightTerritory && groupIndex === -1) {
            groupIndex = this.groupIndexOf(rightTerritory, ownedGroups);
            if (groupIndex !== -1) {
              const isInside = this.isInsideInterceptionGroup(
                intersection,
                ownedGroups[groupIndex].intersections,
                board,
              );

              if (isInside) {
                blackPoints += 1;
                console.log('intersection', intersection);
              }
              blackPoints = isInside ? blackPoints += 1 : blackPoints;
            }

            rightTerritory = board.getAdjacentIntersections(rightTerritory).right;
          }
        }
      });

      console.log('leaving getAllTerritoriesGroup', blackPoints);
    }

    // getCapturedIntersectionsIds(
    //   intersection: IntersectionData,
    // ): number[] {
    //   const neighbors = this.getAdjacentIntersectionsList(intersection);
    //   let capturedIntersections: IntersectionData[] = [];

    //   neighbors.forEach((neighborIntersection: IntersectionData) => {
    //     const neighborOwner = neighborIntersection.owner;
    //     if (!!neighborOwner && neighborOwner.id !== intersection.owner?.id) {
    //       const groupedItems = this.getIntersectionGroup(neighborIntersection);
    //       if (groupedItems.liberties === 0) {
    //         capturedIntersections = capturedIntersections.concat(groupedItems.intersections);
    //       }
    //     }
    //   });
    //   return capturedIntersections
    //     .map((capturedIntersection: IntersectionData) => capturedIntersection.id);
    // }

    private getAllGroups(board: Board): IntersectionGroup[] {
      const intersectionGroups: IntersectionGroup[] = [];
      const ownedIntersections = this.getOwnedIntersections(board.intersections);
      ownedIntersections.forEach((intersection: IntersectionData) => {
        if (!this.isIntersectionInGroups(intersection, intersectionGroups)) {
          const intersectionGroupData = board.getIntersectionGroup(intersection);
          intersectionGroups.push(new IntersectionGroup(intersectionGroupData));
        }
      });

      return intersectionGroups;
    }

    private getOwnedIntersections = (
      intersections: IntersectionData[],
    ): IntersectionData[] => (intersections
      .filter((intersection: IntersectionData) => intersection.owner))

    private isIntersectionInGroups = (
      intersection: IntersectionData,
      intersectionGroups: IntersectionGroup[],
    ): boolean => (intersectionGroups
      .some((group: IntersectionGroup) => group.isIntersectionInGroup(intersection)))

      private groupIndexOf = (
        intersection: IntersectionData,
        intersectionGroups: IntersectionGroup[],
      ): number => (intersectionGroups
        .findIndex((group: IntersectionGroup) => group.isIntersectionInGroup(intersection)))

    private isInsideInterceptionGroup = (
      intersection: IntersectionData,
      intersectionGroup: IntersectionData[],
      board: Board,
    ): boolean => {
      let rightTerritory = board.getAdjacentIntersections(intersection).right;
      let intersectionFound = 0;
      let isSameBorder = false;
      while (rightTerritory) {
        const foundBorder = intersectionGroup
          .find(
            // eslint-disable-next-line
              (perimeterTerritory: IntersectionData) => perimeterTerritory.id === rightTerritory?.id
          );

        if (foundBorder && !isSameBorder) {
          intersectionFound += 1;
          isSameBorder = true;
        } else if (!foundBorder && isSameBorder) {
          isSameBorder = false;
        }

        rightTerritory = board.getAdjacentIntersections(rightTerritory).right;
      }
      return intersectionFound !== 0 && intersectionFound % 2 !== 0;
    }
}
