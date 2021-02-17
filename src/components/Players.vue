<template>
  <el-card>
  <div v-for="o in 2" :key="o" class="text item">
    {{'Player ' + o }}
  </div>
</el-card>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Players',
});
</script>

<style>

</style>
