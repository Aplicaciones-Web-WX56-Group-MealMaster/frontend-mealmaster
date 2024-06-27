<template>
  <div class="recipe-page">
    <div class="content-wrapper">
      <aside class="sidebar">
        <meal-selection @update-filtered-recipes="updateFilteredRecipes" />
      </aside>
      <main class="main-content">
        <div class="selection-controls">
          <Button
              label="Select All"
              @click="selectAllRecipes"
              class="p-button-outlined p-button-sm"
              :disabled="paginatedRecipes.length === 0"
          />
          <Button
              label="Deselect All"
              @click="deselectAllRecipes"
              class="p-button-outlined p-button-sm"
              :disabled="selectedRecipes.length === 0"
          />
          <span class="selection-info">{{ selectedRecipes.length }} recipes selected</span>
          <Button
              label="Generate Meal Plan"
              icon="pi pi-calendar"
              @click="navigateToMealPlan"
              :disabled="selectedRecipes.length === 0"
              class="p-button-success p-button-sm"
          />
        </div>
        <div class="meal-card-grid">
          <meal-card
              v-for="recipe in paginatedRecipes"
              :key="recipe.id"
              :recipe="recipe"
              :is-selected="isRecipeSelected(recipe)"
              @toggle-selection="toggleRecipeSelection"
              @show-recipe-info="showRecipeInfo"
          />
        </div>
        <div v-if="paginatedRecipes.length === 0" class="no-recipes">
          No recipes found. Try adjusting your filters.
        </div>
        <div v-if="filteredRecipes.length > 0" class="pagination">
          <Button
              :disabled="currentPage === 1"
              @click="previousPage"
              icon="pi pi-chevron-left"
              class="p-button-rounded p-button-text"
          />
          <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
          <Button
              :disabled="currentPage === totalPages"
              @click="nextPage"
              icon="pi pi-chevron-right"
              class="p-button-rounded p-button-text"
          />
        </div>
      </main>
    </div>

    <div class="selected-recipes-container">
      <Button
          @click="toggleSelectedRecipes"
          :label="`View Selected Recipes (${selectedRecipes.length})`"
          :badge="selectedRecipes.length.toString()"
          class="p-button-outlined p-button-secondary mb-3"
          :disabled="selectedRecipes.length === 0"
      />
      <transition name="fade">
        <selected-recipes
            v-if="selectedRecipesExpanded"
            :selected-recipes="selectedRecipes"
            @remove-recipe="toggleRecipeSelection"
        />
      </transition>
    </div>

    <Dialog v-model:visible="dialogVisible" modal header="Recipe Details" :style="{width: '50vw'}" :breakpoints="{'960px': '75vw', '641px': '100vw'}">
      <div v-if="selectedRecipeInfo" class="recipe-info-content">
        <img :src="selectedRecipeInfo.image" :alt="selectedRecipeInfo.name" class="recipe-info-image" />
        <h2>{{ selectedRecipeInfo.name }}</h2>
        <p>{{ selectedRecipeInfo.description }}</p>
        <h3>Instructions:</h3>
        <p>{{ selectedRecipeInfo.instructions }}</p>
        <h3>Nutritional Information:</h3>
        <ul>
          <li>Calories: {{ selectedRecipeInfo.calories }}</li>
          <li>Proteins: {{ selectedRecipeInfo.proteins }}g</li>
          <li>Fats: {{ selectedRecipeInfo.fats }}g</li>
          <li>Carbohydrates: {{ selectedRecipeInfo.carbohydrates }}g</li>
        </ul>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Toolbar from '../../../public/components/toolbar/toolbar.component.vue';
import MealSelection from '../../components/meal-selection.vue';
import MealCard from '../../components/meal-card.vue';
import SelectedRecipes from '../../components/selected-recipes.vue';
import { fetchRecipes } from '../../services/recipe-data.service.js';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

