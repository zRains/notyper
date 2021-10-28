import { TyperChannel } from './components/channel'
import { TyperRender } from './components/render'
import Operation from './operation'

class Notyper extends Operation {
  public rootEl: HTMLElement
  public typers: string[]
  private typersChannels: TyperChannel[]
  private typerRender: TyperRender
  constructor($rootEl: HTMLElement | string, typers: string[]) {
    super()
    this.rootEl =
      typeof $rootEl === 'string'
        ? <HTMLElement>document.querySelector($rootEl)
        : $rootEl
    if (!this.rootEl) throw new Error('notyper root element no found')
    this.typers = typers
    this.typersChannels = typers.map(typer => new TyperChannel(typer))
    this.typerRender = new TyperRender(this.typersChannels, this.rootEl)
  }

  // 添加typer
  public appendTyper(typer: string | string[]) {
    if (typeof typer === 'string') {
      this.typers.push(typer)
      this.typersChannels.push(new TyperChannel(typer))
    } else {
      this.typers.push(...typer)
      this.typersChannels.push(...typer.map(_typer => new TyperChannel(_typer)))
    }
    return this
  }
  // 重设typer
  public replaceTyper(typer: string | string[]) {
    if (typeof typer === 'string') {
      this.typers = [typer]
    } else {
      this.typers = typer
    }
    this.typersChannels = this.typers.map(_typer => new TyperChannel(_typer))
  }
}

export function createNotyper(
  rootEl: HTMLElement | string,
  typers: string[] = []
) {
  return new Notyper(rootEl, typers)
}
