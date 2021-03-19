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
    expect(returnedIntersection).toBe(intersection);
  });

  it('should return undefined when intersection is not found', () => {
    const returnedIntersection = boardInstance.getIntersectionById(-10);

    expect(returnedIntersection).toBeUndefined();
  });

  it('should retrieve an intersection by its coordinates', () => {
    const intersection = boardInstance.intersections[0];
    const { row, column } = intersection;

    const returnedIntersection = boardInstance.getIntersectionByCoordinates(column, row);

    expect(returnedIntersection).not.toBeUndefined();
    expect(returnedIntersection).toBe(intersection);
  });

  it('should return undefined when an intersection by its coordinates', () => {
    const returnedIntersection = boardInstance.getIntersectionByCoordinates(-10, -10);

    expect(returnedIntersection).toBeUndefined();
  });

  it('should return adjacent intersections', () => {
    const returnedIntersection = boardInstance.getIntersectionById(18)!;
    const adjacentIntersections = boardInstance.getAdjacentIntersections(returnedIntersection);
    const { column, row } = returnedIntersection;

    const expectedTop = boardInstance.getIntersectionByCoordinates(row, column - 1);
    const expectedRight = boardInstance.getIntersectionByCoordinates(row + 1, column);
    const expectedLeft = boardInstance.getIntersectionByCoordinates(row - 1, column);
    const expectedBottom = boardInstance.getIntersectionByCoordinates(row, column + 1);

    expect(adjacentIntersections.top).toBe(expectedTop);
    expect(adjacentIntersections.right).toBe(expectedRight);
    expect(adjacentIntersections.left).toBe(expectedLeft);
    expect(adjacentIntersections.bottom).toBe(expectedBottom);
  });

  it('should return undefined adjacent intersections when out of bounds', () => {
    const returnedIntersection = boardInstance.getIntersectionById(24)!;
    const adjacentIntersections = boardInstance.getAdjacentIntersections(returnedIntersection);
    const { column, row } = returnedIntersection;

    const expectedTop = boardInstance.getIntersectionByCoordinates(row, column - 1);
    const expectedLeft = boardInstance.getIntersectionByCoordinates(row - 1, column);

    expect(adjacentIntersections.top).toBe(expectedTop);
    expect(adjacentIntersections.right).toBeUndefined();
    expect(adjacentIntersections.left).toBe(expectedLeft);
    expect(adjacentIntersections.bottom).toBeUndefined();
  });

  it('should return an array of adjacent intersections', () => {
    const returnedIntersection = boardInstance.getIntersectionById(18)!;
    const adjacentIntersections = boardInstance.getAdjacentIntersectionsList(returnedIntersection);
    const { column, row } = returnedIntersection;

    const expectedTop = boardInstance.getIntersectionByCoordinates(row, column - 1);
    const expectedRight = boardInstance.getIntersectionByCoordinates(row + 1, column);
    const expectedLeft = boardInstance.getIntersectionByCoordinates(row - 1, column);
    const expectedBottom = boardInstance.getIntersectionByCoordinates(row, column + 1);
    const expectedElements = [expectedTop, expectedRight, expectedLeft, expectedBottom];

    const containsAllElements = adjacentIntersections.every(
      (element) => (expectedElements.indexOf(element) !== -1),
    );

    expect(containsAllElements).toBeTruthy();
    expect(expectedElements.length).toEqual(adjacentIntersections.length);
  });

  it('should not return undefined values in array when out of bounds', () => {
    const returnedIntersection = boardInstance.getIntersectionById(24)!;
    const adjacentIntersections = boardInstance.getAdjacentIntersectionsList(returnedIntersection);
    const { column, row } = returnedIntersection;

    const expectedTop = boardInstance.getIntersectionByCoordinates(row, column - 1);
    const expectedLeft = boardInstance.getIntersectionByCoordinates(row - 1, column);
    const expectedElements = [expectedTop, expectedLeft];

    const containsAllElements = adjacentIntersections.every(
      (element) => (expectedElements.indexOf(element) !== -1),
    );

    const alleElementsAreTruthy = adjacentIntersections.every(
      (element) => (!!element),
    );

    expect(containsAllElements).toBeTruthy();
    expect(alleElementsAreTruthy).toBeTruthy();
    expect(expectedElements.length).toEqual(adjacentIntersections.length);
  });

  it('should liberate intersections by id', () => {
    const intersections = [...boardData.intersections];
    const ownedIntersection = intersections[0];
    const intersectionId = ownedIntersection.id;

    ownedIntersection.stoneOwner = boardData.currentPlayer;
    boardInstance = new Board({
      ...boardData,
      intersections,
    });

    const liberatedIds = boardInstance.liberateIntersectionsById([intersectionId]);

    expect(liberatedIds.length).toEqual(1);
    expect(liberatedIds[0]).toBeTruthy();
    expect(liberatedIds[0].stoneOwner).toBeUndefined();
  });

  it('should liberate intersections by id', () => {
    const intersections = [...boardInstance.intersections];
    const ownedIntersection = intersections[0];
    const intersectionId = ownedIntersection.id;
    ownedIntersection.stoneOwner = boardData.currentPlayer;

    const liberatedIds = boardInstance.liberateIntersectionsById([intersectionId]);
    const liberatedIntersection = boardInstance.getIntersectionById(intersectionId)!;

    expect(liberatedIds.length).toEqual(1);
    expect(liberatedIds[0]).toBeTruthy();
    expect(liberatedIntersection).toBeTruthy();
    expect(liberatedIntersection.stoneOwner).toBeUndefined();
  });

  it('should return captured intersections ids', () => {
    const column = 2;
    const row = 2;
    const [player1, player2] = boardInstance.players;

    const intersectionToCapture = boardInstance.getIntersectionByCoordinates(row, column)!;
    const neighbors = boardInstance.getAdjacentIntersectionsList(intersectionToCapture);

    intersectionToCapture.stoneOwner = player1;

    for (let i = 0; i < neighbors.length; i += 1) {
      neighbors[i].stoneOwner = player2;
    }

    const capturedIntersectionId = boardInstance.getCapturedIntersectionsIds(neighbors[0]);

    expect(capturedIntersectionId[0]).toEqual(intersectionToCapture.id);
  });

  it('should return grouped intersections', () => {
    const column = 2;
    const row = 2;
    const [player1] = boardInstance.players;

    const centerIntersection = boardInstance.getIntersectionByCoordinates(row, column)!;
    const neighbors = boardInstance.getAdjacentIntersectionsList(centerIntersection);

    centerIntersection.stoneOwner = player1;

    for (let i = 0; i < neighbors.length; i += 1) {
      neighbors[i].stoneOwner = player1;
    }

    const intersectionGroup = boardInstance.getIntersectionGroup(centerIntersection);

    expect(intersectionGroup.intersections.length).toEqual(5);
    expect(intersectionGroup.liberties).toEqual(12);
  });
});
