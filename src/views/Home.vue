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
  max-width: 700px;
}
</style>
