<template>
  <div ref="earthContainer" class="earth-container"></div>

  <aircas-panel title="地图数据加载" :width="400" :height="300" left="20px" :isStatic="false">
    <div class="map-loading">
      <div class="param-item">
        <label>服务名称：</label>
        <span>{{ server_name }}</span>
      </div>

      <div class="param-item">
        <label>服务类型：</label>
        <span>{{ server_type }}</span>
      </div>

      <div class="param-item">
        <button class="load-btn" @click="clearMap">清除</button>
        <button class="load-btn" @click="loadMap">加载</button>
      </div>
    </div>
  </aircas-panel>
</template>

<script>
import { initViewer, globalViewer as map } from "@/utils/initEarth";
import * as mars3d from "mars3d";
const MAP_SERVER_URL = DOMAIN_CONFIG.MAP_SERVER_URL;
import { queryServerById } from "./apis/index";

export default {
  name: "HomePage",

  data() {
    return {
      id: this.$route.query.id,
      server_name: null,
      server_type: null,
      layer: null,
      server_path: null,
      image_type: null,
    };
  },
  mounted() {
    let earthContainer = this.$refs.earthContainer;
    let center = { lat: 29, lng: 105, alt: 17000000, heading: 360, pitch: -89.8 };
    initViewer(earthContainer, center);
    this.initData();
  },

  watch: {
    id: {
      handler(newVal) {
        if (newVal) {
          queryServerById({ id: newVal }).then((res) => {
            if (res.code === 200) {
              const { server_name, server_path, server_type, layer, image_type } = res.data;

              this.server_name = server_name;
              this.server_path = server_path;
              this.server_type = server_type;
              this.layer = layer;
              this.image_type = image_type;

              console.log(res.data);

              this.loadMap();

              // if (server_type === "wmts4326") {
              //   this.loadWmts4326Layer();
              // } else if (server_type === "wmts3857") {
              //   this.loadWmts3857Layer();
              // } else if (server_type === "3dtiles") {
              //   this.load3dTilesLayer();
              // }
            }
          });
        }
      },
      immediate: true,
    },
  },

  methods: {
    initData() {
      const tileLayer = new mars3d.layer.WmtsLayer({
        name: "wmts_base",
        url: `${MAP_SERVER_URL}/wmts4326/getTile`,
        layer: "Global_Image_4326",
        style: "default",
        format: "image/jpeg",
        version: "1.0.0",
        crs: "EPSG:4326", // 必须填写
        tileMatrixSetID: "EPSG:4326", // 必须填写
      });
      map.addLayer(tileLayer);
    },

    loadMap() {
      if (this.server_type === "wmts4326") {
        this.loadWmts4326Layer();
      } else if (this.server_type === "wmts3857") {
        this.loadWmts3857Layer();
      } else if (this.server_type === "3dtiles") {
        this.load3dTilesLayer();
      }
    },

    loadWmts4326Layer() {
      const tileLayer = new mars3d.layer.WmtsLayer({
        name: this.server_name || "WMTS4326", // 显示的图层名称
        url: `${MAP_SERVER_URL}${this.server_path}`,
        layer: this.layer,
        style: "default",
        format: `image/${this.image_type}`,
        version: "1.0.0",
        crs: "EPSG:4326", // 必须填写
        tileMatrixSetID: "EPSG:4326", // 必须填写
        flyTo: true,
      });
      map.addLayer(tileLayer);
      this.currentLayer = tileLayer;
    },

    loadWmts3857Layer(url, name) {
      const tileLayer = new mars3d.layer.WmtsLayer({
        name: this.server_name || "WMTS3857", // 显示的图层名称
        url: `${MAP_SERVER_URL}${this.server_path}`,
        layer: this.layer,
        style: "default",
        format: `image/${this.image_type}`,
        version: "1.0.0",
        crs: "EPSG:3857", // 必须填写
        tileMatrixSetID: "EPSG:3857", // 必须填写
        flyTo: true,
      });
      map.addLayer(tileLayer);
      this.currentLayer = tileLayer;
    },

    load3dTilesLayer(url, name) {
      const tiles3dLayer = new mars3d.layer.TilesetLayer({
        name: name || "3D Tiles",
        url: url,
        maximumScreenSpaceError: 1,
        maximumMemoryUsage: 1024,
        flyTo: true,
      });
      map.addLayer(tiles3dLayer);
      this.currentLayer = tiles3dLayer;
    },

    clearMap() {
      if (this.currentLayer) {
        map.removeLayer(this.currentLayer);
        this.currentLayer = null;
      }
    },
  },
  beforeUnmount() {
    map.destroy();
  },
};
</script>

<style lang="scss" scoped>
.earth-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

.map-loading {
  color: #f7f7f7;
  font-size: 16px;
  padding: 5px 10px;
  text-align: center;

  .param-item {
    padding: 10px 0;
    display: flex;
    justify-content: space-around;

    label {
      width: 80px;
      text-align: right;
    }

    select {
      border: 1px solid #ccc;
      outline: none;
      flex-grow: 1;
      color: #f7f7f7;
      background: rgba($color: #000, $alpha: 0.5);
    }

    textarea {
      border: 1px solid #ccc;
      outline: none;
      flex-grow: 1;
      resize: vertical;
      padding: 3px 5px;
      height: 40px;
      color: #f7f7f7;
      background: rgba($color: #000, $alpha: 0.5);
    }

    input {
      border: 1px solid #ccc;
      outline: none;
      flex-grow: 1;
      padding: 3px 5px;
      color: #f7f7f7;
      background: rgba($color: #000, $alpha: 0.5);
    }
  }

  .load-btn {
    text-align: center;
    width: 120px;
    font-size: 16px;
    height: 32px;
    line-height: 32px;
    outline: none;
    cursor: pointer;
  }
}
</style>
