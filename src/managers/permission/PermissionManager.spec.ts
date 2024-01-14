import { expect, test, describe } from 'vitest'
import PermissionManager from './PermissionManager'

describe('PermissionManager.has(permission)', () => {
  test('When the tag is "none", most actions are accessible.', () => {
    expect(PermissionManager.has({ tag: 'none', type: 'owner', country: 'ko', action: 'access' })).toBe(true)
  })
  test('When the tag is "payment", only owners have access.', () => {
    expect(PermissionManager.has({ tag: 'payment', type: 'owner', country: 'ko', action: 'write' })).toBe(true)
    expect(PermissionManager.has({ tag: 'payment', type: 'admin', country: 'ko', action: 'write' })).toBe(false)
    expect(PermissionManager.has({ tag: 'payment', type: 'viewer', country: 'ko', action: 'write' })).toBe(false)
  })
  test('When the tag is "friendtalk" or "alimtalk", access is only possible in Korea.', () => {
    expect(PermissionManager.has({ tag: 'friendtalk', type: 'owner', country: 'ko', action: 'access' })).toBe(true)
    expect(PermissionManager.has({ tag: 'friendtalk', type: 'owner', country: 'en', action: 'access' })).toBe(false)
    expect(PermissionManager.has({ tag: 'alimtalk', type: 'owner', country: 'ko', action: 'access' })).toBe(true)
    expect(PermissionManager.has({ tag: 'alimtalk', type: 'owner', country: 'jp', action: 'access' })).toBe(false)
  })
})

describe('PermissionManager.get(permission)', () => {
  test('When finding permissions with a specified permission, retrieve the permission model.', () => {
    expect(PermissionManager.get({ tag: 'payment', type: 'admin', country: 'ko', action: 'access' })).toEqual({
      tag: ['payment'],
      type: ['admin'],
      country: ['ko', 'en', 'jp'],
      action: ['access', 'read'],
    })
  })
  test('When not finding permissions with a specified permission, retrieve an empty permission model.', () => {
    expect(PermissionManager.get({ tag: 'payment', type: 'admin', country: 'ko', action: 'write' })).toEqual({
      tag: [],
      type: [],
      country: [],
      action: [],
    })
  })
})
