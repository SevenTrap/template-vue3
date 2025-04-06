const MAP_SERVER_URL = DOMAIN_CONFIG.MAP_SERVER_URL;

const MAP_CONFIG = {
  scene: {
    center: { lat: 15.304567, lng: 113.710246, alt: 10000000, heading: 360, pitch: -89.9 },
    fog: false,
    fxaa: true,
    showSun: true,
    showMoon: true,
    showSkyBox: true,
    scene3DOnly: false,
    shouldAnimate: true,
    highDynamicRange: false,
    showSkyAtmosphere: false,
    globe: {
      showGroundAtmosphere: false,
      depthTestAgainstTerrain: false,
      baseColor: "#aac6ee",
      enableLighting: false,
    },
    cameraController: {
      zoomFactor: 3.0,
      // minimumZoomDistance: 1,
      // maximumZoomDistance: 30000000,
      enableRotate: true,
      enableZoom: true,
    },
    clock: {
      currentTime: "",
      multiplier: 1,
    },
  },
  control: {
    homeButton: true,
    zoom: {
      enabled: true,
    },
    mouseDownView: true,
    fullscreenButton: false,
    baseLayerPicker: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    contextmenu: {
      hasDefault: true,
    },
    timeline: true,
    clockAnimate: {
      enabled: true,
      format: "yyyy-MM-dd HH:mm:ss",
    },
    locationBar: {
      fps: false,
      crs: "EPSG4326",
      crsDecimal: 0,
    },
  },
  basemaps: [
    // {
    //   name: "天地图影像",
    //   icon: "https://data.mars3d.cn/img/thumbnail/basemap/tdt_img.png",
    //   type: "tdt",
    //   layer: "img_d",
    //   show: true,
    // },
    // {
    //   name: "基础底图(矢量)",
    //   icon: "/assets/mapConfig/shiliang_img.png",
    //   type: "group",
    //   show: true,
    //   layers: [
    //     {
    //       name: "矢量底图",
    //       icon: "/assets/mapConfig/yingxiang_img.png",
    //       url: `${MAP_SERVER_URL}/service/wmts`,
    //       type: "wmts",
    //       layer: ["Global_tiandituluwag-PNG-4326"],
    //       style: "",
    //       format: "image/png",
    //       version: "1.0.0",
    //       service: "WMTS",
    //       Request: "GetCapabilities",
    //       tileMatrixSetID: "EPSG:4326",
    //       tileMatrixLabels: [
    //         "EPSG:4326:0",
    //         "EPSG:4326:1",
    //         "EPSG:4326:2",
    //         "EPSG:4326:3",
    //         "EPSG:4326:4",
    //         "EPSG:4326:5",
    //         "EPSG:4326:6",
    //         "EPSG:4326:7",
    //         "EPSG:4326:8",
    //         "EPSG:4326:9",
    //         "EPSG:4326:10",
    //         "EPSG:4326:11",
    //         "EPSG:4326:12",
    //         "EPSG:4326:13",
    //         "EPSG:4326:14",
    //         "EPSG:4326:15",
    //         "EPSG:4326:16",
    //         "EPSG:4326:17",
    //       ],
    //       crs: "EPSG:4326",
    //     },
    //     {
    //       name: "矢量底图(注记)",
    //       icon: "/assets/mapConfig/yingxiang_img.png",
    //       url: `${MAP_SERVER_URL}/service/wmts`,
    //       type: "wmts",
    //       layer: ["Global_ImageLabel_tdt-PNG-4326"],
    //       style: "",
    //       format: "image/png",
    //       version: "1.0.0",
    //       service: "WMTS",
    //       Request: "GetCapabilities",
    //       tileMatrixSetID: "EPSG:4326",
    //       tileMatrixLabels: [
    //         "EPSG:4326:0",
    //         "EPSG:4326:1",
    //         "EPSG:4326:2",
    //         "EPSG:4326:3",
    //         "EPSG:4326:4",
    //         "EPSG:4326:5",
    //         "EPSG:4326:6",
    //         "EPSG:4326:7",
    //         "EPSG:4326:8",
    //         "EPSG:4326:9",
    //         "EPSG:4326:10",
    //         "EPSG:4326:11",
    //         "EPSG:4326:12",
    //         "EPSG:4326:13",
    //         "EPSG:4326:14",
    //         "EPSG:4326:15",
    //         "EPSG:4326:16",
    //         "EPSG:4326:17",
    //       ],
    //       crs: "EPSG:4326",
    //     },
    //   ],
    // },
  ],
  terrain: {
    url: `${MAP_SERVER_URL}/tilecache/service/terrain/Global_DEM-TINXIN-4326`,
    show: false,
  },
};
