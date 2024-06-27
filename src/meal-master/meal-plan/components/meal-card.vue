<template>
  <div class="meal-card-container">
    <div v-for="recipe in filteredRecipes" :key="recipe.id" class="meal-card">
      <div class="meal-image-container">
        <img :src="recipe.image" alt="Meal" class="meal-image" />
      </div>
      <div class="meal-info">
        <h2 class="meal-name">{{ recipe.name }}</h2>
        <div class="meal-tags">
          <span class="meal-tag" :class="getTagColor(recipe.mealtime, 'mealtime')">{{ recipe.mealtime }}</span>
          <span class="meal-tag" :class="getTagColor(recipe.pricing, 'pricing')">{{ recipe.pricing }}</span>
          <span class="meal-tag" :class="getTagColor(recipe.difficulty, 'difficulty')">{{ recipe.difficulty }}</span>
          <span class="meal-tag" :class="getTagColor(recipe.cooking_time, 'cooking_time')">{{ recipe.cooking_time }}</span>
          <span class="meal-tag" :class="getTagColor(recipe.type_cuisine, 'type_cuisine')">{{ recipe.type_cuisine }}</span>
        </div>
        <p class="meal-description">{{ recipe.description }}</p>
        <div class="meal-actions">
          <button class="info-button" @click="showRecipeInfo(recipe)">More Info</button>
          <button class="add-button" @click="addRecipe(recipe)">Add to Selected</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    filteredRecipes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    addRecipe(recipe) {
      this.$emit('add-recipe', recipe);
    },
    showRecipeInfo(recipe) {
      this.$emit('show-recipe-info', recipe);
    },
    getTagColor(tag, tagName) {
      if (['Expensive', 'Hard', 'Above 1 hour'].includes(tag)) {
        return 'tag-red';
      } else if (['Affordable', 'Intermediate', '30 minutes or less'].includes(tag)) {
        return 'tag-orange';
      } else if (tagName === 'type_cuisine' || tagName === 'mealtime') {
        return 'tag-gray';
      } else {
        return 'tag-green';
      }
    },
  },
};
</script>

<style scoped>
.meal-card-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  padding: 20px;
}

.meal-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.meal-image-container {
  height: 200px;
  overflow: hidden;
}

.meal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.meal-info {
  padding: 20px;
}

.meal-name {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.meal-tags {
  margin-bottom: 10px;
}

.meal-tag {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: #fff;
  margin-right: 5px;
  font-size: 12px;
}

.tag-red {
  background-color: #ff6b6b;
}

.tag-orange {
  background-color: #ffa94d;
}

.tag-green {
  background-color: #4ecdc4;
}

.tag-gray {
  background-color: #a8a8a8;
}

.meal-description {
  margin-bottom: 20px;
}

.meal-actions {
  display: flex;
  justify-content: space-between;
}

.info-button {
  padding: 8px 16px;
  background-color: #4ecdc4;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  margin-right: 10px;
}

.add-button {
  padding: 8px 16px;
  background-color: #fff;
  color: #4ecdc4;
  border: 1px solid #4ecdc4;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>