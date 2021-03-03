import {
  AdjacentTerritories, Player, Territory,
} from '@/core/models';

import { GameState } from './models';

const getTerritoryByCoordinates = (
  row: number,
  column: number,
  territories: Territory[],
): Territory | undefined => territories.find(
  (territory: Territory) => territory.column === column && territory.row === row,
);

export const generateTerritories = (boardSize = 10): Territory[] => Array.from(
  Array(boardSize),
  (rowItem, rowNumber) => Array.from(Array(boardSize),
    (columnItem, columnNumber) => ({
      id: (rowNumber * boardSize) + columnNumber, column: columnNumber, row: rowNumber,
    })),
)
  .flat(1);

export const getAdjacentTerritories = (
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
) => Object.values(getAdjacentTerritories(territory, territories))
  .filter((filterTerritory: Territory | undefined) => !!filterTerritory) as Territory[];

export const getGroup = (
  territory: Territory,
  territories: Territory[],
): { liberties: number; territories: Territory[]} => {
  const visited: Territory[] = [];
  const visitedList: Territory[] = [];
  const queue: Territory[] = [territory];
  let count = 0;
  const { owner } = territory;

  while (queue.length > 0 && owner) {
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
      if (neighbor.owner === owner) { queue.push(neighbor); }
    });

    visited.push(currentTerritory);
    visitedList.push(currentTerritory);
  }

  return {
    liberties: count,
    territories: visitedList,
  };
};

function changePlayer(state: GameState) {
  const playerIndex = state.players
    .findIndex((player: Player) => (state.currentPlayer?.name === player.name));
  const nextPlayer = state.players[playerIndex + 1] || state.players[0];
  state.currentPlayer = nextPlayer;
}

function getCapturedTerritories(territory: Territory, territories: Territory[]) {
  const neighbors = getAdjacentTerritoriesList(territory, territories);
  let capturedTerritories: Territory[] = [];

  neighbors.forEach((neighborTerritory: Territory) => {
    const neighborOwner = neighborTerritory.owner;
    if (!!neighborOwner && neighborOwner !== territory.owner) {
      const groupedItems = getGroup(neighborTerritory, territories);

      if (groupedItems.liberties === 0) {
        capturedTerritories = capturedTerritories.concat(groupedItems.territories);
      }
    }
  });
  return capturedTerritories;
}

export const claimTerritory = (state: GameState, territory: Territory) => {
  const foundItem = state.territories
    .find((item) => item?.id === territory?.id && !item.owner);

  if (!foundItem) { return; }

  foundItem.owner = state.currentPlayer;
  const capturedTerritories: Territory[] = getCapturedTerritories(foundItem, state.territories);

  if (capturedTerritories.length === 0
    && getGroup(territory, state.territories).liberties === 0) {
    foundItem.owner = undefined;
    return;
  }

  for (let i = 0; i < capturedTerritories.length; i += 1) {
    capturedTerritories[i].owner = undefined;
  }

  changePlayer(state);
};
