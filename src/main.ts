import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import request from "./service";
import "element-plus/theme-chalk/index.css";

request
  .request({
    method: "GET",
    url: "/home/multidata"
    // interceptors: {
    //   requestInterceptor(config) {
    //     console.log("请求拦截器");
    //     return config;
    //   }
    // }
  })
  .then((res) => {
    console.log(res);
  });
createApp(App).use(router).use(store).mount("#app");
