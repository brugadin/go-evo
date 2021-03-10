import { Player } from '@/core/entities/player/player';
import { PlayerColor } from '@/core/entities/player';
import { IntersectionData, IntersectionGroup } from '@/core/entities/intersection';
import { Board } from '@/core/entities/board';

// TODO: Move to territory model
type TerritoryOwner = PlayerColor | 'unknown' | 'neutral';
export interface Territory {
  intersections: IntersectionData[];
  owner: TerritoryOwner;
}

export class TerritoryService {
    getTerritories = (board: Board): IntersectionData[] => {
      const territories: IntersectionData[] = [];
      const testResults: Territory[] = [];
      board.intersections.forEach((intersection: IntersectionData) => {
        const resultTerritory = this.generateTerritory(intersection, board);
        testResults.push(resultTerritory);
        territories.push({
          id: intersection.id,
          row: intersection.row,
          column: intersection.column,
          owner: board.players
            .find((player: Player) => player.color === resultTerritory.owner)
          || undefined,
        });
      });
      console.log(testResults);
      return territories;
    }

    generateTerritory(
      intersection: IntersectionData,
      board: Board,
      territory?: Territory,
    ): Territory {
      if (intersection.owner) {
        const { intersections } = board.getIntersectionGroup(intersection);
        return {
          intersections,
          owner: intersection.owner.color,
        };
      }

      let isRoot = false;
      if (!territory) {
        territory = {
          intersections: [],
          owner: 'unknown',
        };

        isRoot = true;
      }

      territory.intersections.push(intersection);

      const neighbors = board.getAdjacentIntersectionsList(intersection);
      // TODO: Reduce complexity here
      neighbors.forEach((neighbor: IntersectionData) => {
        if (!neighbor.owner) {
          if (!this.isIntersectionInTerritory(neighbor, territory!)) {
            this.generateTerritory(neighbor, board, territory);
          }
        } else if (territory!.owner !== 'neutral') {
          if (territory!.owner === 'unknown') {
              territory!.owner = neighbor.owner.color;
          } else if (territory!.owner !== neighbor.owner.color) {
              territory!.owner = 'neutral';
          }
        }
      });

      if (isRoot && territory.owner === 'unknown') {
        territory.owner = 'neutral';
      }

      return territory;
    }

    // TODO: Move to territory class
    isIntersectionInTerritory = (
      intersection: IntersectionData,
      territory: Territory,
    ): boolean => territory.intersections.findIndex((item) => item.id === intersection.id) !== -1
}
