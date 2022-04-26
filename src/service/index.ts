import MyRequest from "./request";

const request = new MyRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIME_OUT,
  interceptors: {
    requestInterceptor(config) {
      console.log("实例拦截器");
      return config;
    },
    requestInterceptorCatch(err) {
      return err;
    },
    responseInterceptor(res) {
      return res;
    },
    responseInterceptorCatch(err) {
      return err;
    }
  }
});
export default request;
