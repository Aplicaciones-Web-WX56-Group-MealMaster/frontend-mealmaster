<template>
  <div class="home-page">
    <div class="content">
      <div class="hero-section">
        <h1>Welcome to MealMaster</h1>
        <p>Your personal assistant for meal planning and recipe management</p>
      </div>

      <div class="features-section">
        <pv-card class="feature-card">
          <template #header>
            <img alt="Recipes" src="../../../../assets/recipes.png" />
          </template>
          <template #title>Explore Recipes</template>
          <template #content>
            Discover a wide variety of delicious recipes. Filter by ingredients, cuisine type, and more.
          </template>
          <template #footer>
            <pv-button label="Go to Recipes" icon="pi pi-book" @click="navigateTo('Recipes')" />
          </template>
        </pv-card>

        <pv-card class="feature-card">
          <template #header>
            <img alt="Ingredients" src="../../../../assets/ingredients.png" />
          </template>
          <template #title>Manage Ingredients</template>
          <template #content>
            Track your pantry and create delicious recipes based on your meal plans.
          </template>
          <template #footer>
            <pv-button label="Go to Ingredients" icon="pi pi-list" @click="navigateTo('Ingredients')" />
          </template>
        </pv-card>

        <pv-card class="feature-card">
          <template #header>
            <img alt="Meal Plan" src="../../../../assets/mealplan.png" />
          </template>
          <template #title>Generate Meal Plans</template>
          <template #content>
            Create personalized meal plans based on your preferences and dietary requirements.
          </template>
          <template #footer>
            <pv-button label="Create Meal Plan" icon="pi pi-calendar" @click="navigateTo('MealPlanGenerator')" />
          </template>
        </pv-card>
      </div>

      <div class="cta-section">
        <h2>Start Your Culinary Journey Today!</h2>
        <pv-button label="Get Started" icon="pi pi-check" class="p-button-lg" @click="navigateTo('Recipes')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import Toolbar from '../../../public/components/toolbar/toolbar.component.vue';

const router = useRouter();

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>

<style scoped>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  color: #263D42;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  color: #4ecdc4;
}

.features-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 3rem;
}

.feature-card {
  width: 300px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.feature-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.cta-section {
  text-align: center;
}

.cta-section h2 {
  font-size: 1.8rem;
  color: #263D42;
  margin-bottom: 1rem;
}

@media (max-width: 768px) {
  .features-section {
    flex-direction: column;
    align-items: center;
  }

  .feature-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>