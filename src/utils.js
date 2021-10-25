/**
 * 获取一定数量的随机数
 * @param {number} begin
 * @param {number} end 结束数字
 * @param {number} count 随机数个数
 * @param {number[]} exclude 排除数列表
 * @returns {number[]}
 */
export function randomNumArr(begin = 0, end, count, exclude) {
  const res = []
  let _i
  if (begin >= end) return []
  while (true) {
    _i = Math.floor(Math.random() * end + begin)
    if (res.includes(_i) || exclude.includes(_i)) continue
    else res.push(_i)
    if (res.length >= count) return res
  }
}

/**
 * 分割字符串
 * @param {string} text 被切割字符串
 * @returns {string}
 */
export function textSlicer(text) {
  return text
    .replace(/\S/g, '<span>$&</span>')
    .replace(/\s/g, '<span>&nbsp;</span>')
}
