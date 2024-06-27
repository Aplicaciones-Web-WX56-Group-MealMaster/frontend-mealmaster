<template>
  <div class="recipe-page">
    <div class="meal-selection">
      <meal-selection @update-filtered-recipes="updateFilteredRecipes" />
    </div>
    <div class="meal-card-container">
      <meal-card :filtered-recipes="paginatedRecipes" @add-recipe="addSelectedRecipe" @show-recipe-info="showRecipeInfo" />
      <div class="pagination">
        <button class="pagination-button" :disabled="currentPage === 1" @click="previousPage">Previous</button>
        <span class="pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
        <button class="pagination-button" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
      </div>
    </div>
    <div class="selected-recipes-container">
      <button class="toggle-selected-recipes" @click="toggleSelectedRecipes">
        {{ selectedRecipesExpanded ? 'Hide Selected Recipes' : 'Show Selected Recipes' }}
      </button>
      <selected-recipes v-if="selectedRecipesExpanded" :selected-recipes="selectedRecipes" @remove-recipe="removeSelectedRecipe" />
    </div>
    <div v-if="selectedRecipeInfo" class="recipe-info-overlay">
      <div class="recipe-info-content">
        <h2>{{ selectedRecipeInfo.name }}</h2>
        <img :src="selectedRecipeInfo.image" alt="Recipe" class="recipe-info-image" />
        <p>{{ selectedRecipeInfo.description }}</p>
        <h3>Instructions:</h3>
        <p>{{ selectedRecipeInfo.instructions }}</p>
        <h3>Nutritional Information:</h3>
        <ul>
          <li>Calories: {{ selectedRecipeInfo.calories }}</li>
          <li>Proteins: {{ selectedRecipeInfo.proteins }}</li>
          <li>Fats: {{ selectedRecipeInfo.fats }}</li>
          <li>Carbohydrates: {{ selectedRecipeInfo.carbohydrates }}</li>
        </ul>
        <button class="close-overlay-button" @click="closeRecipeInfo">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import MealSelection from '../../components/meal-selection.vue';
import MealCard from '../../components/meal-card.vue';
import SelectedRecipes from '../../components/selected-recipes.vue';
import { fetchRecipes } from '../../services/recipe-data.service.js';

export default {
  components: {
    MealSelection,
    MealCard,
    SelectedRecipes,
  },
  data() {
    return {
      recipes: [],
      filteredRecipes: [],
      selectedRecipes: [],
      selectedRecipeInfo: null,
      selectedRecipesExpanded: false,
      currentPage: 1,
      pageSize: 10,
    };
  },
  async created() {
    this.recipes = await fetchRecipes();
    this.filteredRecipes = this.recipes;
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredRecipes.length / this.pageSize);
    },
    paginatedRecipes() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredRecipes.slice(startIndex, endIndex);
    },
  },
  methods: {
    updateFilteredRecipes(filters) {
      this.filteredRecipes = this.recipes.filter(recipe => {
        const isFoodTypeMatch = filters.mealtime.length === 0 || filters.mealtime.includes(recipe.mealtime);
        const isPricingMatch = filters.pricing.length === 0 || filters.pricing.includes(recipe.pricing);
        const isDifficultyMatch = filters.difficulty.length === 0 || filters.difficulty.includes(recipe.difficulty);
        const isCookingTimeMatch = filters.cookingTime.length === 0 || this.checkCookingTime(recipe.cooking_time, filters.cookingTime);
        const isCuisineTypeMatch = filters.cuisineType.length === 0 || filters.cuisineType.includes(recipe.type_cuisine);

        return isFoodTypeMatch && isPricingMatch && isDifficultyMatch && isCookingTimeMatch && isCuisineTypeMatch;
      });
      this.currentPage = 1; // Reset to the first page when filters change
    },
    checkCookingTime(recipeCookingTime, selectedCookingTimes) {
      const cookingTimeMinutes = this.convertToMinutes(recipeCookingTime);

      if (selectedCookingTimes.length === 0) {
        return true;
      }

      for (const selectedCookingTime of selectedCookingTimes) {
        if (selectedCookingTime === '15 minutes or less' && cookingTimeMinutes <= 15) {
          return true;
        } else if (selectedCookingTime === '30 minutes or less' && cookingTimeMinutes <= 30) {
          return true;
        } else if (selectedCookingTime === 'Above 1 hour' && cookingTimeMinutes > 60) {
          return true;
        }
      }
      return false;
    },
    convertToMinutes(cookingTime) {
      const timeComponents = cookingTime.split(' ');
      const value = parseInt(timeComponents[0]);
      const unit = timeComponents[1];

      if (unit === 'minutes' || unit === 'minute') {
        return value;
      } else if (unit === 'hours' || unit === 'hour') {
        return value * 60;
      }
      return 0;
    },
    addSelectedRecipe(recipe) {
      if (!this.selectedRecipes.includes(recipe)) {
        this.selectedRecipes.push(recipe);
      }
    },
    removeSelectedRecipe(recipe) {
      const index = this.selectedRecipes.indexOf(recipe);
      if (index > -1) {
        this.selectedRecipes.splice(index, 1);
        this.updatePaginatedRecipes(); // Update paginated recipes after removing a selected recipe
      }
    },
    showRecipeInfo(recipe) {
      this.selectedRecipeInfo = recipe;
    },
    closeRecipeInfo() {
      this.selectedRecipeInfo = null;
    },
    toggleSelectedRecipes() {
      this.selectedRecipesExpanded = !this.selectedRecipesExpanded;
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    updatePaginatedRecipes() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedRecipes = this.filteredRecipes.slice(startIndex, endIndex);
    },
  },
  watch: {
    filteredRecipes() {
      this.updatePaginatedRecipes(); // Update paginated recipes when filtered recipes change
    },
    currentPage() {
      this.updatePaginatedRecipes(); // Update paginated recipes when current page changes
    },
  },
};
</script>

<style scoped>
.recipe-page {
  display: flex;
}

.meal-selection {
  flex-shrink: 0;
  margin-right: 20px;
}

.meal-card-container {
  flex-grow: 1;
}

.recipe-info-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}

.recipe-info-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
}

.recipe-info-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: 20px;
}

.close-overlay-button {
  padding: 8px 16px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
}

.selected-recipes-container {
  margin-top: 20px;
}

.toggle-selected-recipes {
  padding: 8px 16px;
  background-color: #4ecdc4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 10px;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.pagination-button {
  padding: 8px 16px;
  background-color: #4ecdc4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin: 0 5px;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination-info {
  font-size: 14px;
  margin: 0 10px;
}
</style>