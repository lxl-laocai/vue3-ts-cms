import type { AxiosRequestConfig, AxiosResponse } from "axios";

// 定义接口 字段设置类型
export interface IAxiosRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}
// 接口继承 AxiosRequestConfig 添加新字段 interceptors
export interface IAxiosRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IAxiosRequestInterceptors<T>;
  showLoading?: boolean;
}
