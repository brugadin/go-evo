import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';
import store from '@/store';

function startGame(): void {
  store.dispatch('game/startGame');
}

function claimIntersection(intersectionId: number): void {
  store.dispatch('game/claimIntersection', intersectionId);
}

function getPlayers(): PlayerData[] {
  return store.getters['game/players'];
}

function getCurrentPlayerName(): string {
  return store.getters['game/currentPlayerName'];
}

function getIntersections(): IntersectionData[] {
  return store.getters['game/intersectionItems'];
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
