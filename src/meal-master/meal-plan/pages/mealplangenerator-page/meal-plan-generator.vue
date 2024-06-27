<template>
  <div class="meal-plan-generator">
    <h1 class="title">Meal Plan Generator</h1>

    <div class="control-panel">
      <Button label="Generate Plan" icon="pi pi-refresh" @click="generatePlan" class="p-button-primary" />
      <Dropdown v-model="selectedMealsPerDay" :options="mealsPerDayOptions" optionLabel="name" optionValue="value" placeholder="Meals per day" class="p-inputtext-sm" />
      <InputNumber v-model="planDuration" :min="1" :max="14" placeholder="Days" class="p-inputtext-sm" />
    </div>

    <div v-if="mealPlan.length > 0" class="meal-plan">
      <div v-for="(day, index) in mealPlan" :key="index" class="day-plan">
        <h2>Day {{ index + 1 }}</h2>
        <div v-for="(meal, mealIndex) in day" :key="mealIndex" class="meal-slot">
          <h3>{{ getMealTitle(mealIndex) }}</h3>
          <Dropdown
              v-model="mealPlan[index][mealIndex]"
              :options="selectedRecipes"
              optionLabel="name"
              placeholder="Select a recipe"
              class="p-inputtext-sm"
          >
            <template #value="slotProps">
              <div class="meal-option" v-if="slotProps.value">
                <img :src="slotProps.value.image" :alt="slotProps.value.name" class="meal-image" />
                <span>{{ slotProps.value.name }}</span>
              </div>
              <span v-else>{{ slotProps.placeholder }}</span>
            </template>
            <template #option="slotProps">
              <div class="meal-option">
                <img :src="slotProps.option.image" :alt="slotProps.option.name" class="meal-image" />
                <span>{{ slotProps.option.name }}</span>
              </div>
            </template>
          </Dropdown>
        </div>
      </div>
    </div>

    <div v-if="mealPlan.length > 0" class="action-buttons">
      <Button label="Save Plan" icon="pi pi-check" @click="savePlan" class="p-button-success" />
      <Button label="Print Plan" icon="pi pi-print" @click="printPlan" class="p-button-secondary" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Toolbar from "../../../public/components/toolbar/toolbar.component.vue";

export default {
  name: 'MealPlanGenerator',
  components: {
    Toolbar,
    Button,
    Dropdown,
    InputNumber
  },
  props: {
    selectedRecipes: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const mealPlan = ref([]);
    const selectedMealsPerDay = ref(3);
    const planDuration = ref(7);
    const mealsPerDayOptions = [
      { name: '3 meals', value: 3 },
      { name: '4 meals', value: 4 },
      { name: '5 meals', value: 5 }
    ];

    const generatePlan = () => {
      mealPlan.value = [];
      for (let i = 0; i < planDuration.value; i++) {
        const day = [];
        for (let j = 0; j < selectedMealsPerDay.value; j++) {
          const randomRecipe = props.selectedRecipes[Math.floor(Math.random() * props.selectedRecipes.length)];
          day.push(randomRecipe);
        }
        mealPlan.value.push(day);
      }
    };

    const getMealTitle = (index) => {
      const titles = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Late Night'];
      return titles[index] || `Meal ${index + 1}`;
    };

    const savePlan = () => {
      // Implementar lógica para guardar el plan
      console.log('Saving meal plan:', mealPlan.value);
      // Aquí puedes agregar la lógica para guardar en el backend o en el almacenamiento local
    };

    const printPlan = () => {
      window.print();
    };

    return {
      mealPlan,
      selectedMealsPerDay,
      planDuration,
      mealsPerDayOptions,
      generatePlan,
      getMealTitle,
      savePlan,
      printPlan
    };
  }
};
</script>

<style scoped>
.meal-plan-generator {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.control-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.meal-plan {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.day-plan {
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 1rem;
}

.day-plan h2 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.meal-slot {
  margin-bottom: 1rem;
}

.meal-slot h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.meal-option {
  display: flex;
  align-items: center;
}

.meal-image {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .meal-plan {
    grid-template-columns: 1fr;
  }
}

@media print {
  .control-panel, .action-buttons {
    display: none;
  }
}
</style>