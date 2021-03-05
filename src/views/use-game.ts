import { PlayerData } from '@/core/entities/player';
import { TerritoryData } from '@/core/entities/territory';
import store from '@/store';

function startGame(): void {
  store.dispatch('game/startGame');
}

function claimTerritory(territoryId: number): void {
  store.dispatch('game/claimTerritory', territoryId);
}

function getPlayers(): PlayerData[] {
  return store.getters['game/players'];
}

function getCurrentPlayerName(): string {
  return store.getters['game/currentPlayerName'];
}

function getTerritories(): TerritoryData[] {
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
