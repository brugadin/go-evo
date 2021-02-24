import { Board, Player } from './models';

const numberOfPlayers = 2;

export const generateBasicBoard = (horizontalSize = 10): Board => ({
  cellData: Array.from(
    Array(horizontalSize),
    (rowItem, rowNumber) => Array.from(Array(horizontalSize),
      (columnItem, columnNumber) => ({
        id: (rowNumber * 10) + columnNumber, column: columnNumber, row: rowNumber,
      })),
  ),
});

export const generatePlayers = (): Player[] => Array.from(
  Array(numberOfPlayers),
  (rowItem, playerNumber) => ({ name: `Player ${playerNumber + 1}`, score: 0, color: playerNumber === 0 ? 'black' : 'red' }),
);
