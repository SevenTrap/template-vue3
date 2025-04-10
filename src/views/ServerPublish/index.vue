<template>
  <div class="header-placeholder"></div>

  <div class="server-publish">
    <label>服务名称:</label>
    <el-input v-model="dataList.server_name" placeholder="请输入服务名称" />

    <label>服务类型:</label>
    <el-select v-model="dataList.server_type" placeholder="请选择服务类型">
      <el-option label="3dtiles" value="3dtiles"></el-option>
      <el-option label="wmts4326" value="wmts4326"></el-option>
      <el-option label="wmts3857" value="wmts3857"></el-option>
    </el-select>

    <label>数据名称(图层名称，同类型服务必须唯一):</label>
    <el-input v-model="dataList.layer" placeholder="请输入数据名称" />

    <label>数据格式(4326/3857必填，其他可不填写)</label>
    <el-select v-model="dataList.image_type" placeholder="请选择数据格式">
      <el-option label="image/png" value="image/png"></el-option>
      <el-option label="image/jpeg" value="image/jpeg"></el-option>
    </el-select>

    <label>数据路径:</label>
    <el-input v-model="dataList.path" placeholder="请输入数据路径" />
  </div>

  <div class="server-publish">
    <el-button type="primary" @click="handleAddServer">添加服务</el-button>
  </div>
</template>

<script>
import { addServer } from "./apis/index";
export default {
  name: "ServerPublish",
  data() {
    return {
      dataList: {
        server_type: "",
        image_type: "",
        path: "",
        server_name: "",
        layer: "",
      },
    };
  },

  mounted() {},

  methods: {
    handleAddServer() {
      const options = {
        layer: this.dataList.layer,
        server_name: this.dataList.server_name,
        server_type: this.dataList.server_type,
        _path: this.dataList.path,
        image_type: this.dataList.image_type,
      };

      console.log("options", options);

      if (!options.server_name || !options.server_type || !options.layer || !options._path) {
        this.$message.info("请填写完整的服务信息");
        return;
      }

      addServer(options).then((res) => {
        console.log("res", res);

        if (res.status === 200) {
          this.$message.success("服务添加成功");
        } else {
          this.$message.error("服务添加失败");
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-placeholder {
  width: 100vw;
  height: 85px;
}

.server-publish {
  width: 980px;
  padding: 20px;
  margin: 0 auto;

  label {
    display: block;
    margin: 20px 0 5px;
    font-size: 14px;
    color: #333;
  }
}
</style>
