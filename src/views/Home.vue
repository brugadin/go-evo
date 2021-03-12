<template>
<el-container>
  <el-container>
    <el-main class="main-content">
        <MapGrid
        :intersectionItems="intersectionItems"
        @intersectionClicked="intersectionClicked"  />
    </el-main>
      <el-footer class=""><Players :players="players" :currentPlayer="currentPlayer" /></el-footer>
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
  currentPlayer: PlayerData;
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
      getCurrentPlayer,
    } = useGame();

    const state: ComponentState = reactive({
      intersectionItems: computed(() => getIntersections()),
      players: computed(() => getPlayers()),
      currentPlayer: computed(() => getCurrentPlayer()),
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
.main-content {
  padding: 20px;
  @media screen and (max-width: 600px) {
    padding: 20px 0;
  }
}

::v-deep(.el-footer) {
  @media screen and (max-width: 600px) {
    padding: 20px 0;
  }
}

</style>
