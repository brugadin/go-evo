import { AdjacentTerritories, Board, Territory } from './models';

const getTerritoryByCoordinates = (
  row: number,
  column: number,
  board: Board,
): Territory | undefined => board.cellData.flat(1).find(
  (territory: Territory) => territory.column === column && territory.row === row,
);

export default (territory: Territory, board: Board): AdjacentTerritories => ({
  top: getTerritoryByCoordinates(territory.row - 1, territory.column, board),
  left: getTerritoryByCoordinates(territory.row, territory.column - 1, board),
  bottom: getTerritoryByCoordinates(territory.row + 1, territory.column, board),
  right: getTerritoryByCoordinates(territory.row, territory.column + 1, board),
} as AdjacentTerritories);
