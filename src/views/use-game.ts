import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';
import store from '@/store';

function startGame(): void {
  store.dispatch('game/startGame');
}

function claimIntersection(territoryId: number): void {
  store.dispatch('game/claimIntersection', territoryId);
}

function getPlayers(): PlayerData[] {
  return store.getters['game/players'];
}

function getCurrentPlayerName(): string {
  return store.getters['game/currentPlayerName'];
}

function getIntersections(): IntersectionData[] {
  return store.getters['game/territoryItems'];
}

export default function useGame() {
  return {
    claimIntersection,
    startGame,
    getIntersections,
    getPlayers,
    getCurrentPlayerName,
  };
}
