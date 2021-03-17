import AppInsights from '@/plugins/application-insights';
import { prepareServices } from '@/plugins/services';
import ElementPlus from 'element-plus';
import { createApp } from 'vue';
import App from './App.vue';
import './element-variables.scss';
import './registerServiceWorker';
import router from './router';
import store from './store';

const AI_INSTRUMENT_KEY = process.env.VUE_APP_AI_INSTRUMENT_KEY;
const app = createApp(App);

if (process.env.NODE_ENV === 'production'
  && !!AI_INSTRUMENT_KEY) {
  app.use(AppInsights, {
    id: AI_INSTRUMENT_KEY,
  });
}

prepareServices(store);
app.use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app');
