/* eslint-disable no-param-reassign, @typescript-eslint/no-non-null-assertion, no-nested-ternary */
import { Board } from '@/core/entities/board';
import { IntersectionData } from '@/core/entities/intersection';
import { Player } from '@/core/entities/player';
import { Territory, TerritoryData } from '@/core/entities/territory';

export class TerritoryService {
    determineTerritoryOwners = (board: Board): IntersectionData[] => {
      const territories: number[] = [];
      board.intersections.forEach((intersection: IntersectionData) => {
        if (territories.indexOf(intersection.id) === -1) {
          const resultTerritory = this.generateTerritory(intersection, board);
          resultTerritory.linkedIntersectionsIds
            .forEach((id: number) => {
              territories.push(id);
              const currentIntersection = board.getIntersectionById(id);
              if (currentIntersection) {
                currentIntersection.territoryOwner = this
                  .getPlayerFromTerritory(resultTerritory, board.players);
              }
            });
        }
      });

      return board.intersections;
    }

    private generateTerritory(
      intersection: IntersectionData,
      board: Board,
      territory?: Territory,
    ): TerritoryData {
      if (intersection.stoneOwner) {
        return this.getTerritoryFromOwned(board, intersection);
      }

      territory = this.ensureTerritory(territory, intersection);
      const neighbors = board.getAdjacentIntersectionsList(intersection);
      neighbors.forEach((neighbor: IntersectionData) => {
        if (!neighbor.stoneOwner) {
          if (!territory?.isInTerritory(neighbor)) {
            this.generateTerritory(neighbor, board, territory);
          }
        } else {
          territory!.owner = neighbor.stoneOwner.color;
        }
      });

      if (territory.isRoot && territory.owner === 'unknown') {
        territory.owner = 'neutral';
      }

      return {
        linkedIntersectionsIds: territory.linkedIntersectionsIds,
        owner: territory.owner,
      };
    }

    private ensureTerritory = (
      territory: Territory | undefined,
      intersection: IntersectionData,
    ): Territory => {
      if (!territory) {
        territory = new Territory({
          linkedIntersectionsIds: [],
          owner: 'unknown',
        });

        territory.isRoot = true;
      }

      territory.linkedIntersectionsIds.push(intersection.id);
      return territory;
    }

    private getTerritoryFromOwned = (
      board: Board,
      intersection: IntersectionData,
    ): TerritoryData => {
      const { intersections } = board.getIntersectionGroup(intersection);
      return {
        linkedIntersectionsIds: intersections.map((item) => item.id),
        owner: intersection.stoneOwner!.color,
      } as TerritoryData;
    }

    private getPlayerFromTerritory = (
      territory: TerritoryData,
      players: Player[],
    ): Player | undefined => players.find(
      (player) => territory.owner
      && territory.owner === player.color,
    )
}
