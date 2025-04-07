<template>
  <router-view></router-view>
  <title-bar></title-bar>
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
