<template>
<el-alert
  class="pre-alpha-alert"
  v-if="isProd"
  title="pre-alpha release"
  type="warning"
  :closable="false"
  show-icon
  center>
</el-alert>
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
  setup() {
    const isProd = process.env.NODE_ENV !== 'production';
    return {
      isProd,
    };
  },
});
</script>
<style scoped>

.main-container, .pre-alpha-alert {
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
