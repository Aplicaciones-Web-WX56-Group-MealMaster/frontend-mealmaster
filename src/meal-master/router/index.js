import {createRouter, createWebHistory} from "vue-router";

/*
*  Importar aqui los componentes que usaran el router
*
*  Ejemplo:
*  import Home from "../public/pages/home.component.vue";
*
* */

const routes = [
/*
* {
        path: '/home',
        component: Home
    },
*
* */
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router