import { get, post, del, put } from "@/utils/http";
const MAP_SERVER_URL = DOMAIN_CONFIG.MAP_SERVER_URL;

export const addServer = (param) => {
  return get(`${MAP_SERVER_URL}/server/addServer`, param);
};

export const queryIP = () => {
  return get(`${MAP_SERVER_URL}/getIP`);
};
