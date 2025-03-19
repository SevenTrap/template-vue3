<template>
  <div class="satellites-list">
    <h2>卫星列表({{ dataList.length }})</h2>
    <div class="satellites-container">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="satellites-item"
        @click="selectSatellites(item)"
        :class="{ selected: selectedSatellite.indexOf(item.id) !== -1 }"
      >
        <p>序号：{{ index + 1 }}</p>
        <p>编号：{{ item.id }}</p>
        <p>名称：{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SatellitesList",
  props: ["dataList"],
  data() {
    return {
      selectedSatellite: [],
    };
  },
  methods: {
    selectSatellites(item) {
      if (this.selectedSatellite.indexOf(item.id) !== -1) {
        this.$emit("selectSatellite", { data: item, type: false });
        this.selectedSatellite.splice(this.selectedSatellite.indexOf(item.id), 1);
      } else {
        this.$emit("selectSatellite", { data: item, type: true });
        this.selectedSatellite.push(item.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.satellites-list {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba($color: #333333, $alpha: 0.75);
  border: 1px solid rgba($color: #ffffff, $alpha: 0.75);
  top: 10px;
  right: 50px;
  border-radius: 4px;
  transition: all 0.3s;
  z-index: 999;

  h2 {
    color: #ffffff;
    font-size: 18px;
    margin: 0 0 15px;
    text-align: center;
  }

  .satellites-container {
    width: 100%;
    height: calc(100% - 40px);
    overflow: auto;
    .satellites-item {
      background-color: rgba($color: #333333, $alpha: 0.75);
      color: #ffffff;
      padding: 10px;
      margin-bottom: 10px;
      cursor: pointer;
      border-radius: 4px;
    }
    .selected {
      background-color: rgba($color: #49e90a, $alpha: 0.75);
    }
  }
}
</style>
