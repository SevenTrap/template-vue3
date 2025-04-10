import { get, post, del, put } from "@/utils/http";
const MAP_SERVER_URL = DOMAIN_CONFIG.MAP_SERVER_URL;

// 获取服务器列表
export const queryServerList = (params) => {
  return get(`${MAP_SERVER_URL}/server/getServer`, params);
};

export const queryServerById = (param) => {
  return get(`${MAP_SERVER_URL}/server/getServerById`, param);
};

export const deleteServerById = (param) => {
  return get(`${MAP_SERVER_URL}/server/deleteServer`, param);
};

export const queryIP = () => {
  return get(`${MAP_SERVER_URL}/getIP`);
};
