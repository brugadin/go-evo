<template>
  <div class="home">
    <MapGrid />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MapGrid from '@/components/MapGrid.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'Home',
  components: {
    MapGrid,
  },
  created() {
    console.log('HEY THERE');
  },
});
</script>
