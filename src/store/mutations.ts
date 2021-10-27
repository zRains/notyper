import { StoreParamsType, PerSetting } from '../types'
export default {
  reCharSetting(state: Required<StoreParamsType>['state'], val: PerSetting) {
    state.charSetting = Object.assign(state.charSetting, val)
  },
  reCursorSetting(state: Required<StoreParamsType>['state'], val: PerSetting) {
    state.cursorSetting = Object.assign(state.cursorSetting, val)
  },
}
