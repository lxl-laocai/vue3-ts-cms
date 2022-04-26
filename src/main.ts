import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import request from "./service";

request.request({
  method: "GET",
  url: "/home/multidata"
});
createApp(App).use(router).use(store).mount("#app");
