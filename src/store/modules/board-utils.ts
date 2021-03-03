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

const generateTerritories = (boardSize = 10): Territory[] => Array.from(
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

const getGroup = (
  territory: Territory,
  territories: Territory[],
  claimedTerritory?: Territory,
  currentPlayer?: Player,
): { liberties: number; territories: Territory[]} => {
  const visited: Territory[] = [];
  const visitedList: Territory[] = [];
  const queue: Territory[] = [territory];
  let count = 0;
  const { owner } = territory;
  while (queue.length > 0) {
    // eslint-disable-next-line
    const currentTerritory = queue.pop()!;
    const hasVisited = visited.find(
      (visitedTerritory) => visitedTerritory.id === currentTerritory?.id,
    );
      // eslint-disable-next-line
      if (hasVisited) { continue; }

    const neighbors = getAdjacentTerritoriesList(currentTerritory, territories);

    count += neighbors.filter((neighbor: Territory) => !neighbor.owner
    && claimedTerritory?.id !== neighbor.id).length;

    neighbors.forEach((neighbor: Territory) => {
      if (neighbor.owner === owner
        || (currentPlayer && currentPlayer === neighbor.owner)) { queue.push(neighbor); }
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
  currentPlayer: Player,
): Territory[] {
  const neighbors = getAdjacentTerritoriesList(territory, territories);
  let capturedTerritories: Territory[] = [];

  neighbors.forEach((neighborTerritory: Territory) => {
    const neighborOwner = neighborTerritory.owner;
    if (!!neighborOwner && neighborOwner !== currentPlayer) {
      const groupedItems = getGroup(neighborTerritory, territories, territory);

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
  currentPlayer: Player,
  capturedTerritories: Territory[],
): boolean => (capturedTerritories.length === 0
    && getGroup(territory, territories, territory, currentPlayer).liberties === 0);

export default {
  isSuicidalMove,
  getCapturedTerritories,
  getNextPlayer,
  generateTerritories,
};
