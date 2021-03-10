import { GameService } from './game.service';
import { TerritoryService } from './territory.service';

export interface Provider {
  game: GameService;
}

export const provider = (): Provider => ({
  game: new GameService(new TerritoryService()),
});
