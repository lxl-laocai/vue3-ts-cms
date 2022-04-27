import MyRequest from "./request";

const request = new MyRequest({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: Number(process.env.VUE_APP_TIME_OUT),
  interceptors: {
    requestInterceptor(config) {
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
