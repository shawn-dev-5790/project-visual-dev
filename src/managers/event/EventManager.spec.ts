/* eslint-disable @typescript-eslint/no-explicit-any */

import { expect, test, describe } from 'vitest'
import EventManager from './EventManager'

describe('EventManager', () => {
  test('it should subscribe and emit events', () => {
    const eventName = 'test'
    const eventListener = (data: any) => expect(data).toBe('Test Data 1')

    EventManager.on(eventName, eventListener)
    EventManager.emit(eventName, 'Test Data 1')
  })

  test('it should unsubscribe from events', () => {
    const eventName = 'test'
    const eventListener = () => {
      throw new Error('This listener should not be called')
    }

    EventManager.on(eventName, eventListener)
    EventManager.off(eventName, eventListener)
    EventManager.emit(eventName, 'Test Data 1')
  })

  test('it should handle multiple listeners for the same event', () => {
    const eventName = 'test'
    const eventListener1 = (data: any) => expect(data).toBe('Test Data 1')
    const eventListener2 = (data: any) => expect(data).toBe('Test Data 1')

    EventManager.on(eventName, eventListener1)
    EventManager.on(eventName, eventListener2)
    EventManager.emit(eventName, 'Test Data 1')
  })
})
