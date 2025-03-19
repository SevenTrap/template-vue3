<template>
  <div class="header-placeholder"></div>
  <button @click="handleReadPNG">读取图片</button>

  <p>{{ dataList }}</p>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      dataList: null,
    };
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
.header-placeholder {
  width: 100vw;
  height: 85px;
}
</style>
