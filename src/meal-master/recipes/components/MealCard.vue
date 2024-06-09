<template>
  <div class="meal-card-container">
    <div v-for="recipe in recipes" :key="recipe.id" class="meal-card">
      <img :src="recipe.image" alt="Meal" class="meal-image" />
      <div class="meal-info">
        <h2>{{ recipe.name }}</h2>
        <div class="meal-tags">
          <span  class="meal-tag" :class="getTagColor(recipe.mealtime)">{{ recipe.mealtime }}</span>
          <span  class="meal-tag" :class="getTagColor(recipe.pricing)">{{ recipe.pricing }}</span>
          <span  class="meal-tag" :class="getTagColor(recipe.difficulty)">{{ recipe.difficulty }}</span>
          <span  class="meal-tag" :class="getTagColor(recipe.cooking_time)">{{ recipe.cooking_time }}</span>
          <span  class="meal-tag" :class="getTagColor(recipe.type_cuisine)">{{ recipe.type_cuisine }}</span>
        </div>
        <Button class="info-button" @click="seeMoreInfo(recipe)" icon="pi pi-info">More info</Button>
        <Button class="add-button" @click="addMeal(recipe)" icon="pi pi-plus"></Button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import {fetchRecipes} from "../services/recipe-data.service.js";
import Recipe from "../models/recipe.js";
import Button from 'primevue/button'

export default {
  data() {
    return {
      recipes: []
    }
  },
  async created() {
    const recipeData = await fetchRecipes();
    this.recipes = recipeData.map(data => new Recipe(data));



  },
  methods: {
    addMeal(recipe) {
      // Add meal to user's list
    },
    seeMoreInfo(recipe) {
      // Show more info about the meal
    },
    getTagColor(tag) {
      if (['$$$', 'Hard', 'Above an hour'].includes(tag)) {
        return 'tag-red';
      } else if (['$$', 'Intermediate', '30 minutes'].includes(tag)) {
        return 'tag-orange';
      } else if (['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Peruvian', 'American', 'French', 'Chinese', 'Italian', 'Indian', 'Mexican', 'Thai', 'Japanese'].includes(tag)) {
        return 'tag-green';
      } else {
        return 'tag-gray';
      }
    }
  }
}




</script>

<style scoped>
.meal-card-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 75%; /* Takes up the remaining 75% of the screen width */
}

.meal-card {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 1vh; /* No space between cards */
  border: 1px solid #000; /* Add a border to each card */
}

.meal-image {
  width: 30%;
  object-fit: cover;
}

.meal-info {
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.info-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 15px 50px; /* Adjust the horizontal padding */
  display: flex; /* Add this */
  justify-content: center; /* Add this */
  align-items: center; /* Add this */
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border-radius: 12px;
  width: 1vh; /* Set a specific width */
  box-sizing: border-box; /* Ensure padding doesn't affect the final width */
}

.info-button:hover {
  background-color: white;
  color: black;
  border: 2px solid #4CAF50;
}

.add-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.meal-tag {
  display: inline-block;
  padding: 2px 6px;
  border-radius: 12px; /* Make the tags oval-shaped */
  color: #fff; /* White text */
  margin-right: 5px;
}

.tag-red {
  background-color: red;
}

.tag-orange {
  background-color: orange;
}

.tag-green {
  background-color: green;
}

.tag-gray {
  background-color: gray;
}

@media (max-width: 768px) {
  .meal-card-container {
    width: 100%;
  }

  .meal-image {
    width: 50%;
  }
}
</style>