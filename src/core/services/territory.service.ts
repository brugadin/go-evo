/* eslint-disable no-param-reassign, @typescript-eslint/no-non-null-assertion */
import { Board } from '@/core/entities/board';
import { IntersectionData } from '@/core/entities/intersection';
import { Player } from '@/core/entities/player/player';
import { Territory, TerritoryData } from '@/core/entities/territory';

export class TerritoryService {
    getTerritories = (board: Board): IntersectionData[] => {
      const territories: IntersectionData[] = [];
      board.intersections.forEach((intersection: IntersectionData) => {
        const resultTerritory = this.generateTerritory(intersection, board);
        territories.push({
          id: intersection.id,
          row: intersection.row,
          column: intersection.column,
          owner: intersection.owner,
          territoryOwner: resultTerritory.owner,
        });
      });
      return territories;
    }

    private generateTerritory(
      intersection: IntersectionData,
      board: Board,
      territory?: Territory,
    ): TerritoryData {
      if (intersection.owner) {
        const { intersections } = board.getIntersectionGroup(intersection);
        return {
          intersections,
          owner: intersection.owner.color,
        };
      }

      territory = this.ensureTerritory(territory, intersection);
      const neighbors = board.getAdjacentIntersectionsList(intersection);

      neighbors.forEach((neighbor: IntersectionData) => {
        if (!neighbor.owner) {
          if (!territory?.isInTerritory(neighbor)) {
            this.generateTerritory(neighbor, board, territory);
          }
        } else {
          territory!.owner = neighbor.owner.color;
        }
      });

      if (territory.isRoot && territory.owner === 'unknown') {
        territory.owner = 'neutral';
      }

      return territory;
    }

    private ensureTerritory = (
      territory: Territory | undefined,
      intersection: IntersectionData,
    ): Territory => {
      if (!territory) {
        territory = new Territory({
          intersections: [],
          owner: 'unknown',
        });

        territory.isRoot = true;
      }

      territory.intersections.push(intersection);
      return territory;
    }
}
