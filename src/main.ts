import AppInsights from '@/plugins/application-insights';
import { prepareServices } from '@/plugins/services';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import './element-variables.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';

const app = createApp(App);

if (process.env.NODE_ENV === 'production') {
  app.use(AppInsights);
}

prepareServices(store);
app.use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app');
