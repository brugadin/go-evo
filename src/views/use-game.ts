import store from '@/store';
import { Player, Territory } from '../store/modules/models';

function startGame(): void {
  store.dispatch('game/startGame');
}

function getPlayers(): Player[] {
  return store.getters['game/players'];
}

function getCurrentPlayerName(): string {
  return store.getters['game/currentPlayerName'];
}

function getTerritories(): Territory[] {
  return store.getters['game/territoryItems'];
}

export default function useGame() {
  return {
    startGame,
    getTerritories,
    getPlayers,
    getCurrentPlayerName,
  };
}
