/**
 * 将对象转换成&拼接的字符串
 * @param {object} obj 需要转换的对象
 * @returns 转换后的字符串
 */
export const obj2params = (obj) => {
  const arr = [];
  for (const key in obj) {
    arr.push(key + '=' + obj[key]);
  }
  return arr.join('&');
};
