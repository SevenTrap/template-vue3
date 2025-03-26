<template>
  <div ref="earthContainer" class="earth-container"></div>
</template>

<script>
import { initViewer, globalViewer as map } from "@/utils/initEarth";
import * as mars3d from "mars3d";

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
    this.initData();
  },

  methods: {
    initData() {
      const tiles3dLayer = new mars3d.layer.TilesetLayer({
        name: "3D Tiles",
        url: "http://localhost:3000/PointCloud/PointCloudBatched/tileset.json",
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        flyTo: true,
      });

      map.addLayer(tiles3dLayer);
    },
  },
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
