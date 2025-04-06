<template>
  <div class="header-placeholder"></div>

  <div class="server-publish">
    <label>服务名称</label>
    <el-input v-model="dataList.server_name" placeholder="请输入服务名称" />

    <label>服务类型</label>
    <el-select v-model="dataList.server_type" placeholder="请选择服务类型">
      <el-option label="3dtiles" value="3dtiles"></el-option>
      <el-option label="wmts4326" value="wmts4326"></el-option>
      <el-option label="wmts3857" value="wmts3857"></el-option>
    </el-select>

    <label>数据名称</label>
    <el-input v-model="dataList.layer" placeholder="请输入数据名称" />

    <label>数据格式</label>
    <el-select v-model="dataList.image_type" placeholder="请选择数据格式">
      <el-option label="image/png" value="image/png"></el-option>
      <el-option label="image/jpeg" value="image/jpeg"></el-option>
      <el-option label="application/json" value="application/json"></el-option>
    </el-select>

    <label>数据路径</label>
    <el-input v-model="dataList.path" placeholder="请输入数据路径" />
  </div>

  <div class="server-publish">
    <el-button type="primary" @click="addServer">添加服务</el-button>
  </div>
</template>

<script>
export default {
  name: "ServerPublish",
  data() {
    return {
      dataList: {
        name: "",
        type: "",
        format: "",
        path: "",
        url: "",
        serverName: "",
      },
    };
  },

  mounted() {},

  methods: {
    addServer() {
      const { server_name, server_type, layer, image_type, path } = this.dataList;

      if (!server_name || !server_type || !layer || !image_type || !path) {
        this.$message.error("请填写完整的服务信息");
        return;
      }

      const params = {
        server_name,
        server_type,
        layer,
        image_type,
        path,
      };

      this.$http.post("/api/server/publish", params).then((res) => {
        if (res.status === 200) {
          this.$message.success("服务添加成功");
          this.$router.push({ name: "ServerList" });
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
</style>
