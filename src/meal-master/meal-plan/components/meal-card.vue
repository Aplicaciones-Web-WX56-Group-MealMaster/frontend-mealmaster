<template>
  <div class="meal-card" :class="{ 'selected': isSelected }">
    <div class="meal-card-content">
      <img :src="recipe.image" :alt="recipe.name" class="meal-image" />
      <div class="meal-info">
        <h3 class="meal-name">{{ recipe.name }}</h3>
        <div class="meal-tags">
          <span class="meal-tag" :class="getTagColor(recipe.mealtime)">{{ recipe.mealtime }}</span>
          <span class="meal-tag" :class="getTagColor(recipe.pricing)">{{ recipe.pricing }}</span>
          <span class="meal-tag" :class="getTagColor(recipe.difficulty)">{{ recipe.difficulty }}</span>
          <span class="meal-tag" :class="getTagColor(recipe.type_cuisine)">{{ recipe.type_cuisine }}</span>
        </div>
        <p class="meal-description">{{ recipe.description }}</p>
      </div>
    </div>
    <div class="meal-actions">
      <Button
          :label="isSelected ? 'Deselect' : 'Select'"
          :class="['p-button-outlined', { 'p-button-secondary': !isSelected, 'p-button-success': isSelected }]"
          @click="$emit('toggle-selection', recipe)"
      />
      <Button label="More Info" class="p-button-text" @click="$emit('show-recipe-info', recipe)" />
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  components: {
    Button
  },
  props: {
    recipe: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTagColor(tag) {
      // Implement your tag color logic here
      const colors = {
        'Breakfast': 'tag-blue',
        'Lunch': 'tag-green',
        'Dinner': 'tag-orange',
        'Snack': 'tag-purple',
        'Cheap': 'tag-green',
        'Affordable': 'tag-blue',
        'Expensive': 'tag-red',
        'Easy': 'tag-green',
        'Intermediate': 'tag-orange',
        'Hard': 'tag-red'
      };
      return colors[tag] || 'tag-default';
    }
  }
};
</script>


<style scoped>
.meal-card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.meal-card.selected {
  box-shadow: 0 0 0 2px #4caf50, 0 4px 8px rgba(0, 0, 0, 0.1);
}

.meal-card-content {
  display: flex;
  flex-direction: column;
}

.meal-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.meal-info {
  padding: 1rem;
  flex-grow: 1;
}

.meal-name {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.meal-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.meal-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.tag-blue { background-color: #e3f2fd; color: #1565c0; }
.tag-green { background-color: #e8f5e9; color: #2e7d32; }
.tag-orange { background-color: #fff3e0; color: #ef6c00; }
.tag-purple { background-color: #f3e5f5; color: #6a1b9a; }
.tag-red { background-color: #ffebee; color: #c62828; }
.tag-default { background-color: #f5f5f5; color: #616161; }

.meal-description {
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.meal-actions {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f5f5f5;
}
</style>