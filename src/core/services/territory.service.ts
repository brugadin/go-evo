import { IntersectionData, IntersectionGroup } from '@/core/entities/intersection';
import { Board } from '@/core/entities/board';

export class TerritoryService {
    getTerritories = (board: Board): void => {
      const allIntersections = board.intersections;
    }

    getAllGroups(board: Board): IntersectionGroup[] {
      const intersectionGroups: IntersectionGroup[] = [];
      board.intersections.forEach((intersection: IntersectionData) => {
        if (!this.isIntersectionInGroups(intersection, intersectionGroups)) {
          const intersectionGroupData = board.getIntersectionGroup(intersection);
          intersectionGroups.push(new IntersectionGroup(intersectionGroupData));
        }
      });

      return intersectionGroups;
    }

    private isIntersectionInGroups = (
      intersection: IntersectionData,
      intersectionGroups: IntersectionGroup[],
    ): boolean => (intersectionGroups
      .some((group: IntersectionGroup) => group.isIntersectionInGroup(intersection)))

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
      console.log('intersectionFound', intersectionFound);
      return intersectionFound !== 0 && intersectionFound % 2 !== 0;
    }
}
