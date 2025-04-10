<template>
  <!-- 页头占位：page-header-placeholder -->
  <div class="page-header-placeholder"></div>

  <div ref="earthContainer" class="earth-container"></div>
</template>

<script>
// import * as mars3d from "mars3d";
import { initViewer, globalViewer } from "@/utils/initEarth";

export default {
  name: "HomePage",
  components: {},
  data() {
    return {};
  },
  mounted() {
    let earthContainer = this.$refs.earthContainer;
    let center = { lat: 29, lng: 105, alt: 17000000, heading: 360, pitch: -89.8 };
    initViewer(earthContainer, center);
  },

  methods: {},
  beforeUnmount() {
    globalViewer.destroy();
  },
};
</script>

<style lang="scss" scoped>
.earth-container {
  width: 100%;
  height: calc(100vh - 85px);
}
</style>
