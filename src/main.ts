import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import './element-variables.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app');
