<template>
  <div ref="earthContainer" class="earth-container"></div>
</template>

<script>
import { initViewer, globalViewer as map } from "@/utils/initEarth";
import { queryServerList } from "./apis/index";

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
    map.destroy();
  },
};
</script>

<style lang="scss" scoped>
.earth-container {
  width: 100%;
  height: 100%;
}
</style>
