// GPS卫星系列
export const GPS = [
  20959, 22877, 23953, 24876, 25933, 26360, 26407, 26605, 26690, 27663, 27704, 28129, 28190, 28361, 28474, 28874, 29486,
  29601, 32260, 32384, 32711, 35752, 36585, 37753, 38833, 39166, 39533, 39741, 40105, 40294, 40534,
];
// GLONASS卫星系列
export const GLONASS = [
  28915, 29672, 29670, 29671, 32276, 32275, 32393, 32395, 36111, 36112, 36113, 36400, 36402, 36401, 37139, 37138, 37137,
  37829, 37869, 37867, 37868, 39155, 39620, 40001,
];
// INMARSAT卫星系列
export const INMARSAT = [
  20918, 21149, 21814, 21940, 23839, 24307, 24674, 24819, 25153, 28628, 28899, 33278, 40384, 39476,
];
// LANDSAT卫星系列
export const LANDSAT = [25682, 39084];
// DIGITALGLOBE卫星系列
export const DIGITALGLOBE = [25919, 32060, 33331, 35946, 40115];

export const LEO_MAX_HEIGHT = 2000 * 1000; // 单位为米
export const MEO_MAX_HEIGHT = 34000 * 1000; // 单位为米
export const zAxisHeight = 36000 * 1000; // 单位为米
export const leoSlope = 5; // z轴低轨区域斜率
export const meoSlope = 0.2; // z轴中轨区域斜率
export const geoSlope = 2; // z轴高轨区域斜率
export const lonStep = 10; // 经度刻度划分
export const latStep = 10; // 纬度刻度划分
export const lowSateStep = 500; // z轴低轨区域刻度步长
export const midSateStep = 5000; // z轴中轨区域刻度步长
export const highSateStep = 2000; // z轴高轨区域刻度步长
export const highSteps = 2; //显示的高轨刻度数

export const segmentedLinearTransform = (height) => {
  if (height <= LEO_MAX_HEIGHT) {
    return height * leoSlope;
  } else if (height > LEO_MAX_HEIGHT && height <= MEO_MAX_HEIGHT) {
    return (height - LEO_MAX_HEIGHT) * meoSlope + LEO_MAX_HEIGHT * leoSlope;
  } else {
    return (
      geoSlope * (height - MEO_MAX_HEIGHT) + (MEO_MAX_HEIGHT - LEO_MAX_HEIGHT) * meoSlope + LEO_MAX_HEIGHT * leoSlope
    );
  }
};
