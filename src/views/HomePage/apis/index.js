const MAP_SERVER_URL = DOMAIN_CONFIG.MAP_SERVER_URL; // web球底图服务地址
import { get, post, put, del } from "@/utils/request";

export const queryServerList = (params) => {
  return get(`${MAP_SERVER_URL}/server/getServer`, params);
};
