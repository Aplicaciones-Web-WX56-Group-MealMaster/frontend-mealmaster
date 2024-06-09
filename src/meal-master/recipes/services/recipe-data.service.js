import axios from 'axios';

const API_URL = 'http://localhost:3000/recipes'; // Replace with your API endpoint

export async function fetchRecipes() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
}