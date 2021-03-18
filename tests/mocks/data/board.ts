import { BoardData } from '@/core/entities/board';
import { getIntersections } from '../utils/intersection';
import { getMockPlayers } from '../utils/player';

export const board: BoardData = {
  intersections: getIntersections(),
  players: getMockPlayers(),
  currentPlayer: getMockPlayers()[0],
};
