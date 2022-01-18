import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from 'axios';
import store from './store'
import '@/assets/style.css'

const app = createApp(App);
app.use(store);
app.use(router, axios);
app.mount('#app');
