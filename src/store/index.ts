import { createStore } from 'vuex';
import gameModule from './game/game';

export default createStore({
  modules: {
    game: gameModule,
  },
});
