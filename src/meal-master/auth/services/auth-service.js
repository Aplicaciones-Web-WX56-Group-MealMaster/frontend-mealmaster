// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export default {
    async login(user) {
        try {
            const response = await axios.get(API_URL, {
                params: {
                    email: user.email,
                    password: user.password,
                },
            });

            if (response.data.length > 0) {
                return response.data[0];
            } else {
                throw new Error('Credenciales inválidas');
            }
        } catch (error) {
            throw error;
        }
    },
};