
import { http } from "@/utils/http.js";

const uri = DomainConfig.severURI;

/**
 * 轮询日志列表
 * @param {*Number} is_read 是否已读,0是未读1是已读
 * @returns
 */
export function queryLogList(params) {
  return http({
    url: uri + "/receive_and_dispatch_api/v1.0/log/find_receive_log",
    method: "get",
    params: params
  });
}

