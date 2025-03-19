export const getSatelliteStatusName = (code) => {
  switch (code) {
    case "+":
      return "运作的";
    case "-":
      return "非运转的";
    case "P":
      return "部分运转,部分完成主要任务或次要任务";
    case "B":
      return "备份/备用,先前运行的卫星进入储备状态";
    case "S":
      return "备用,新卫星等待完全激活";
    case "X":
      return "扩展的任务";
    case "D":
      return "衰退的";
    case "?":
      return "未知的";
  }
  return code;
};
