<template>
  <Players />
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import Players from '@/components/Players.vue';

export default defineComponent({
  name: 'SideBar',
  components: {
    Players,
  },
});
</script>

<style>

</style>
