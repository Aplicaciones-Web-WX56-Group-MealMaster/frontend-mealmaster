<template>
  <div class="ingredients-page">
    <toolbar />
    <div class="container">
      <h1>Ingredients</h1>
      <div class="search-bar">
        <div class="search-input">
          <input type="text" v-model="searchQuery" placeholder="Search ingredients..." />
        </div>
        <div class="type-filter">
          <select v-model="selectedType">
            <option value="">All Types</option>
            <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
          </select>
        </div>
      </div>
      <div class="ingredients-container">
        <div class="ingredients-grid">
          <div v-for="ingredient in paginatedIngredients" :key="ingredient.ingredient_id" class="ingredient-card" @click="toggleSelection(ingredient)">
            <div class="card-content">
              <img :src="ingredient.image" :alt="ingredient.name" class="ingredient-image" />
              <h3 class="ingredient-name">{{ ingredient.name }}</h3>
            </div>
            <div class="selection-overlay" v-if="isSelected(ingredient)">
            </div>
          </div>
        </div>
        <div class="selected-ingredients">
          <h2>Selected</h2>
          <div class="selected-ingredients-list">
            <div v-for="ingredient in selectedIngredients" :key="ingredient.ingredient_id" class="selected-ingredient-item">
              <div class="selected-ingredient-details">
                <img :src="ingredient.image" :alt="ingredient.name" class="selected-ingredient-image" />
                <span class="selected-ingredient-name">{{ ingredient.name }}</span>
              </div>
              <button class="remove-button" @click="removeSelection(ingredient)">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <button class="continue-button" @click="continueToNextStep" :disabled="selectedIngredients.length === 0">
            Continue
          </button>
        </div>
      </div>
      <div class="pagination">
        <button @click="previousPage" :disabled="currentPage === 1">
        </button>
        <span>{{ currentPage }}/{{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Toolbar from '../../../public/components/toolbar/toolbar.component.vue';
import IngredientService from '../../services/ingredient.service.js';
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);
dom.watch();

export default {
  name: 'IngredientsPage',
  components: {
    Toolbar,
  },
  data() {
    return {
      ingredients: [],
      selectedIngredients: [],
      searchQuery: '',
      selectedType: '',
      types: ['Protein', 'Vegetable', 'Grain', 'Oil', 'Nut', 'Dairy', 'Fruit', 'Nut Butter'],
      currentPage: 1,
      pageSize: 8,
    };
  },
  computed: {
    filteredIngredients() {
      return this.ingredients.filter(ingredient =>
          !this.isSelected(ingredient) &&
          ingredient.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
          (this.selectedType === '' || ingredient.type === this.selectedType)
      );
    },
    paginatedIngredients() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.filteredIngredients.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.filteredIngredients.length / this.pageSize);
    },
  },
  methods: {
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
    toggleSelection(ingredient) {
      const index = this.selectedIngredients.findIndex(selected => selected.ingredient_id === ingredient.ingredient_id);
      if (index !== -1) {
        this.selectedIngredients.splice(index, 1);
      } else {
        this.selectedIngredients.push(ingredient);
      }
    },
    isSelected(ingredient) {
      return this.selectedIngredients.some(selected => selected.ingredient_id === ingredient.ingredient_id);
    },
    removeSelection(ingredient) {
      const index = this.selectedIngredients.findIndex(selected => selected.ingredient_id === ingredient.ingredient_id);
      if (index !== -1) {
        this.selectedIngredients.splice(index, 1);
      }
    },
    continueToNextStep() {
      // Lógica para continuar con el siguiente paso en el flujo de la aplicación
      console.log('Continuing to the next step with selected ingredients:', this.selectedIngredients);
    },
  },
  watch: {
    selectedType() {
      this.currentPage = 1;
    },
    searchQuery() {
      this.currentPage = 1;
    },
  },
  async mounted() {
    this.ingredients = await IngredientService.getIngredients();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-input {
  position: relative;
}

.search-input input {
  width: 200px;
  padding: 8px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-input i {
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  color: #888;
}

.type-filter select {
  padding: 8px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  color: #333;
}

.ingredients-container {
  display: flex;
  justify-content: space-between;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
  grid-template-rows: repeat(auto-fit, minmax(150px, 200px));
  grid-gap: 10px;
  flex: 1;
}

.ingredient-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 10px;
  text-align: center;
  transition: transform 0.3s ease;
  position: relative;
  cursor: pointer;
}

.ingredient-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ingredient-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.ingredient-name {
  color: #333;
  font-size: 14px;
  font-weight: bold;
}

.selection-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(124, 229, 119, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.selection-overlay i {
  color: #fff;
  font-size: 20px;
}

.selected-ingredients {
  margin-left: 20px;
  flex: 0 0 200px;
  position: relative;
}

.selected-ingredients h2 {
  margin-bottom: 10px;
  font-size: 18px;
}

.selected-ingredients-list {
  max-height: 300px;
  overflow-y: auto;
}

.selected-ingredient-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.selected-ingredient-details {
  display: flex;
  align-items: center;
}

.selected-ingredient-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.selected-ingredient-name {
  font-size: 14px;
  font-weight: bold;
}

.remove-button {
  background-color: transparent;
  border: none;
  color: #ff6b6b;
  font-size: 16px;
  cursor: pointer;
}

.continue-button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  position: fixed; /* Agregado */
  bottom: 20px; /* Agregado */
  right: 20px; /* Agregado */
}

.continue-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #4CAF50;
  color: #fff;
  border: none;
  padding: 8px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  font-size: 14px;
}
</style>