import store from '@/store';

function startGame(): void {
  store.dispatch('game/startGame');
}

export default function useGame() {
  return {
    startGame,
  };
}
