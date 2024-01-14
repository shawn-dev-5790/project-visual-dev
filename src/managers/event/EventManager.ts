/* eslint-disable @typescript-eslint/no-explicit-any */

import * as config from './EventManager.config.json'

type TEventName = keyof typeof config.namespaces
type TEventListener = (data?: any) => void
type TEventListenerData = Parameters<TEventListener>[number]

class EventManager {
  private static readonly instance: EventManager = new EventManager()
  private events: Map<TEventName, TEventListener[]> = new Map()

  private constructor() {
    if (EventManager.instance) {
      throw new Error('싱글톤 클래스입니다. getInstance 메소드를 사용하세요')
    }
    Object.keys(config.namespaces).forEach((eventName) => this.events.set(eventName as TEventName, []))
  }

  public static getInstance(): EventManager {
    return EventManager.instance
  }

  public on(eventName: TEventName, listener: TEventListener): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, [])
    }

    const listeners = this.events.get(eventName)
    if (listeners) {
      this.events.set(eventName, listeners.concat(listener))
    }
  }

  public off(eventName: TEventName, listener: TEventListener): void {
    const listeners = this.events.get(eventName)
    if (listeners) {
      this.events.set(
        eventName,
        listeners.filter((prev) => prev !== listener)
      )
    }
  }

  public emit(eventName: TEventName, data: TEventListenerData): void {
    const listeners = this.events.get(eventName)
    if (listeners) {
      listeners.forEach((listener) => listener(data))
    }
  }
}

export default EventManager.getInstance()
