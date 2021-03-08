import { PlayerData } from '../player';
import { AdjacentTerritories, TerritoryData } from '../territory';
import { BoardData } from './board.data';

export class Board implements BoardData {
    readonly territories: TerritoryData[];

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
    ): TerritoryData | undefined => this.territories.find(
      (territory: TerritoryData) => territory.column === column && territory.row === row,
    );

    private getAdjacentTerritories = (
      territory: TerritoryData,
    ): AdjacentTerritories => ({
      top: this.getTerritoryByCoordinates(territory.row - 1, territory.column),
      left: this.getTerritoryByCoordinates(territory.row, territory.column - 1),
      bottom: this.getTerritoryByCoordinates(territory.row + 1, territory.column),
      right: this.getTerritoryByCoordinates(territory.row, territory.column + 1),
    } as AdjacentTerritories);

    private getAdjacentTerritoriesList = (
      territory: TerritoryData,
    ): TerritoryData[] => Object.values(this.getAdjacentTerritories(territory))
      .filter((filterTerritory: TerritoryData | undefined) => !!filterTerritory) as TerritoryData[];

    liberateTerritoriesById = (liberatedTerritoriesIds: number[]): TerritoryData[] => {
      const liberatedTerritories: TerritoryData[] = [];
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
      territory: TerritoryData,
    ): number[] {
      const neighbors = this.getAdjacentTerritoriesList(territory);
      let capturedTerritories: TerritoryData[] = [];

      neighbors.forEach((neighborTerritory: TerritoryData) => {
        const neighborOwner = neighborTerritory.owner;
        if (!!neighborOwner && neighborOwner.id !== territory.owner?.id) {
          const groupedItems = this.getGroup(neighborTerritory);
          if (groupedItems.liberties === 0) {
            capturedTerritories = capturedTerritories.concat(groupedItems.territories);
          }
        }
      });
      return capturedTerritories.map((capturedTerritory: TerritoryData) => capturedTerritory.id);
    }

    getGroup = (
      territory: TerritoryData,
    ): { liberties: number; territories: TerritoryData[]} => {
      const visited: TerritoryData[] = [];
      const visitedList: TerritoryData[] = [];
      const queue: TerritoryData[] = [territory];
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
        count += neighbors.filter((neighbor: TerritoryData) => !neighbor.owner).length;
        neighbors.forEach((neighbor: TerritoryData) => {
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
