import { AdjacentTerritories, Player, Territory } from '@/core/models';
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

export const claimTerritory = (state: GameState, territory: Territory) => {
  const foundItem = state.territories
    .find((item) => item?.id === territory?.id && !item.owner);

  if (!foundItem) { return; }
  const adjacentTerritories = getAdjacentTerritories(territory, state.territories);
  foundItem.owner = state.currentPlayer;
  const playerIndex = state.players
    .findIndex((player: Player) => (state.currentPlayer?.name === player.name));
  const nextPlayer = state.players[playerIndex + 1] || state.players[0];
  state.currentPlayer = nextPlayer;
};

export const getGroup = (territory: Territory, territories: Territory[]) => {
  if (!territory.owner) { return; }
  const visited: Territory[] = [];
  const queue: Territory[] = [territory];
  const count = 0;

  while (queue.length > 0) {
    const currentTerritory = queue.pop()!;
    const hasVisited = visited.find(
      (visitedTerritory) => visitedTerritory.id === currentTerritory?.id,
    );
    // eslint-disable-next-line
    if (hasVisited) { continue; }

    const neighbors = getAdjacentTerritories(currentTerritory, territories);
  }
};

// Board.prototype.get_group = function(i, j) {

//   var color = this.board[i][j];
//   if (color == Board.EMPTY)
//       return null;

//   var visited = {}; // for O(1) lookups
//   var visited_list = []; // for returning
//   var queue = [[i, j]];
//   var count = 0;

//   while (queue.length > 0) {
//       var stone = queue.pop();
//       if (visited[stone])
//           continue;

//       var neighbors = this.get_adjacent_intersections(stone[0], stone[1]);
//       var self = this;
//       _.each(neighbors, function(n) {
//           var state = self.board[n[0]][n[1]];
//           if (state == Board.EMPTY)
//               count++;
//           if (state == color)
//               queue.push([n[0], n[1]]);
//       });

//       visited[stone] = true;
//       visited_list.push(stone);
//   }

//   return {
//       "liberties": count,
//       "stones": visited_list
//   };
// }
