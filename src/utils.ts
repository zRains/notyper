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
 * 分割字符串
 * @param  text 被切割字符串
 * @param  tag 生成的标签
 * @param  _class 类
 * @param  _props 属性
 * @returns
 */
export function textSlicer(
  text: string,
  tag: keyof HTMLElementTagNameMap = 'span',
  _class: string[] = [],
  _props: { [key: string]: string } = {}
) {
  const typerResolvedChars = text.match(/\S|\s/g)
  return [
    ...(typerResolvedChars?.map(_char => {
      const charPackingTag: HTMLElement = document.createElement(tag)
      charPackingTag.classList.add(..._class)
      Object.keys(_props).forEach(key => {
        charPackingTag.setAttribute(key, _props[key])
      })
      charPackingTag.innerText = _char
      return charPackingTag
    }) || []),
  ]
}
