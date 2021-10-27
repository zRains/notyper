import { PerSetting } from '../types'
import { styleConvert } from '../utils'

export const cursorPerStyles = {}

export class Cursor {
  private cursorNode: HTMLElement
  private cursorClass: string[]
  private cursorProps: { [k: string]: string }
  private cursorStyles: { [k: string]: string }
  constructor(cursorSetting: PerSetting) {
    this.cursorClass = cursorSetting._class
    this.cursorProps = cursorSetting._props
    this.cursorStyles = Object.assign(cursorPerStyles, cursorSetting._styles)
    this.cursorNode = this.init()
  }
  private init() {
    const node: HTMLElement = document.createElement('span')
    node.classList.add(...this.cursorClass)
    Object.keys(this.cursorProps).forEach(key => {
      node.setAttribute(key, this.cursorProps[key])
    })
    node.setAttribute('style', styleConvert(this.cursorStyles))
    return node
  }
  public getCursorNode() {
    return this.cursorNode
  }
}
