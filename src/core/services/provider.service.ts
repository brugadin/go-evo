import { BoardService } from './board.service';

export interface Provider {
  board: BoardService;
}

export const provider = (): Provider => ({
  board: new BoardService(),
});
