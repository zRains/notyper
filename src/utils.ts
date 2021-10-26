/**
 * 获取一定数量的随机数
 * @param  begin
 * @param  end 结束数字
 * @param  count 随机数个数
 * @param  exclude 排除数列表
 * @returns
 */
export function randomNumArr(
  begin = 0,
  end: number,
  count: number,
  exclude: number[]
) {
  const res: number[] = []
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
 * 返回可识别的css
 * @param styles 驼峰样式
 */
export function styleConvert(styles: { [k: string]: string }) {
  return Object.entries(styles)
    .map(
      ([k, v]) =>
        `${k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`)}:${v}`
    )
    .join(';')
}
