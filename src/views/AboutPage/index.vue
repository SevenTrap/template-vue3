<template>
  <!-- 页头占位：page-header-placeholder -->
  <div class="page-header-placeholder"></div>

  <div class="page-container">
    <h1>About</h1>
    <p>About page</p>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: calc(100vh - 85px);
  background-image: url("./assets/background.jpg");
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
