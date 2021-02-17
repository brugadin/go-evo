import { createStore } from 'vuex';
import gameModule from './modules/game';

export default createStore({
  modules: {
    game: gameModule,
  },
});
