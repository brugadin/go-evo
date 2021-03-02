import { Player, Territory } from '@/core/models';
import store from '@/store';

function startGame(): void {
  store.dispatch('game/startGame');
}

function claimTerritory(territory: Territory): void {
  store.dispatch('game/claimTerritory', territory);
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
    claimTerritory,
    startGame,
    getTerritories,
    getPlayers,
    getCurrentPlayerName,
  };
}
