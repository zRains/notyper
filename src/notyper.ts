import { TyperChar } from './chars'
import { perSetting } from './types'

class Notyper {
  private rootEl: HTMLElement
  private typers: string[]
  private typersSlice: string[][]
  private typersConverted: TyperChar[][]
  private charPerSetting: perSetting
  private cursorPerSetting: perSetting
  constructor($rootEl: HTMLElement | string, typers: string[]) {
    this.rootEl =
      typeof $rootEl === 'string'
        ? <HTMLElement>document.querySelector($rootEl)
        : $rootEl
    if (!this.rootEl) throw new Error('notyper root element no found')
    this.typers = typers
    this.typersSlice = []
    this.typersConverted = []
    this.charPerSetting = new Proxy<perSetting>(
      {
        _class: [],
        _props: {},
        _styles: {},
      },
      {
        set(target, key, value) {
          console.log(Object.keys(this))
          return Reflect.set(target, key, value)
        },
      }
    )
    this.cursorPerSetting = new Proxy<perSetting>(
      {
        _class: [],
        _props: {},
        _styles: {},
      },
      {
        set(target, key, value) {
          console.log(Object.keys(this))
          return Reflect.set(target, key, value)
        },
      }
    )
    this.typersSliceExc()
    this.typersConvertExc()
    this.render()
  }
  private typersSliceExc() {
    this.typersSlice = this.typers.map(typer => typer.match(/\S|\s/g) ?? [])
  }
  private typersConvertExc() {
    this.typersConverted = this.typersSlice.map(typer =>
      typer.map(char => new TyperChar(char, this.charPerSetting))
    )
  }
  // 渲染
  private render() {
    this.rootEl.append(
      ...this.typersConverted[0].map(typer => typer.getCharNode())
    )
  }
  // 设置字符
  public setChar(setting: perSetting) {
    ;(Object.keys(setting) as (keyof perSetting)[]).forEach(k => {
      this.charPerSetting[k] = setting[k] as any
    })
    return this
  }
  // 设置光标
  public setCursor(setting: perSetting) {
    ;(Object.keys(setting) as (keyof perSetting)[]).forEach(k => {
      this.cursorPerSetting[k] = setting[k] as any
    })
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
