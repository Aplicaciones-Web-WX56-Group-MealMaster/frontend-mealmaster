export default class Recipe {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.instructions = data.instructions;
        this.image = data.image;
        this.mealtime = data.mealtime;
        this.pricing = data.pricing;
        this.difficulty = data.difficulty;
        this.cooking_time = data.cooking_time;
        this.type_cuisine = data.type_cuisine;
        this.calories = data.calories;
        this.proteins = data.proteins;
        this.fats = data.fats;
        this.carbohydrates = data.carbohydrates;
    }
}