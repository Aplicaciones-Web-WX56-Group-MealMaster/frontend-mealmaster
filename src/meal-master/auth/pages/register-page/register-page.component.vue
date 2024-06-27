<template>
  <div class="register-container">
    <div class="register-form">
      <h2>MealMaster</h2>
      <h3>Registrarse</h3>
      <form @submit.prevent="register">
        <input type="text" v-model="name" placeholder="Nombre" required>
        <input type="email" v-model="email" placeholder="Correo electrónico" required>
        <input type="password" v-model="password" placeholder="Contraseña" required>
        <button type="submit">Registrarse</button>
      </form>
      <router-link to="/login">¿Ya tienes cuenta? Inicia sesión</router-link>
    </div>
  </div>
</template>

<script>
import AuthService from './../../services/auth-service.js';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  methods: {
    async register() {
      try {
        await AuthService.register(this.name, this.email, this.password);
        this.$router.push('/login'); // Redirige al login después de registrarse
      } catch (error) {
        alert('Error durante el registro: ' + error.message); // Muestra el error si el registro falla
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #77d36d;
}

.register-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.register-form h2 {
  margin-bottom: 1rem;
  font-size: 2rem;
}

.register-form h3 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.register-form form {
  display: flex;
  flex-direction: column;
}

.register-form input {
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.register-form button {
  padding: 0.8rem;
  background: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-form button:hover {
  background: #45a049;
}

.register-form router-link {
  color: #007bff;
  cursor: pointer;
  margin-top: 1rem;
  display: block;
}

.register-form router-link:hover {
  text-decoration: underline;
}
</style>
