import axios from 'axios';

export async function fetchRecipes() {
    const response = await axios.get('http://localhost:3000/recipes');

    const recipes = response.data;

    return recipes;
}