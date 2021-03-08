import { GameService } from './game.service';

export interface Provider {
  game: GameService;
}

export const provider = (): Provider => ({
  game: new GameService(),
});
