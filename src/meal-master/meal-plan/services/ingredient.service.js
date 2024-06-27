// services/ingredient.service.js
import Ingredient from '../models/ingredient.model.js';

export default {
    async getIngredients() {
        try {
            const response = await fetch('http://localhost:3000/ingredients');
            const data = await response.json();
            return data.map(ingredient => new Ingredient(ingredient.ingredient_id, ingredient.name, ingredient.image, ingredient.type));
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            return [];
        }
    },
};