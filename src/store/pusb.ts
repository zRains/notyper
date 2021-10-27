export default class Pusb {
  public events: Record<string, Function[]>
  constructor() {
    this.events = {}
  }

  public subscribe(event: string, callback: Function) {
    if (!Reflect.has(this.events, event)) {
      this.events[event] = []
    }
    return this.events[event].push(callback)
  }

  public publish(event: string, data: object = {}) {
    if (!Reflect.has(this.events, event)) {
      return []
    }
    return this.events[event].map(callback => callback(data))
  }
}
