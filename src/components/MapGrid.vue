<template>
  <div>Hello from Grid</div>
</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue';

interface ComponentState {
  gridSize: number;
}

export default defineComponent({
  name: 'MapGrid',
  setup() {
    const state: ComponentState = reactive({
      gridSize: 100,
    });
  },
});
</script>

<style>
</style>
