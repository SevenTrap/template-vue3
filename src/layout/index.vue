<template>
  <div class="header-placeholder"></div>
  <div class="layout-page-container">
    <router-view></router-view>
  </div>
  <title-bar class="layout-page-header"></title-bar>
  <SystemFunc></SystemFunc>
</template>

<script>
import TitleBar from "./components/TitleBar/index.vue";
import SystemFunc from "./components/SystemFunc/index.vue";

export default {
  name: "layout",
  components: { TitleBar, SystemFunc },
};
</script>

<style lang="scss" scoped>
.header-placeholder {
  width: 100vw;
  height: 85px;
}
.layout-page-container {
  width: 100vw;
  height: calc(100vh - 85px);
  position: relative;
}
</style>
