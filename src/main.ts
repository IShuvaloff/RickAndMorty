import { createApp } from 'vue';
import UIComponents from '@/components/Base';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);

UIComponents.forEach((item) => {
  app.component(item.name, item);
});

app.use(store).use(router).mount('#app');
