/* eslint-disable @typescript-eslint/no-explicit-any */

import { test, describe, expect } from 'vitest'
import NetworkManager from './NetworkManager'

interface IReqGetTestData {
  method: 'GET'
  url: 'https://reqres.in/api/users/2' | string
}
interface IResGetTestData {
  data: {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
  }
  support: {
    url: string
    text: string
  }
}

describe('NetworkManager', () => {
  test('creates a request using axios instance', async () => {
    const req = () => {
      return NetworkManager.create<IReqGetTestData, IResGetTestData>({
        method: 'GET',
        url: 'https://reqres.in/api/users/2',
      })
    }

    const res = await req()
    expect(res.data).toEqual({
      data: {
        id: 2,
        email: 'janet.weaver@reqres.in',
        first_name: 'Janet',
        last_name: 'Weaver',
        avatar: 'https://reqres.in/img/faces/2-image.jpg',
      },
      support: {
        url: 'https://reqres.in/#support-heading',
        text: 'To keep ReqRes free, contributions towards server costs are appreciated!',
      },
    })
  })
})
