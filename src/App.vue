<template>
  <div class="main-content">
    <div class="main-container">
      <el-container>
          <router-view/>
      </el-container>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>
<style scoped>
.main-container {
  min-width: 640px;
}
@media screen and (min-width: 641px) {
  .main-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
