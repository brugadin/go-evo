<template>
  <div class="game-map-container">
    <MapGrid :territoryItems="territoryItems"  />
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, reactive, toRefs,
} from 'vue';
import MapGrid from '@/components/MapGrid.vue';
import { Territory } from '@/store/modules/models';
import store from '@/store';
import useGame from './use-game';

interface ComponentState {
  territoryItems: Territory[];
}

export default defineComponent({
  name: 'Home',
  components: {
    MapGrid,
  },
  setup() {
    const {
      startGame,
    } = useGame();

    const state: ComponentState = reactive({
      territoryItems: computed(() => store.getters['game/territoryItems']),
    });

    onMounted(() => startGame());

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
.game-map-container {
  max-width: 700px;
}
</style>
