import { TyperChannel } from './channel'
export class TyperRender {
  public currentChannelIdx: number
  public channels: TyperChannel[]
  public renderEl: HTMLElement
  constructor(channels: TyperChannel[], renderEl?: HTMLElement) {
    this.currentChannelIdx = 0
    this.channels = channels
    this.renderEl = renderEl || document.documentElement
    this.run()
  }

  public run() {
    // this.channels.forEach(_channel =>
    //   this.renderEl.append(..._channel.channel.map(char => char.charNode))
    // )
    this.renderEl.append(...this.channels[0].channel.map(char => char.charNode))
    this.channels[0].channel.forEach(char =>
      char.charNode.setAttribute(
        'nt-width',
        String(char.charNode.getBoundingClientRect().width.toFixed(2))
      )
    )
  }
}
