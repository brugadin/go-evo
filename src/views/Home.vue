<template>
<el-container>
      <el-aside class="side-bar" width="250px">
        <Players :players="players" :currentPlayerName="currentPlayerName" />
      </el-aside>
      <el-container>
        <el-main class="main-content">
          <div class="game-map-container">
            <MapGrid
            :intersectionItems="intersectionItems"
            @intersectionClicked="intersectionClicked"  />
        </div>
        </el-main>
      </el-container>
    </el-container>

</template>

<script lang="ts">
import MapGrid from '@/components/MapGrid.vue';
import Players from '@/components/Players.vue';
import { PlayerData } from '@/core/entities/player';
import { IntersectionData } from '@/core/entities/intersection';
import {
  computed, defineComponent, onMounted, reactive, toRefs,
} from 'vue';
import useGame from './use-game';

interface ComponentState {
  intersectionItems: IntersectionData[];
  players: PlayerData[];
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
      claimIntersection,
      getIntersections,
      getPlayers,
      getCurrentPlayerName,
    } = useGame();

    const state: ComponentState = reactive({
      intersectionItems: computed(() => getIntersections()),
      players: computed(() => getPlayers()),
      currentPlayerName: computed(() => getCurrentPlayerName()),
    });

    function intersectionClicked(intersection: IntersectionData): void {
      claimIntersection(intersection.id);
    }

    onMounted(() => startGame());

    return {
      ...toRefs(state),
      intersectionClicked,
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
