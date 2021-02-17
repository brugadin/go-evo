<template>
  <div class="game-map-container">
    <MapGrid  />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapGrid from '@/components/MapGrid.vue';

export default defineComponent({
  name: 'Home',
  components: {
    MapGrid,
  },
});
</script>
<style lang="scss" scoped>
.game-map-container {
  position: fixed;
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%)
}
</style>
