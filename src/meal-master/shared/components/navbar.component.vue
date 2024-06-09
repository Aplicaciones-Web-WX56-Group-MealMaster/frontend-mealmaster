<script setup>

</script>

<template>
  <div class="card">
    <pv-toolbar style="border-radius: 3rem; padding: 1rem 1rem 1rem 1.5rem">
      <template #start>
        <div class="flex align-items-center gap-2">

          <!-- Add router links to the buttons -->
          <router-link to="/home">
            <pv-button label="Home" aria-label="Navigate to Home" text plain />
          </router-link>

          <router-link to="">
            <pv-button label="Meal Plan" aria-label="Navigate to Meal Plan" text plain />
          </router-link>

          <router-link to="">
            <pv-button label="Recipes" aria-label="Navigate to Recipes" text plain />
          </router-link>
        </div>
      </template>

      <template #end>
        <div class="flex align-items-center gap-2">
          <pv-avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" style="width: 32px; height: 32px" />
        </div>
      </template>
    </pv-toolbar>
  </div>
</template>

<style scoped>

</style>