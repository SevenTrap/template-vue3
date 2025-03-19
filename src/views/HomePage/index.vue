<template>
  <div ref="earthContainer" class="earth-container"></div>
</template>

<script>
import { initViewer, globalViewer as map } from "@/utils/initEarth";
import { initLayer, initScene } from "./utils/spaceDeduce";
import * as mapWork from "./utils/spaceDeduce";
import { ElMessage } from "element-plus";

export default {
  name: "HomePage",
  components: {},
  data() {
    return {
      isPlay: false,
      timer: null,
      currentIndex: 0,
      animations: [],
      treeNodes: [
        {
          title: "卫星推演",
          key: 1,
          children: [
            {
              title: "初始化场景",
              key: "01-01",
              message: "正在初始化推演场景",
              times: 2,
              widget() {
                mapWork.initScene();
              },
            },
            {
              title: "需求受理",
              key: "01-02",
              times: 8,
              message: "中国资源卫星应用中心接收到需求，开始受理需求",
              widget() {
                mapWork.acceptance();
              },
            },
            {
              title: "任务编排",
              key: "01-03",
              times: 7,
              message: "中国资源卫星应用中心正在对任务进行编排",
              widget() {
                mapWork.task();
              },
            },
            {
              title: "任务上注",
              key: "01-04",
              times: 10,
              message: "中国资源卫星应用中心正在对任务进行上注处理",
              widget() {
                mapWork.startTask();
              },
            },
            {
              title: "卫星观测",
              key: "01-05",
              message: "通过卫星观测,返回观测数据",
              times: 15,
              widget() {
                mapWork.satelliteLook();
              },
            },
            {
              title: "数据接收",
              key: "01-06",
              times: 10,
              message: "接收到卫星返回的观测数据",
              widget() {
                mapWork.sendDataAction();
              },
            },
            {
              title: "数据传输",
              key: "01-07",
              message: "开始传输数据",
              times: 10,
              widget() {
                mapWork.transferringData();
              },
            },
            {
              title: "产品生产",
              key: "01-08",
              message: "开始生产产品",
              times: 5,
              widget() {
                mapWork.production();
              },
            },
            {
              title: "产品分发",
              key: "01-09",
              message: "对产品进行分发",
              times: 5,
              widget() {
                mapWork.distribution();
              },
            },
          ],
        },
      ],
    };
  },
  mounted() {
    let earthContainer = this.$refs.earthContainer;
    let center = { lat: 29, lng: 105, alt: 17000000, heading: 360, pitch: -89.8 };
    initViewer(earthContainer, center);

    this.initAnimations();

    initLayer();
    initScene();

    this.startPlay();
  },

  methods: {
    initAnimations() {
      this.animations = this.treeNodes[0].children;
    },
    async startPlay() {
      this.isPlay = true;
      if (this.timer) {
        clearInterval(this.timer);
      }

      if (this.currentIndex < this.animations.length) {
        const animate = this.animations[this.currentIndex];
        ElMessage.info(animate.message);
        await animate.widget();
        this.currentIndex++;
        this.timer = setTimeout(() => {
          this.startPlay();
        }, animate.times * 1000);

        if (this.currentIndex === this.animations.length) {
          clearTimeout(this.timer);
          this.currentIndex = 0;
          this.startPlay();
        }
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
  width: 100%;
  height: 100%;
}
</style>
