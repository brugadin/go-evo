import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';
import store from '@/store';

function startGame(): void {
  store.dispatch('game/startGame');
}

function claimIntersection(intersectionId: number): void {
  store.dispatch('game/claimIntersection', intersectionId);
}

function passPlayerTurn(): void {
  store.dispatch('game/passPlayerTurn');
}

function getPlayers(): PlayerData[] {
  return store.getters['game/players'];
}

function getCurrentPlayer(): PlayerData {
  return store.getters['game/currentPlayer'];
}

function getIntersections(): IntersectionData[] {
  return store.getters['game/intersectionItems'];
}

export default function useGame() {
  return {
    claimIntersection,
    getCurrentPlayer,
    getIntersections,
    getPlayers,
    passPlayerTurn,
    startGame,
  };
}
