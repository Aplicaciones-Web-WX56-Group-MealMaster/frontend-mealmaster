<template>
  <div class="meal-master-container">
    <div class="meal-master-form">
      <div class="form-content">
        <h2 class="title">MealMaster</h2>
        <p class="subtitle">Iniciar Sesión</p>
        <div class="input-group">
          <div class="input-field">
            <InputText type="text" v-model="email" placeholder="Correo electrónico" class="input-width" />
          </div>
          <div class="input-field">
            <InputText type="password" v-model="password" placeholder="Contraseña" class="input-width" />
          </div>
        </div>
        <div class="forgot-password">
          <a href="#" class="forgot-password-link">¿Olvidaste tu contraseña?</a>
        </div>
        <div class="button-group">
          <Button label="Iniciar sesión" class="submit-button" @click="login" />
        </div>
        <div class="register-link">
          <Button label="¿No tienes cuenta aún? Regístrate" class="register-button" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import AuthService from '../../services/auth-service.js';
import User from '../../models/user.js';

export default {
  name: 'LoginPage',
  components: {
    InputText,
    Button,
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const user = new User(this.email, this.password);
        const loggedInUser = await AuthService.login(user);
        console.log('Inicio de sesión exitoso:', loggedInUser);
        // Aquí puedes redirigir al usuario a la página principal después de un inicio de sesión exitoso
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap');

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  font-family: 'Raleway', sans-serif;
  background-color: #263D42;
}

.meal-master-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  background-color: #263D42;
}

.meal-master-form {
  background-color: #F6F8FF;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  will-change: transform, opacity;
  animation: fadeInAndMoveUp 0.5s ease-out;
}

.form-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #263D42;
}

.subtitle {
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 1rem;
  color: #000000;
}

.input-group {
  width: 100%;
  margin-bottom: 1rem;
}

.input-field {
  margin-bottom: 0.75rem;
}

.input-width {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.forgot-password {
  align-self: flex-end;
  margin-bottom: 1rem;
}

.forgot-password-link {
  color: #263D42;
  text-decoration: none;
}

.button-group {
  width: 100%;
  margin-bottom: 1rem;
}

.submit-button {
  width: 100%;
  background-color: #263D42;
  color: #F6F8FF;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.register-link {
  text-align: center;
}

.register-button {
  background-color: transparent;
  color: #263D42;
  border: none;
  cursor: pointer;
  text-decoration: underline;
}

@keyframes fadeInAndMoveUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .meal-master-form {
    max-width: 100%;
    padding: 1rem;
  }

  .title {
    font-size: 1.25rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .input-group {
    margin-bottom: 0.5rem;
  }

  .input-field {
    margin-bottom: 0.5rem;
  }

  .forgot-password {
    margin-bottom: 0.5rem;
  }

  .button-group {
    margin-bottom: 0.5rem;
  }
}
</style>
