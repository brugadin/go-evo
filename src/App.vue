<template>
<el-container>
    <el-header></el-header>
    <el-container>
      <el-aside class="side-bar" width="250px">
        <SideBar />
      </el-aside>
      <el-container>
        <el-main class="main-content">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import SideBar from '@/layouts/Sidebar.vue';

export default defineComponent({
  name: 'App',
  components: {
    SideBar,
  },
});
</script>
<style scoped>
.side-bar, .main-content {
  padding: 20px;
}
</style>
