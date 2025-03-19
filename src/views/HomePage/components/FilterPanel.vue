<template>
  <div class="filter-panel">
    <h2>卫星筛选</h2>

    <div class="filter-item">
      <input class="filter-input" v-model="formState.name" type="text" placeholder="输入卫星名称/编号" />
      <button class="filter-btn" @click="handleSearch">搜索</button>
    </div>

    <div class="filter-item">
      <label>系列卫星：</label>
      <el-select v-model="formState.selXiLie" placeholder="请选择" @change="handleSearch">
        <el-option v-for="item in selXiLieOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <footer>
      <el-upload
        class="reset-btn"
        :auto-upload="false"
        :limit="1"
        :on-change="handleChange"
        :on-remove="handleClear"
        accept=".json"
        action=""
      >
        上传
      </el-upload>
    </footer>
  </div>
</template>

<script>
import { selXiLieOptions, selCountryOptions, selTypeOptions, selGuidaoOptions } from "./filterPanelConfig.js";
import { GPS, GLONASS, INMARSAT, LANDSAT, DIGITALGLOBE } from "../utils/satelliteConfig.js";
export default {
  name: "FilterPanel",
  data() {
    return {
      data: null,
      selXiLieOptions,
      selCountryOptions,
      selTypeOptions,
      selGuidaoOptions,
      formState: {
        name: "",
        selXiLie: "all",
      },
    };
  },
  methods: {
    handleChange(file) {
      this.formState = {
        name: "",
        selXiLie: "all",
      };
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.data = data;
          this.$emit("handleFilter", data);
        } catch (error) {
          console.log(error);
        }
      };
      if (file.raw.size) {
        reader.readAsText(file.raw);
      }
    },

    handleSearch() {
      let result = [];
      const data = this.data;
      const name = this.formState.name;
      const selXiLie = this.formState.selXiLie;

      if (!this.data.length) return;

      if (name) {
        result = data.filter((item) => {
          if ((item.name && item.name.indexOf(name) !== -1) || (item.id && item.id == name)) {
            return item;
          }
        });
      } else {
        result = data;
      }

      if (selXiLie !== "all") {
        result = result.filter((item) => {
          switch (selXiLie) {
            case "gps":
              if (GPS.indexOf(item.id) !== -1) return item;
              break;
            case "glonass":
              if (GLONASS.indexOf(item.id) !== -1) return item;
              break;
            case "inmarsat":
              if (INMARSAT.indexOf(item.id) !== -1) return item;
              break;
            case "landsat":
              if (LANDSAT.indexOf(item.id) !== -1) return item;
              break;
            case "digitalglobe":
              if (DIGITALGLOBE.indexOf(item.id) !== -1) return item;
              break;
          }
        });
      }

      this.$emit("handleFilter", result);
    },

    handleClear() {
      this.formState = {
        name: "",
        selXiLie: "all",
      };
      this.$emit("handleFilter", []);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-panel {
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: rgba($color: #333333, $alpha: 0.75);
  border: 1px solid rgba($color: #ffffff, $alpha: 0.75);
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 4px;
  transition: all 0.3s;
  z-index: 999;

  h2 {
    color: #ffffff;
    font-size: 18px;
    margin: 0 0 15px;
    text-align: center;
  }

  .filter-item {
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;

    label {
      width: 120px;
    }

    .filter-input {
      width: calc(100% - 90px);
      height: 32px;
      padding: 5px 10px;
      border-radius: 4px;
      border: 1px solid rgba($color: #ffffff, $alpha: 0.75);
      outline: none;
    }
    .filter-btn {
      width: 80px;
      height: 32px;
      cursor: pointer;
      background-color: #3385ff;
      color: #ffffff;
      border: 0;
      border-radius: 4px;
      transition: all 0.3s;
      &:hover {
        background-color: rgba($color: #3385ff, $alpha: 0.75);
      }
    }
  }

  footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px 0;

    .reset-btn {
      margin: 0 5px;
      width: 160px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      background-color: #3385ff;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: rgba($color: #3385ff, $alpha: 0.75);
      }
    }
  }
}
</style>
