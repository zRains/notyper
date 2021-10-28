import store from './store'
import { PerSetting } from './types'
export default class Operation {
  public setChar(setting: Partial<PerSetting>) {
    store.commit('reCharSetting', setting)
    return this
  }
  public setCursor(setting: PerSetting) {
    store.commit('reCursorSetting', setting)
    return this
  }
}
