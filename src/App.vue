<template>
<el-container>
    <el-header></el-header>
    <router-view/>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<style scoped>
.side-bar, .main-content {
  padding: 20px;
}
</style>
