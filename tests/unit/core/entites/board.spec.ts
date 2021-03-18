/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Board, BoardData } from '@/core/entities/board';
import { getBoard } from '../../../mocks/utils/board';

describe('Board', () => {
  let boardData: BoardData;
  let boardInstance: Board;

  beforeEach(() => {
    boardData = getBoard();
    boardInstance = new Board(boardData);
  });

  it('should instantiate with the correct data', () => {
    expect(boardInstance.intersections).toBe(boardData.intersections);
    expect(boardInstance.currentPlayer).toBe(boardData.currentPlayer);
    expect(boardInstance.players).toBe(boardData.players);
  });

  it('should retrieve an intersection by its id', () => {
    const intersection = boardInstance.intersections[0];
    const { id } = intersection;

    const returnedIntersection = boardInstance.getIntersectionById(id);

    expect(returnedIntersection).not.toBeUndefined();
  });

  it('should return undefined when intersection is not found', () => {
    const returnedIntersection = boardInstance.getIntersectionById(-10);

    expect(returnedIntersection).toBeUndefined();
  });

  it('should retrieve an intersection by its coordinates', () => {
    const intersection = boardInstance.intersections[0];
    const { row, column } = intersection;

    const returnedIntersection = boardInstance.getIntersectionByCoordinates(row, column);

    expect(returnedIntersection).not.toBeUndefined();
  });

  it('should return undefined when an intersection by its coordinates', () => {
    const returnedIntersection = boardInstance.getIntersectionByCoordinates(-10, -10);

    expect(returnedIntersection).toBeUndefined();
  });

  it('should return adjacent intersections', () => {
    const returnedIntersection = boardInstance.getIntersectionById(18)!;
    const adjacentIntersections = boardInstance.getAdjacentIntersections(returnedIntersection!);
    const { column, row } = returnedIntersection;

    const expectedTop = boardInstance.getIntersectionByCoordinates(column - 1, row);
    const expectedRight = boardInstance.getIntersectionByCoordinates(column, row + 1);
    const expectedLeft = boardInstance.getIntersectionByCoordinates(column, row - 1);
    const expectedBottom = boardInstance.getIntersectionByCoordinates(column + 1, row);

    expect(adjacentIntersections.top).toBe(expectedTop);
    expect(adjacentIntersections.right).toBe(expectedRight);
    expect(adjacentIntersections.left).toBe(expectedLeft);
    expect(adjacentIntersections.bottom).toBe(expectedBottom);
  });

  it('should return undefined adjacent intersections when out of bounds', () => {
    const returnedIntersection = boardInstance.getIntersectionById(24)!;
    const adjacentIntersections = boardInstance.getAdjacentIntersections(returnedIntersection!);
    const { column, row } = returnedIntersection;

    const expectedTop = boardInstance.getIntersectionByCoordinates(column - 1, row);
    const expectedLeft = boardInstance.getIntersectionByCoordinates(column, row - 1);

    expect(adjacentIntersections.top).toBe(expectedTop);
    expect(adjacentIntersections.right).toBeUndefined();
    expect(adjacentIntersections.left).toBe(expectedLeft);
    expect(adjacentIntersections.bottom).toBeUndefined();
  });
});
