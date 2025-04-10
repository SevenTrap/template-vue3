import { get, post, del, put } from "@/utils/http";
const MAP_SERVER_URL = DOMAIN_CONFIG.MAP_SERVER_URL;

// 根据服务ID获取服务信息
export const queryServerById = (param) => {
  return get(`${MAP_SERVER_URL}/server/getServerById`, param);
};

export const queryIP = () => {
  return get(`${MAP_SERVER_URL}/getIP`);
};
