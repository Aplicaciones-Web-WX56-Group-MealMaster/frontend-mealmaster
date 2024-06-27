// models/ingredient.model.js
export default class Ingredient {
    constructor(ingredient_id, name, image, type) {
        this.ingredient_id = ingredient_id;
        this.name = name;
        this.image = image;
        this.type = type;
    }
}