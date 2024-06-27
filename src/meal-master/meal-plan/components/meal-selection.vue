<template>
  <div class="meal-selection">
    <h2 class="filter-heading">Filter by</h2>
    <div class="filter-section">
      <h3 class="filter-title">Meal Time</h3>
      <div v-for="(tag, index) in foodTypes" :key="index" class="tag" @click="toggleFoodType(tag)">
        <div class="tag-checkbox" :class="{ 'tag-checkbox-selected': selectedFoodTypes.includes(tag) }"></div>
        <span class="tag-label">{{ tag }}</span>
      </div>
    </div>
    <div class="filter-section">
      <h3 class="filter-title">Pricing</h3>
      <div v-for="(tag, index) in pricing" :key="index" class="tag" @click="togglePricing(tag)">
        <div class="tag-checkbox" :class="{ 'tag-checkbox-selected': selectedPricing.includes(tag) }"></div>
        <span class="tag-label">{{ tag }}</span>
      </div>
    </div>
    <div class="filter-section">
      <h3 class="filter-title">Difficulty</h3>
      <div v-for="(tag, index) in difficulties" :key="index" class="tag" @click="toggleDifficulty(tag)">
        <div class="tag-checkbox" :class="{ 'tag-checkbox-selected': selectedDifficulties.includes(tag) }"></div>
        <span class="tag-label">{{ tag }}</span>
      </div>
    </div>
    <div class="filter-section">
      <h3 class="filter-title">Type of Cuisine</h3>
      <div v-for="(tag, index) in cuisineTypes" :key="index" class="tag" @click="toggleCuisineType(tag)">
        <div class="tag-checkbox" :class="{ 'tag-checkbox-selected': selectedCuisineTypes.includes(tag) }"></div>
        <span class="tag-label">{{ tag }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foodTypes: ['Breakfast', 'Lunch', 'Dinner', 'Snack'],
      difficulties: ['Easy', 'Intermediate', 'Hard'],
      cuisineTypes: ['Peruvian', 'American', 'French', 'Chinese', 'Italian', 'Indian', 'Mexican', 'Thai', 'Continental'],
      pricing: ['Cheap', 'Affordable', 'Expensive'],
      selectedFoodTypes: [],
      selectedDifficulties: [],
      selectedCuisineTypes: [],
      selectedPricing: [],
    };
  },
  methods: {
    toggleFoodType(tag) {
      this.toggleTag(tag, this.selectedFoodTypes);
    },
    togglePricing(tag) {
      this.toggleTag(tag, this.selectedPricing);
    },
    toggleDifficulty(tag) {
      this.toggleTag(tag, this.selectedDifficulties);
    },
    toggleCuisineType(tag) {
      this.toggleTag(tag, this.selectedCuisineTypes);
    },
    toggleTag(tag, selectedTags) {
      const index = selectedTags.indexOf(tag);
      if (index > -1) {
        selectedTags.splice(index, 1);
      } else {
        selectedTags.push(tag);
      }
      this.emitFilteredRecipes();
    },
    emitFilteredRecipes() {
      const filters = {
        mealtime: this.selectedFoodTypes,
        pricing: this.selectedPricing,
        difficulty: this.selectedDifficulties,
        type_cuisine: this.selectedCuisineTypes,
      };
      this.$emit('update-filtered-recipes', filters);
    },
  },
};
</script>

<style scoped>
.meal-selection {
  background-color: #f8f8f8;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  width: 300px;
}

.filter-heading {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.tag {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
}

.tag-checkbox {
  width: 20px;
  height: 20px;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag-checkbox-selected {
  background-color: #4ecdc4;
  border-color: #4ecdc4;
}

.tag-checkbox-selected::after {
  content: '✓';
  color: #fff;
  font-size: 14px;
}

.tag-label {
  font-size: 16px;
}
</style>