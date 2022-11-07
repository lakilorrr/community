import { isTokenExpire, resetAccessStorage } from '@/utils/tokenHelper';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface Response<T=any> {
  data: T,
  code: number,
  message: string,
}

export class Request {
  private instance: AxiosInstance;
  private requestConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:999',
    timeout: 5 * 60 * 1000
  }
  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.requestConfig, config));
    this.instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
      let tokenStorage = localStorage.getItem('token') as string;
      if (tokenStorage) {
        const { access, accessExpireIn, refresh, refreshExpireIn } = JSON.parse(tokenStorage);
        let accessToken = access;
        if (isTokenExpire(accessExpireIn) && !isTokenExpire(refreshExpireIn)) {
          tokenStorage = await resetAccessStorage(refresh);
          accessToken = JSON.parse(tokenStorage)?.access;
        }
        if (accessToken) {
          config.headers!.Authorization = `Bearer ${access}`
        }
      }
      return config;
    },
      (err: AxiosError) => {
        return Promise.reject(err);
      }
    )
    this.instance.interceptors.response.use(async(response: AxiosResponse<Response>) => {
      const { data } = response;
      // TODO:
      const res = data.data
        return res;
    },
      (err: AxiosError) => {
        return err.response?.data;
      })
  }
  public get<T = any>(url: string): Promise<T>{
    return this.instance.get(url);
  }
  public post<T = any, DTO = any>(url: string, data?: DTO, config?: AxiosRequestConfig): Promise<T>{
    return this.instance.post(url, data, config);
  }
  public put<T = any, DTO = any>(url: string, data?: DTO): Promise<T>{
    return this.instance.put(url, data);
  }
  public delete<T = any>(url: string): Promise<T>{
    return this.instance.delete(url);
  }
}
export default Request;