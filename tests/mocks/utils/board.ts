import { BoardData } from '@/core/entities/board';
import { board } from '../data/board';

export const getBoard = (): BoardData => ({ ...board });
