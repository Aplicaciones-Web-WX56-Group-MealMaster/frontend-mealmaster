<template>
  <pv-toolbar class="toolbar">
    <template #start>
      <div class="logo" @click="navigateTo('Home')">
        <img src="../../../../assets/logo.png" alt="MealMaster Logo" class="logo-image" />
        <span class="logo-text">MealMaster</span>
      </div>
    </template>

    <template #center>
      <div class="nav-links">
        <pv-button
            v-for="link in navLinks"
            :key="link.name"
            :label="link.label"
            :icon="link.icon"
            :class="{ active: currentRoute === link.name }"
            @click="navigateTo(link.name)"
            class="p-button-text"
        />
      </div>
    </template>

    <template #end>
      <div class="auth-buttons">
        <pv-button
            label="Log In"
            icon="pi pi-sign-in"
            @click="navigateTo('Login')"
            class="p-button-text"
        />
        <pv-button
            label="Sign Up"
            icon="pi pi-user-plus"
            @click="navigateTo('SignUp')"
            class="p-button-outlined"
        />
      </div>
    </template>
  </pv-toolbar>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const currentRoute = computed(() => route.name);

const navLinks = [
  { name: 'Home', label: 'Home', icon: 'pi pi-home' },
  { name: 'Recipes', label: 'Recipes', icon: 'pi pi-book' },
  { name: 'Ingredients', label: 'Ingredients', icon: 'pi pi-list' },
  { name: 'MealPlanGenerator', label: 'Meal Plan', icon: 'pi pi-calendar' },
];

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
.toolbar {
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo-image {
  height: 40px;
  margin-right: 0.5rem;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: #263D42;
}

.nav-links {
  display: flex;
  gap: 1rem;
}

.nav-links .p-button.active {
  background-color: #4ecdc4;
  color: #ffffff;
}

.auth-buttons {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
    padding: 0.5rem;
  }

  .nav-links, .auth-buttons {
    flex-direction: column;
    align-items: stretch;
    margin-top: 0.5rem;
  }

  .nav-links .p-button, .auth-buttons .p-button {
    margin-bottom: 0.5rem;
  }
}
</style>