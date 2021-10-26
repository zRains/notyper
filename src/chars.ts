import { perSetting } from './types'
import { styleConvert } from './utils'

export const charPerStyles = {
  fontSize: '18px',
}

export class TyperChar {
  private char
  private tag
  private charWidth
  private charNode
  private charClass
  private charProps
  private charStyles
  constructor(
    char: string,
    charSetting: perSetting,
    tag: keyof HTMLElementTagNameMap = 'span'
  ) {
    this.char = char
    this.tag = tag
    this.charClass = charSetting._class
    this.charProps = charSetting._props
    this.charStyles = Object.assign(charPerStyles, charSetting._styles)
    this.charNode = this.init()
    this.charWidth = this.charNode.getBoundingClientRect().width
  }
  private init() {
    const node: HTMLElement = document.createElement(this.tag)
    node.classList.add(...this.charClass)
    Object.keys(this.charProps).forEach(key => {
      node.setAttribute(key, this.charProps[key])
    })
    node.setAttribute('style', styleConvert(this.charStyles))
    node.innerText = this.char
    return node
  }
  public getCharNode() {
    return this.charNode
  }
}
