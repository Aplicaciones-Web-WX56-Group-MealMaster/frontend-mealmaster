import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Button from "primevue/button";
import Card from "primevue/card";
import Toolbar from "primevue/toolbar";
import Avatar from "primevue/avatar";

const app = createApp(App)
app.use(PrimeVue, {ripple: true})
app.component('pv-button', Button)
app.component('pv-card', Card)
app.component('pv-toolbar', Toolbar)
app.component('pv-avatar', Avatar)
app.mount('#app')
