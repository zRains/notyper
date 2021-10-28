import { styleConvert } from '../utils'
import store from '../store'
import { PerSetting } from '../types'

export const charPerStyles = {
  display: 'inline-block',
  fontSize: '35px',
  overflow: 'hidden',
}

export class TyperChar {
  public char: string
  public tag: keyof HTMLElementTagNameMap
  public charNode: HTMLElement
  private charClass!: string[]
  private charProps!: { [k: string]: string }
  private charStyles!: { [k: string]: string }
  constructor(char: string, tag: keyof HTMLElementTagNameMap = 'span') {
    this.char = char
    this.tag = tag
    this.charNode = document.createElement(this.tag)
    this.initNode(store.state.charSetting)
  }
  public initNode(charSetting: PerSetting) {
    const { _class = [], _props = {}, _styles = {} } = charSetting
    this.charClass = _class
    this.charProps = _props
    this.charStyles = Object.assign(charPerStyles, _styles)
    this.charNode.classList.add(...this.charClass)
    Object.keys(this.charProps).forEach(key => {
      this.charNode.setAttribute(key, this.charProps[key])
    })
    this.charNode.setAttribute('style', styleConvert(this.charStyles))
    this.charNode.innerText = this.char
  }
}
