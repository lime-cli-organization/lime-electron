<template>
  <div class="wrapper">
    <el-menu
      default-active="/template"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/template">模板中心</el-menu-item>
      <el-menu-item index="/task">任务中心</el-menu-item>
    </el-menu>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>
<style lang="less" scoped>
h4 {
  background-color: lightcyan;
  line-height: 4;
}
</style>
