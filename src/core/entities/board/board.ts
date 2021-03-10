import { PlayerData } from '../player';
import { AdjacentTerritories, IntersectionData } from '../territory';
import { BoardData } from './board.data';

export class Board implements BoardData {
    readonly territories: IntersectionData[];

    readonly players: PlayerData[];

    readonly currentPlayer: PlayerData;

    constructor(data: BoardData) {
      this.territories = data.territories;
      this.players = data.players;
      this.currentPlayer = data.currentPlayer;
    }

    private getTerritoryByCoordinates = (
      row: number,
      column: number,
    ): IntersectionData | undefined => this.territories.find(
      (territory: IntersectionData) => territory.column === column && territory.row === row,
    );

    private getAdjacentTerritories = (
      territory: IntersectionData,
    ): AdjacentTerritories => ({
      top: this.getTerritoryByCoordinates(territory.row - 1, territory.column),
      left: this.getTerritoryByCoordinates(territory.row, territory.column - 1),
      bottom: this.getTerritoryByCoordinates(territory.row + 1, territory.column),
      right: this.getTerritoryByCoordinates(territory.row, territory.column + 1),
    } as AdjacentTerritories);

    private getAdjacentTerritoriesList = (
      territory: IntersectionData,
    ): IntersectionData[] => Object.values(this.getAdjacentTerritories(territory))
      .filter(
        (filterTerritory: IntersectionData | undefined) => !!filterTerritory,
      ) as IntersectionData[];

    liberateTerritoriesById = (liberatedTerritoriesIds: number[]): IntersectionData[] => {
      const liberatedTerritories: IntersectionData[] = [];
      liberatedTerritoriesIds.forEach((id: number) => {
        const foundTerritory = this.territories.find((item) => id === item.id);
        if (foundTerritory) {
          foundTerritory.owner = undefined;
          liberatedTerritories.push(foundTerritory);
        }
      });

      return liberatedTerritories;
    }

    getCapturedTerritoriesIds(
      territory: IntersectionData,
    ): number[] {
      const neighbors = this.getAdjacentTerritoriesList(territory);
      let capturedTerritories: IntersectionData[] = [];

      neighbors.forEach((neighborTerritory: IntersectionData) => {
        const neighborOwner = neighborTerritory.owner;
        if (!!neighborOwner && neighborOwner.id !== territory.owner?.id) {
          const groupedItems = this.getGroup(neighborTerritory);
          if (groupedItems.liberties === 0) {
            capturedTerritories = capturedTerritories.concat(groupedItems.territories);
          }
        }
      });
      return capturedTerritories.map((capturedTerritory: IntersectionData) => capturedTerritory.id);
    }

    getGroup = (
      territory: IntersectionData,
    ): { liberties: number; territories: IntersectionData[]} => {
      const visited: IntersectionData[] = [];
      const visitedList: IntersectionData[] = [];
      const queue: IntersectionData[] = [territory];
      let count = 0;
      const ownerId = territory.owner?.id;

      while (queue.length > 0) {
        // eslint-disable-next-line
        const currentTerritory = queue.pop()!;
        const hasVisited = visited.find(
          (visitedTerritory) => visitedTerritory.id === currentTerritory?.id,
        );
        // eslint-disable-next-line
        if (hasVisited) { continue; }

        const neighbors = this.getAdjacentTerritoriesList(currentTerritory);
        count += neighbors.filter((neighbor: IntersectionData) => !neighbor.owner).length;
        neighbors.forEach((neighbor: IntersectionData) => {
          if (neighbor.owner?.id === ownerId) { queue.push(neighbor); }
        });

        visited.push(currentTerritory);
        visitedList.push(currentTerritory);
      }

      return {
        liberties: count,
        territories: visitedList,
      };
    };
}
