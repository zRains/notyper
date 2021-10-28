import { TyperChannel } from './channel'
import Operation from '../operation'
import { styleConvert } from '../utils'

export class TyperRender extends Operation {
  public currentChannelIdx: number
  public channels: TyperChannel[]
  public renderEl: HTMLElement
  constructor(channels: TyperChannel[], renderEl?: HTMLElement) {
    super()
    this.currentChannelIdx = 0
    this.channels = channels
    this.renderEl = renderEl || document.documentElement
    this.run()
    // this.typerMasker()
  }

  public run() {
    // this.channels.forEach(_channel =>
    //    this.renderEl.append(..._channel.channel.map(char => char.charNode))
    // )
    this.renderEl.append(...this.channels[0].channel.map(char => char.charNode))
    const charWithArr = this.channels[0].channel.map(
      char => char.charNode.getBoundingClientRect().width
    )
    this.channels[0].channel.forEach(char =>
      char.charNode.setAttribute(
        'nt-width',
        String(
          (char.charNode.getBoundingClientRect().width === 0
            ? charWithArr.reduce((a, b) => a + b) / charWithArr.length - 1
            : char.charNode.getBoundingClientRect().width
          ).toFixed(2)
        )
      )
    )
    queueMicrotask(() => {
      this.setChar({
        _styles: {
          width: '0',
        },
      })
    })
  }
  public typerMasker() {
    const masker = document.createElement('div')
    masker.innerHTML = 'ceffffcfs'
    masker.setAttribute(
      'style',
      styleConvert({
        position: 'absolute',
        zIndex: '-999',
      })
    )
    document.documentElement.appendChild(masker)
  }
}