export default {
  name: 'RecipePage',
  components: {
    Toolbar,
    MealSelection,
    MealCard,
    SelectedRecipes,
    Button,
    Dialog
  },
  setup() {
    const router = useRouter();
    const recipes = ref([]);
    const filteredRecipes = ref([]);
    const selectedRecipes = ref([]);
    const selectedRecipeInfo = ref(null);
    const selectedRecipesExpanded = ref(false);
    const currentPage = ref(1);
    const pageSize = 12;
    const dialogVisible = ref(false);

    const totalPages = computed(() => Math.ceil(filteredRecipes.value.length / pageSize));

    const paginatedRecipes = computed(() => {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return filteredRecipes.value.slice(startIndex, endIndex);
    });

    onMounted(async () => {
      try {
        recipes.value = await fetchRecipes();
        filteredRecipes.value = recipes.value;
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    });

    const updateFilteredRecipes = (filters) => {
      filteredRecipes.value = recipes.value.filter(recipe => {
        return Object.entries(filters).every(([key, value]) => {
          if (value.length === 0) return true;
          return value.includes(recipe[key]);
        });
      });
      currentPage.value = 1;
    };

    const isRecipeSelected = (recipe) => {
      return selectedRecipes.value.some(r => r.id === recipe.id);
    };

    const toggleRecipeSelection = (recipe) => {
      const index = selectedRecipes.value.findIndex(r => r.id === recipe.id);
      if (index > -1) {
        selectedRecipes.value.splice(index, 1);
      } else {
        selectedRecipes.value.push(recipe);
      }
    };

    const selectAllRecipes = () => {
      paginatedRecipes.value.forEach(recipe => {
        if (!isRecipeSelected(recipe)) {
          selectedRecipes.value.push(recipe);
        }
      });
    };

    const deselectAllRecipes = () => {
      selectedRecipes.value = selectedRecipes.value.filter(recipe =>
          !paginatedRecipes.value.some(r => r.id === recipe.id)
      );
    };

    const showRecipeInfo = (recipe) => {
      selectedRecipeInfo.value = recipe;
      dialogVisible.value = true;
    };

    const toggleSelectedRecipes = () => {
      selectedRecipesExpanded.value = !selectedRecipesExpanded.value;
    };

    const previousPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const navigateToMealPlan = () => {
      router.push({
        name: 'MealPlanGenerator',
        params: { selectedRecipes: JSON.stringify(selectedRecipes.value) }
      });
    };

    watch(filteredRecipes, () => {
      currentPage.value = 1;
    });

    return {
      filteredRecipes,
      selectedRecipes,
      selectedRecipeInfo,
      selectedRecipesExpanded,
      currentPage,
      totalPages,
      paginatedRecipes,
      dialogVisible,
      updateFilteredRecipes,
      isRecipeSelected,
      toggleRecipeSelection,
      selectAllRecipes,
      deselectAllRecipes,
      showRecipeInfo,
      toggleSelectedRecipes,
      previousPage,
      nextPage,
      navigateToMealPlan
    };
  }
};
</script>

<style scoped>
.recipe-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content-wrapper {
  display: flex;
  flex-grow: 1;
  padding: 2rem;
}

.sidebar {
  width: 300px;
  margin-right: 2rem;
}

.main-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.selection-controls {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.selection-controls .p-button {
  margin-right: 0.5rem;
}

.selection-info {
  margin-left: auto;
  margin-right: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.meal-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.no-recipes {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  margin-top: 2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
  padding: 1rem 0;
}

.pagination-info {
  margin: 0 1rem;
  font-size: 0.9rem;
  color: #666;
}

.selected-recipes-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;
}

.selected-recipes-container .p-button {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
}

.selected-recipes-container .p-button .p-badge {
  margin-left: 0.5rem;
}

.recipe-info-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.recipe-info-content h2 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.recipe-info-content h3 {
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}

.recipe-info-content p, .recipe-info-content ul {
  margin-bottom: 1rem;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    padding: 1rem;
  }

  .sidebar {
    width: 100%;
    margin-right: 0;
    margin-bottom: 2rem;
  }

  .meal-card-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .selected-recipes-container {
    position: static;
    margin-top: 2rem;
  }

  .selection-controls {
    flex-wrap: wrap;
  }

  .selection-info {
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
}
</style>