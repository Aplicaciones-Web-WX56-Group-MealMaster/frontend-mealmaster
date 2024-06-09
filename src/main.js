import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';

import Button from "primevue/button";
import Card from "primevue/card";
import Toolbar from "primevue/toolbar";
import Avatar from "primevue/avatar";

createApp(App)
    .use(PrimeVue, {ripple: true})
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-toolbar', Toolbar)
    .component('pv-avatar', Avatar)
    .mount('#app')
