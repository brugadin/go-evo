<template>
<el-container>
      <el-aside class="side-bar" width="250px">
        <Players :players="players" :currentPlayerName="currentPlayerName" />
      </el-aside>
      <el-container>
        <el-main class="main-content">
          <div class="game-map-container">
            <MapGrid :territoryItems="territoryItems"  />
        </div>
        </el-main>
      </el-container>
    </el-container>

</template>

<script lang="ts">
import MapGrid from '@/components/MapGrid.vue';
import Players from '@/components/Players.vue';
import { Player, Territory } from '@/store/modules/models';
import {
  computed, defineComponent, onMounted, reactive, toRefs,
} from 'vue';
import useGame from './use-game';

interface ComponentState {
  territoryItems: Territory[];
  players: Player[];
  currentPlayerName: string;
}

export default defineComponent({
  name: 'Home',
  components: {
    MapGrid,
    Players,
  },
  setup() {
    const {
      startGame,
      getTerritories,
      getPlayers,
      getCurrentPlayerName,
    } = useGame();

    const state: ComponentState = reactive({
      territoryItems: computed(() => getTerritories()),
      players: computed(() => getPlayers()),
      currentPlayerName: computed(() => getCurrentPlayerName()),
    });

    onMounted(() => startGame());

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.side-bar, .main-content {
  padding: 20px;
}

.game-map-container {
  max-width: 700px;
}
</style>
