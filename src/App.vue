<template>
  <div id="app">
    <toolbar></toolbar>
    <main>

      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2024 MealMaster. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import Toolbar from '../src/meal-master/public/components/toolbar/toolbar.component.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex-grow: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

footer {
  background-color: #f8f8f8;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
}
</style>