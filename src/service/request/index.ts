import type { AxiosInstance } from "axios";
import axios from "axios";

import type { IAxiosRequestConfig, IAxiosRequestInterceptors } from "./types";

class MyRequest {
  instance: AxiosInstance;
  interceptors?: IAxiosRequestInterceptors;

  constructor(config: IAxiosRequestConfig) {
    this.instance = axios.create(config);
    this.interceptors = config.interceptors;
    // 自定义实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );
    // 共有实例拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("共有实例拦截器");
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        return error;
      }
    );
  }

  request(config: IAxiosRequestConfig): void {
    // 请求拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config);
    }
    this.instance.request(config).then((res) => {
      if (config.interceptors?.responseInterceptor) {
        res = config.interceptors.responseInterceptor(res);
      }
      console.log("请求拦截器");
      return res;
    });
  }
}

export default MyRequest;
