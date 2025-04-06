import { get, post, del, put } from "@/utils/http";

// 获取服务器列表
export const queryServerList = (params) => {
  return get("/server/getServer", params);
};

export const queryServerById = (param) => {
  return get("/server/getServerById", param);
};
