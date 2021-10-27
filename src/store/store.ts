import { StoreParamsType, StoreStutus } from '../types'

export class PubSub {
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

export default class Store {
  public events: PubSub
  public state: { [k: string]: any }
  public mutations: { [k: string]: Function }
  public actions: { [k: string]: Function }
  public status: StoreStutus
  constructor(params: StoreParamsType) {
    this.events = new PubSub()
    this.status = 'reseting'
    this.actions = Reflect.has(params, 'actions') ? params.actions! : {}
    this.mutations = Reflect.has(params, 'mutations') ? params.mutations! : {}
    this.state = {}
    this.state = new Proxy(params.state || {}, {
      set: (state, key: string, value) => {
        state[key] = value
        console.log(`stateChange: ${key}: ${value}`)
        this.events.publish('stateChange', this.state)
        if (this.status !== 'mutation') {
          console.warn(`You should use a mutation to set ${key}`)
        }
        this.status = 'reseting'
        return true
      },
    })
  }

  public dispatch<T = any>(actionKey: string, payload: T) {
    if (typeof this.actions[actionKey] !== 'function') {
      console.error(`Action "${actionKey} doesn't exist.`)
      return false
    }
    console.groupCollapsed(`ACTION: ${actionKey}`)
    this.status = 'action'
    this.actions[actionKey](this, payload)
    console.groupEnd()
    return true
  }

  public commit<T = any>(mutationKey: string, payload: T) {
    if (typeof this.mutations[mutationKey] !== 'function') {
      console.log(`Mutation "${mutationKey}" doesn't exist`)
      return false
    }
    this.status = 'mutation'
    this.mutations[mutationKey](this.state, payload)
    return true
  }
}
