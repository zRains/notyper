import { TyperChar } from './chars'
import store from '../store'

export class TyperChannel {
  public typersSlice: string[]
  public channel!: TyperChar[]

  constructor(typer: string) {
    this.typersSlice = typer.match(/\S|\s/g) || []
    this.channel = this.typersSlice.map(char => new TyperChar(char))
    store.events.subscribe('stateChange', (data: any) =>
      this.channel.forEach(char => char.initNode(data.charSetting))
    )
  }
}
