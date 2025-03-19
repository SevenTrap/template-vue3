<template>
  <!-- 页面右上角功能菜单 -->
  <div class="iconbtns-box">
    <!-- 显示用户名 -->
    <label class="user-box">
      {{ userName }}
    </label>

    <!-- 进入课题6.1数据中台页面 -->
    <a class="icon-btn" href="javascript:void(0)" title="数据中台" target="_blank">
      <img src="./assets/task01.svg" alt="数据中台" />
    </a>

    <!-- 进入课题6.2知识图谱页面 -->
    <a class="icon-btn" href="javascript:void(0)" title="知识图谱" target="_blank">
      <img src="./assets/task02.svg" alt="知识图谱" />
    </a>

    <!-- 退出登录logout -->
    <span class="icon-btn" title="退出登录" @click="signOut">
      <img src="./assets/logout.svg" />
    </span>
  </div>
</template>

<script>
const SHUJUZHONGTAI = DOMAIN_CONFIG.SHUJUZHONGTAI;
const ZHISHITUPU = DOMAIN_CONFIG.ZHISHITUPU;
import { removeStorage } from "@/utils/storage.js";

export default {
  name: "SystemFunc",
  data() {
    return {
      SHUJUZHONGTAI,
      ZHISHITUPU,
      userName: "项目六用户",
    };
  },
  methods: {
    // TODO 用户退出登录 需要进行二次确认
    signOut() {
      removeStorage("token");
      this.$router.push({
        path: "/login",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.iconbtns-box {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: end;

  .user-box {
    font-size: 16px;
    font-weight: bold;
    line-height: 24px;
    color: #ffffff;

    .user-icon {
      font-size: 18px;
    }
  }

  .icon-btn {
    width: 28px;
    height: 28px;
    line-height: 30px;
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background-color: #0a95ab;
    padding: 3px;
    margin-left: 6px;
    color: #f7f7f7;
    transition: all 0.5s;

    &:hover {
      background-color: #ad5a18;
    }

    img {
      width: 18px;
      height: 18px;
    }
  }
}
</style>
