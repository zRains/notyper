export type PerSetting = {
  _class: string[]
  _props: { [k: string]: string }
  _styles: { [k: string]: string }
}

export type StoreParamsType = {
  state?: { [k: string]: any }
  mutations?: { [k: string]: Function }
  actions?: { [k: string]: Function }
}

/**
 * reseting: 重设store，准备下次操作
 * mutation: 正在改变状态
 * action: 正在发送一个action
 */
export type StoreStutus = 'mutation' | 'action' | 'reseting'
