/* eslint-disable @typescript-eslint/no-explicit-any */

import * as config from './NetworkManager.config.json'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

class NetworkManager {
  private static readonly instance: NetworkManager = new NetworkManager()

  // interceptors
  private onReqSuccessInterceptor(req: InternalAxiosRequestConfig<any>) {
    return req
  }
  private onReqFailureInterceptor(err: AxiosError) {
    return Promise.reject(err)
  }
  private onResSuccessInterceptor(res: AxiosResponse<any, any>) {
    return res
  }
  private onResFailureInterceptor(err: AxiosError) {
    return Promise.reject(err)
  }

  private constructor() {
    if (NetworkManager.instance) {
      throw new Error('싱글톤 클래스입니다. getInstance 메소드를 사용하세요')
    }
  }

  public static getInstance(): NetworkManager {
    return NetworkManager.instance
  }

  public create<Req extends AxiosRequestConfig, Res>(requestConfig: Req): Promise<AxiosResponse<Res, any>> {
    const opts: any = config.common
    opts.headers.Authorization = ''
    opts.headers.ExceptionCode = ''

    const instance = axios.create(opts)
    instance.interceptors.request.use(this.onReqSuccessInterceptor, this.onReqFailureInterceptor)
    instance.interceptors.response.use(this.onResSuccessInterceptor, this.onResFailureInterceptor)

    return instance(requestConfig)
  }
}

export default NetworkManager.getInstance()
