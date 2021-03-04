import {
  AdjacentTerritories, Player, Territory,
} from '@/core/models';

const getTerritoryByCoordinates = (
  row: number,
  column: number,
  territories: Territory[],
): Territory | undefined => territories.find(
  (territory: Territory) => territory.column === column && territory.row === row,
);

const generateTerritories = (boardSize = 19): Territory[] => Array.from(
  Array(boardSize),
  (rowItem, rowNumber) => Array.from(Array(boardSize),
    (columnItem, columnNumber) => ({
      id: (rowNumber * boardSize) + columnNumber, column: columnNumber, row: rowNumber,
    })),
)
  .flat(1);

const getAdjacentTerritories = (
  territory: Territory,
  territories: Territory[],
): AdjacentTerritories => ({
  top: getTerritoryByCoordinates(territory.row - 1, territory.column, territories),
  left: getTerritoryByCoordinates(territory.row, territory.column - 1, territories),
  bottom: getTerritoryByCoordinates(territory.row + 1, territory.column, territories),
  right: getTerritoryByCoordinates(territory.row, territory.column + 1, territories),
} as AdjacentTerritories);

const getAdjacentTerritoriesList = (
  territory: Territory,
  territories: Territory[],
): Territory[] => Object.values(getAdjacentTerritories(territory, territories))
  .filter((filterTerritory: Territory | undefined) => !!filterTerritory) as Territory[];

export const getGroup = (
  territory: Territory,
  territories: Territory[],
): { liberties: number; territories: Territory[]} => {
  const visited: Territory[] = [];
  const visitedList: Territory[] = [];
  const queue: Territory[] = [territory];
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

    count = neighbors.filter((neighbor: Territory) => !neighbor.owner).length;
    neighbors.forEach((neighbor: Territory) => {
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

function getNextPlayer(currentPlayerName: string, players: Player[]): Player {
  const playerIndex = players
    .findIndex((player: Player) => (currentPlayerName === player.name));
  return players[playerIndex + 1] || players[0];
}

function getCapturedTerritories(
  territory: Territory,
  territories: Territory[],
): Territory[] {
  const neighbors = getAdjacentTerritoriesList(territory, territories);
  let capturedTerritories: Territory[] = [];

  neighbors.forEach((neighborTerritory: Territory) => {
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
  territory: Territory,
  territories: Territory[],
  capturedTerritories: Territory[],
): boolean => (capturedTerritories.length === 0
    && getGroup(territory, territories).liberties === 0);

export default {
  isSuicidalMove,
  getCapturedTerritories,
  getNextPlayer,
  generateTerritories,
};
