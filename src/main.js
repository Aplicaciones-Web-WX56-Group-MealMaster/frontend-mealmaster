import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import Button from "primevue/button";

createApp(App)
    .component('pv-button', Button)
    .mount('#app')
