import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIcons from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import "font-awesome/css/font-awesome.min.css";
import "./styles/elementPlus/themeDark.css";
import "./styles/elementPlus/themeLight.css";
import "./styles/index.scss";

import router from "./router/index";
import App from "./App.vue";
import ComponentRegister from "./components/register";

const app = createApp(App);
const pinia = createPinia();

// 注册element-icon图标
for (const [key, component] of Object.entries(ElementPlusIcons)) {
  app.component(key, component);
}

// element-plus本地化语言设置
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(ComponentRegister);
app.use(pinia);
app.use(router);
app.mount("#app");
