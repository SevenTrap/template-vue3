import * as mars3d from "mars3d";
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import "mars3d/mars3d.css";
import { isEmpty } from "lodash-es";

let globalViewer = null;

// 初始化地球
function initViewer(el, center = {}) {
  // 初始化球时，自定义默认视角
  if (!isEmpty(center)) {
    MAP_CONFIG.scene.center = center;
  }

  globalViewer = new mars3d.Map(el, MAP_CONFIG);

  skyShow();

  return globalViewer;
}

// 加载天空盒
function skyShow() {
  globalViewer.scene.skyBox = new mars3d.Cesium.SkyBox({
    sources: {
      negativeX: "/assets/skyBox/px.png",
      negativeY: "/assets/skyBox/py.png",
      negativeZ: "/assets/skyBox/pz.png",
      positiveX: "/assets/skyBox/nx.png",
      positiveY: "/assets/skyBox/ny.png",
      positiveZ: "/assets/skyBox/nz.png",
    },
  });
}

export { globalViewer, initViewer };
