import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义接口 字段设置类型
export interface IAxiosRequestInterceptors {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptorCatch?: (error: any) => any;
}
// 接口继承 AxiosRequestConfig 添加新字段 interceptors
export interface IAxiosRequestConfig extends AxiosRequestConfig {
  interceptors?: IAxiosRequestInterceptors;
  showLoading?: boolean;
}
