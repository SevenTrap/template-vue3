<template>
  <!-- 页面右上角功能菜单 -->
  <div class="iconbtns-box">
    <!-- 显示用户名 -->
    <label class="user-box">
      {{ userName }}
    </label>

    <a
      class="icon-btn"
      target="_blank"
      v-for="(item, index) in menuQuickList"
      :href="item.path"
      :title="item.label"
      :key="index"
    >
      <i v-if="item.iconType === 'fa'" class="user-icon fa" :class="`fa-${item.iconName}`" aria-hidden="true"></i>
      <el-icon v-if="item.iconType === 'element'" class="user-icon">
        <component :is="item.iconName" />
      </el-icon>
    </a>

    <!-- 退出登录logout -->
    <span class="icon-btn" title="退出登录" @click="signOut">
      <img src="./assets/logout.svg" />
    </span>
  </div>
</template>

<script>
import { removeStorage, getStorage } from "@/utils/storage.js";
const menuQuickList = SYSTEM_CONFIG.menuQuickList;

export default {
  name: "SystemFunc",
  data() {
    return {
      menuQuickList,
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
  computed: {
    userName() {
      let username = getStorage("username");
      if (!username) {
        return "none";
      }
      return username.toLocaleUpperCase();
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
    // width: 28px;
    padding: 0 10px;
    height: 28px;
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    border-radius: 4px;
    background-color: #ad5a18;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
  }

  .icon-btn {
    width: 28px;
    height: 28px;
    border-radius: 4px;
    cursor: pointer;
    background-color: #0a95ab;
    padding: 3px;
    margin-left: 6px;
    color: #f7f7f7;
    transition: all 0.5s;
    display: flex;
    justify-content: center;
    align-items: center;

    .user-icon {
      font-size: 18px;
      color: #ffffff;
    }

    img {
      width: 18px;
      height: 18px;
    }

    &:hover {
      background-color: #ad5a18;
    }
  }
}
</style>
