import {
  PlayerData,
} from '@/core/entities/player';
import { TerritoryData, AdjacentTerritories } from '@/core/entities/territory';

const getTerritoryByCoordinates = (
  row: number,
  column: number,
  territories: TerritoryData[],
): TerritoryData | undefined => territories.find(
  (territory: TerritoryData) => territory.column === column && territory.row === row,
);

const generateTerritories = (boardSize = 19): TerritoryData[] => Array.from(
  Array(boardSize),
  (rowItem, rowNumber) => Array.from(Array(boardSize),
    (columnItem, columnNumber) => ({
      id: (rowNumber * boardSize) + columnNumber, column: columnNumber, row: rowNumber,
    })),
)
  .flat(1);

const getAdjacentTerritories = (
  territory: TerritoryData,
  territories: TerritoryData[],
): AdjacentTerritories => ({
  top: getTerritoryByCoordinates(territory.row - 1, territory.column, territories),
  left: getTerritoryByCoordinates(territory.row, territory.column - 1, territories),
  bottom: getTerritoryByCoordinates(territory.row + 1, territory.column, territories),
  right: getTerritoryByCoordinates(territory.row, territory.column + 1, territories),
} as AdjacentTerritories);

const getAdjacentTerritoriesList = (
  territory: TerritoryData,
  territories: TerritoryData[],
): TerritoryData[] => Object.values(getAdjacentTerritories(territory, territories))
  .filter((filterTerritory: TerritoryData | undefined) => !!filterTerritory) as TerritoryData[];

export const getGroup = (
  territory: TerritoryData,
  territories: TerritoryData[],
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

    const neighbors = getAdjacentTerritoriesList(currentTerritory, territories);
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

function getNextPlayer(currentPlayerName: string, players: PlayerData[]): PlayerData {
  const playerIndex = players
    .findIndex((player: PlayerData) => (currentPlayerName === player.name));
  return players[playerIndex + 1] || players[0];
}

function getCapturedTerritories(
  territory: TerritoryData,
  territories: TerritoryData[],
): TerritoryData[] {
  const neighbors = getAdjacentTerritoriesList(territory, territories);
  let capturedTerritories: TerritoryData[] = [];

  neighbors.forEach((neighborTerritory: TerritoryData) => {
    const neighborOwner = neighborTerritory.owner;
    if (!!neighborOwner && neighborOwner.id !== territory.owner?.id) {
      const groupedItems = getGroup(neighborTerritory, territories);
      if (groupedItems.liberties === 0) {
        capturedTerritories = capturedTerritories.concat(groupedItems.territories);
      }
    }
  });
  return capturedTerritories;
}

const isSuicidalMove = (
  territory: TerritoryData,
  territories: TerritoryData[],
  capturedTerritories: TerritoryData[],
): boolean => (capturedTerritories.length === 0
    && getGroup(territory, territories).liberties === 0);

export default {
  isSuicidalMove,
  getCapturedTerritories,
  getNextPlayer,
  generateTerritories,
};
