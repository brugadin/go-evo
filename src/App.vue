<template>
<el-alert
  class="pre-alpha-alert"
  v-if="isProd"
  title="Pre-alpha release"
  type="warning"
  :closable="false"
  show-icon
  center>
  <div>View source in GitHub <a class="github-repo" href="https://github.com/brugadin/go-evo">brugadin/go-evo</a></div>
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
    const isProd = process.env.NODE_ENV === 'production';
    return {
      isProd,
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/element-variables.scss';

.main-container, .pre-alpha-alert {
  min-width: 640px;
}

.github-repo {
    text-decoration: none;
    color: $--color-warning;
    font-weight: bold;
}

@media screen and (min-width: 641px) {
  .main-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
