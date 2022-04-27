import type { AxiosInstance } from "axios";
import axios from "axios";
import { ElLoading } from "element-plus";
import type { LoadingInstance } from "element-plus/lib/components/loading/src/loading";
import type { IAxiosRequestConfig, IAxiosRequestInterceptors } from "./types";

const DEFAULT_LOADING = true;

class MyRequest {
  instance: AxiosInstance;
  interceptors?: IAxiosRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;

  constructor(config: IAxiosRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;
    this.interceptors = config.interceptors;

    // 从config中取出拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "加载中..."
          });
        }
        return config;
      },
      (error) => {
        return error;
      }
    );
    this.instance.interceptors.response.use(
      (res) => {
        setTimeout(() => {
          this.loading?.close();
        }, 3000);
        const data = res.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~");
        } else {
          return data;
        }
      },
      (err) => {
        this.loading?.close();
        if (err.response.status === 404) {
          console.log("404错误");
        }
        return err;
      }
    );
  }

  request<T>(config: IAxiosRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 请求拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          this.showLoading = DEFAULT_LOADING;
          resolve(res);
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING;
          reject(err);
        });
    });
  }

  get<T>(config: IAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T>(config: IAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  delete<T>(config: IAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  patch<T>(config: IAxiosRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default MyRequest;
