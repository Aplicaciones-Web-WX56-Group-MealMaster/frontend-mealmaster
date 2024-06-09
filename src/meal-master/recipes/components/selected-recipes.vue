<template>
  <div class="selected-recipes">
    <h2 class="selected-recipes-title">Selected Recipes</h2>
    <div class="selected-recipes-list">
      <div v-for="recipe in selectedRecipes" :key="recipe.id" class="selected-recipe-item">
        <img :src="recipe.image" alt="Recipe" class="selected-recipe-image" />
        <div class="selected-recipe-info">
          <h3 class="selected-recipe-name">{{ recipe.name }}</h3>
          <button class="selected-recipe-remove-button" @click="removeSelectedRecipe(recipe)">Remove</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectedRecipes: {
      type: Array,
      required: true,
    },
  },
  methods: {
    removeSelectedRecipe(recipe) {
      this.$emit('remove-recipe', recipe);
    },
  },
};
</script>

<style scoped>
.selected-recipes {
  background-color: #f8f8f8;
  padding: 20px;
  margin-top: 20px;
}

.selected-recipes-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.selected-recipes-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
}

.selected-recipe-item {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 10px;
}

.selected-recipe-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 10px;
}

.selected-recipe-info {
  flex-grow: 1;
}

.selected-recipe-name {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.selected-recipe-remove-button {
  padding: 8px 16px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>