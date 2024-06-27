import axios from 'axios';

const API_URL = 'http://localhost:3000'; // URL base para json-server

const AuthService = {
    async login(email, password) {
        try {
            const response = await axios.get(`${API_URL}/users?email=${email}&password=${password}`);
            if (response.data.length > 0) {
                return response.data[0];  // Login successful
            } else {
                throw new Error('Credenciales incorrectas');
            }
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },

    async register(name, email, password) {
        try {
            const response = await axios.post(`${API_URL}/users`, {
                full_name: name,
                email,
                password
            });
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    }
};

export default AuthService;
