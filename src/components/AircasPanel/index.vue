<template>
  <div class="aircas-panel" :style="{ ...initStyle, 'z-index': currentPanelIndex }">
    <!-- 顶部区域 -->

    <div class="panel-head" v-show="isMin && isTitle" @click.stop="handlerChangeIndex">
      <div class="head-left">
        <img src="./assets/title-img.png" style="transform: rotatey(180deg)" />
        <span style="padding: 0 5px">{{ title }}</span>
        <img src="./assets/title-img.png" />
      </div>

      <!-- 顶部右侧关闭按钮 -->
      <div class="head-right" v-show="isFunc">
        <FullScreen class="close-btn" @click.stop="isMin = false" />
        <Close class="close-btn" @click.stop="handlerCloseAircasPanel" />
      </div>
    </div>

    <!-- 顶部区域 -->
    <div class="panel-head" v-show="!isMin && isTitle" :ref="panelID" @click.stop="handlerChangeIndex">
      <div class="head-left">
        <img src="./assets/title-img.png" style="transform: rotatey(180deg)" />
        <span>{{ title }}</span>
        <img src="./assets/title-img.png" />
      </div>

      <!-- 顶部右侧关闭按钮 -->
      <div class="head-right" v-show="isFunc">
        <Minus class="close-btn" @click.stop="isMin = true" />
        <Close class="close-btn" @click.stop="handlerCloseAircasPanel" />
      </div>
    </div>

    <div class="panel-body" v-show="!isMin" :style="{ width: width + 'px', height: panelHeight }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import { useAircasPanelStore } from "@/store/useAircasPanelStore.js";
import { useDraggable } from "@vueuse/core";

export default {
  name: "AircasPanel",
  props: {
    title: {
      type: String,
      default: "插件面板",
    },
    isTitle: {
      type: Boolean,
      default: true,
    },
    width: {
      type: [Number, String],
      default: 300,
    },
    height: {
      type: [Number, String],
      default: 400,
    },
    top: {
      type: [Number, String],
      default: 120,
    },
    bottom: {
      type: [Number, String],
      default: -9999,
    },
    left: {
      type: [Number, String],
      default: 100,
    },
    right: {
      type: [Number, String],
      default: -9999,
    },
    isStatic: {
      type: Boolean,
      default: true,
    },
    isFunc: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isMin: false,
      panelID: null,
      currentPanelIndex: null,
      _top: null,
      _left: null,
    };
  },

  beforeMount() {
    this.panelID = uuidv4();
    const store = useAircasPanelStore();
    this.currentPanelIndex = store.GET_CURRENT_PENAL_INDEX + 1;
    store.UPDATE_PENAL_INDEX(this.currentPanelIndex);
  },

  mounted() {
    const panelPage = this.$refs[this.panelID];
    const { x, y } = useDraggable(panelPage, {
      disabled: this.isStatic,
    });

    this._left = x;
    this._top = y;
  },

  computed: {
    initStyle() {
      let _style = {};
      if (isFinite(this.width)) {
        _style.width = this.width + "px";
      } else {
        _style.width = this.width;
      }

      if (this._top != 0 || this._left != 0) {
        _style.top = this._top + "px";
        _style.left = this._left + "px";
        return _style;
      }

      if (this.bottom != -9999) {
        if (isFinite(this.bottom)) {
          _style.bottom = this.bottom + "px";
        } else {
          _style.bottom = this.bottom;
        }
      } else {
        if (isFinite(this.top)) {
          _style.top = this.top + "px";
        } else {
          _style.top = this.top;
        }
      }

      if (this.right != -9999) {
        if (isFinite(this.right)) {
          _style.right = this.right + "px";
        } else {
          _style.right = this.right;
        }
      } else {
        if (isFinite(this.left)) {
          _style.left = this.left + "px";
        } else {
          _style.left = this.left;
        }
      }

      return _style;
    },

    // 设置弹窗高度
    panelHeight() {
      if (this.isTitle) {
        return isFinite(this.height) ? `${this.height - 38}px` : `calc(${this.height} - 38px)`;
      } else {
        return isFinite(this.height) ? `${this.height}px` : `${this.height}`;
      }
    },
  },

  methods: {
    handlerChangeIndex() {
      const store = useAircasPanelStore();
      this.currentPanelIndex = store.GET_CURRENT_PENAL_INDEX + 1;
      store.UPDATE_PENAL_INDEX(this.currentPanelIndex);
    },

    handlerCloseAircasPanel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.aircas-panel {
  overflow: hidden !important;
  border: 1px solid var(--aircas-color-border);
  position: absolute;
  border-radius: 4px;
  box-shadow: 0 0 3px 1px var(--aircas-color-border);
  background-color: var(--aircas-color-background);

  .panel-head {
    height: 38px;
    width: 100%;
    border-radius: 4px 4px 0px 0px;
    border-bottom: 1px solid var(--aircas-color-border);
    padding: 0 12px;
    background: var(--aircas-color-background);
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;

    .head-left {
      display: flex;
      align-items: center;

      span {
        font-size: 16px;
        padding: 0 5px;
        font-weight: bolder;
        color: #00ffff;
      }
    }

    // TODO 按钮的颜色以及hover颜色可以重新设计
    .head-right {
      display: flex;
      align-items: center;

      .close-btn {
        font-size: 16px;
        font-weight: bold;
        width: 24px;
        height: 24px;
        text-align: center;
        border-radius: 2px;
        color: #e1e1e1;
        background: rgba($color: #ffffff, $alpha: 0.2);
        margin-left: 3px;
        transition: all 0.3s;
        cursor: pointer;

        &:hover {
          background: var(--aircas-color-button-active-background);
        }
      }
    }
  }

  .panel-body {
    transition: all 0.3s;
    overflow: auto;
  }
}
</style>
