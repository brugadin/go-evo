import { Territory, Player } from './models';

export class Board {
    private multidimensionalCellData: Territory[][] = [];

    constructor(private players: Player[], private size: number = 10) {
      this.multidimensionalCellData = this.initializeCellData(size);
    }

    get cellData(): Territory[] {
      return this.multidimensionalCellData.flat(1);
    }

    private initializeCellData = (boardSize: number): Territory[][] => Array.from(
      Array(boardSize),
      (rowItem, rowNumber) => Array.from(Array(boardSize),
        (columnItem, columnNumber) => ({
          id: (rowNumber * boardSize) + columnNumber, column: columnNumber, row: rowNumber,
        })),
    )
}
