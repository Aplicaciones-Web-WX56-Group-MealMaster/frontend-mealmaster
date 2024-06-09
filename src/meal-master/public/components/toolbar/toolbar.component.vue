<template>
  <nav class="toolbar">
    <div class="logo">
      <a href="/">MealMaster</a>
    </div>
    <ul class="menu">
      <li><a href="/">Home</a></li>
      <li><a href="/ingredients">Ingredients</a></li>
      <li><a href="/recipes">Recipes</a></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Toolbar',
};
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #7CE577;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo a {
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
}

.menu {
  list-style: none;
  display: flex;
}

.menu li {
  margin-left: 2rem;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
  transition: color 0.3s ease;
}

.menu a:hover {
  color: #263D42;
}
</style>