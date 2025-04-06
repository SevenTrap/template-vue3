<template>
  <div class="header-placeholder"></div>

  <div class="search-container">
    <div class="search-left">
      <label class="search-label">服务类型：</label>
      <el-select class="search-item" v-model="server_type">
        <el-option key="all" value="全部">全部</el-option>
        <el-option key="wms4326" value="wmts4326">wmts4326</el-option>
        <el-option key="wms3857" value="wmts3857">wmts3857</el-option>
        <el-option key="3dtiles" value="3dtiles">3dtiles</el-option>
      </el-select>

      <el-input class="search-item" v-model="server_name" type="text" placeholder="图层名称" clearable />

      <el-button class="search-btn" type="primary" @click="getServerList"> 搜索 </el-button>
    </div>

    <div class="search-right">
      <el-button type="primary" @click="addServer">添加服务</el-button>
    </div>
  </div>

  <div class="server-list">
    <table border="1">
      <thead>
        <tr>
          <th width="5%">序号</th>
          <th width="15%">服务名称</th>
          <th width="10%">服务类型</th>
          <th width="15%">数据名称</th>
          <th width="15%">服务地址</th>
          <th width="25%">数据路径</th>
          <th width="10%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr class="server-list-item" v-for="(item, index) in serverList" :key="index">
          <td class="list-item">{{ index + 1 + page_size * (page_num - 1) }}</td>
          <td class="list-item">{{ item.server_name }}</td>
          <td class="list-item">{{ item.server_type }}</td>
          <td class="list-item">{{ item.layer }}</td>
          <td class="list-item">{{ item.server_path }}</td>
          <td class="list-item">{{ item.path }}</td>
          <td class="list-item">
            <el-button type="info" @click="editServer(item)" link>编辑</el-button>
            <el-button type="danger" @click="deleteServer(item)" link>删除</el-button>
            <el-button type="primary" @click="viewServer(item)" link>查看</el-button>
          </td>
        </tr>
      </tbody>
    </table>

    <el-pagination
      :current-page="page_num"
      :page-size="page_size"
      :total="total"
      @current-change="getServerList"
      layout="prev, pager, next, jumper"
    />
  </div>
</template>

<script>
import { queryServerList } from "./apis/index";
export default {
  name: "ServerList",
  data() {
    return {
      serverList: [],
      total: 0,
      server_type: "全部",
      server_name: null,
      page_size: 10,
      page_num: 1,
    };
  },
  mounted() {
    this.getServerList();
  },
  methods: {
    async getServerList() {
      try {
        const response = await queryServerList({
          server_type: this.server_type === "全部" ? "" : this.server_type,
          server_name: this.server_name,
          layer: this.server_name,
          page_size: this.page_size,
          page_num: this.page_num,
        });

        if (response.code !== 200) {
          this.$message.error("获取服务列表失败");
          return;
        }

        this.total = response.data.total;
        this.serverList = response.data.serverList;

        this.$message.success("获取服务列表成功");
      } catch (error) {
        console.error("Error fetching server list:", error);
      }
    },

    addServer() {
      this.$router.push({ path: "/addServer" });
    },

    viewServer(item) {
      this.$router.push({ path: "/layout/homepage", query: { id: item.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.header-placeholder {
  height: 85px;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  margin-bottom: 20px;
  width: 100%;

  .search-left {
    display: flex;
    align-items: center;
  }

  .search-label {
    margin-right: 10px;
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }

  .search-item {
    margin-right: 10px;
    width: 240px;
  }

  .search-btn {
    width: 100px;
  }
}

.server-list {
  padding: 20px;
  width: 1440px;
  font-size: 16px;
  margin: 0 auto;

  table {
    text-align: center;
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #1e1f20;
    border-radius: 4px;
    margin-bottom: 20px;
    th {
      background-color: #007ffd;
      color: #333;
      font-weight: bold;
      padding: 10px;
    }
    td {
      padding: 5px 10px;
      color: #555;
    }

    .server-list-item {
      &:nth-child(odd) {
        background-color: #f2f2f2;
      }
    }
  }
}
</style>
