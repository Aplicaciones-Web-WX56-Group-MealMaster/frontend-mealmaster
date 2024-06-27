import { createRouter, createWebHistory } from 'vue-router';

import IngredientsPage from '../meal-plan/pages/ingredients-page/ingredients-page.component.vue';
import RecipePage from "../meal-plan/pages/recipes-page/recipe-page.vue";
import MealPlanGenerator from "../meal-plan/pages/mealplangenerator-page/meal-plan-generator.vue";
import HomePage from "../home/pages/home-page/home-page.vue";
import LoginPageComponent from "../auth/pages/login-page/login-page.component.vue";

const routes = [

    {
        path: '/login-page',
        name: 'Login',
        component: LoginPageComponent

    },
    {
        path: '/',
        name: 'Home',
        component: HomePage

    },
    {
        path: '/recipes',
        name: 'Recipes',
        component: RecipePage
    },
    {
        path: '/meal-plan-generator',
        name: 'MealPlanGenerator',
        component: MealPlanGenerator,
        props: route => ({
            selectedRecipes: route.params.selectedRecipes ? JSON.parse(route.params.selectedRecipes) : []
        })
    },
    {
        path: '/ingredients',
        name: 'Ingredients',
        component: IngredientsPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;