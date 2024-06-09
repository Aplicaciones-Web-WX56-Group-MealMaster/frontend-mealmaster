<script setup>
import MealCard from "../../components/MealCard.vue";
import MealFilter from "../../components/MealFilter.vue";
</script>

<template>
  <div class="app-container">
    <MealFilter></MealFilter>
    <MealCard></MealCard>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  align-items: flex-start;
}
</style>