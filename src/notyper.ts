import { TyperChar } from './components/chars'
import { PerSetting } from './types'
import store from './store'

class Notyper {
  private rootEl: HTMLElement
  private typers: string[]
  private typersSlice: string[][]
  private typersConverted: TyperChar[][]
  constructor($rootEl: HTMLElement | string, typers: string[]) {
    this.rootEl =
      typeof $rootEl === 'string'
        ? <HTMLElement>document.querySelector($rootEl)
        : $rootEl
    if (!this.rootEl) throw new Error('notyper root element no found')
    this.typers = typers
    this.typersSlice = []
    this.typersConverted = []
    this.typersSliceExc()
    this.typersConvertExc()
    this.render()
  }
  private typersSliceExc() {
    this.typersSlice = this.typers.map(typer => typer.match(/\S|\s/g) ?? [])
  }
  private typersConvertExc() {
    this.typersConverted = this.typersSlice.map(typer =>
      typer.map(char => new TyperChar(char))
    )
  }
  // 渲染
  private render() {
    this.rootEl.append(
      ...this.typersConverted[0].map(typer => typer.getCharNode())
    )
  }
  // 设置字符
  public setChar(setting: PerSetting) {
    store.commit('reCharSetting', setting)
    return this
  }
  // 设置光标
  public setCursor(setting: PerSetting) {
    store.commit('reCursorSetting', setting)
    return this
  }
  public addTyper(typer: string | string[]) {
    if (typeof typer === 'string') {
      this.typers.push(typer)
    } else {
      this.typers.push(...typer)
    }
    return this
  }
  public getRootEl() {
    return this.rootEl
  }
}

export function createNotyper(
  rootEl: HTMLElement | string,
  typers: string[] = []
) {
  return new Notyper(rootEl, typers)
}
