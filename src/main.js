import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./meal-master/router/index.js"

import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import Button from "primevue/button"
import Card from "primevue/card"
import Toolbar from "primevue/toolbar"
import Avatar from "primevue/avatar"
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Menu from 'primevue/menu'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, { ripple: true })
app.use(ToastService)

app.component('pv-button', Button)
app.component('pv-card', Card)
app.component('pv-toolbar', Toolbar)
app.component('pv-avatar', Avatar)
app.component('pv-dialog', Dialog)
app.component('pv-input-text', InputText)
app.component('pv-dropdown', Dropdown)
app.component('pv-menu', Menu)
app.component('pv-toast', Toast)

app.mount('#app')