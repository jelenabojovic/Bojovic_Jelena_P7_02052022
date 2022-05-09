import { createApp } from "vue";
import BootstrapVue3 from 'bootstrap-vue-3';
import App from "./App.vue";
import router from "./router";
import axios from 'axios'
import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

const app = createApp(App);
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios) 
app.use(router);
app.use(BootstrapVue3);
app.mount("#app");
