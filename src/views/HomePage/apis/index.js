import { get, post, del, put } from "@/utils/http";

// 根据服务ID获取服务信息
export const queryServerById = (param) => {
  return get("/server/getServerById", param);
};

export const queryIP = () => {
  return get("/getIP");
};
