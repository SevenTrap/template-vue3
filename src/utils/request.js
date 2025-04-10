import axios from "axios";
import { setStorage, getStorage, removeStorage } from "@/utils/storage";

// 创建axios实例
const request = axios.create({
  timeout: 30000, // 请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加token
    const token = getStorage("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("请求错误", error);

    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    console.log("响应数据", response);
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    if (error.response) {
      // 根据状态码处理错误
      switch (error.response.status) {
        case 401:
          console.error("未授权，请登录");
          break;
        case 403:
          console.error("拒绝访问");
          break;
        case 404:
          console.error("请求地址不存在");
          break;
        default:
          console.error("服务器错误");
      }
    }
    return Promise.reject(error);
  }
);

// 封装GET请求
export const get = (url, params) => {
  return request.get(url, { params });
};

// 封装POST请求
export const post = (url, data) => {
  return request.post(url, data);
};

// 封装PUT请求
export const put = (url, data) => {
  return request.put(url, data);
};

// 封装DELETE请求
export const del = (url, params) => {
  return request.delete(url, { params });
};

export default request;
