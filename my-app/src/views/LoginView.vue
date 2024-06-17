<template>
  <div class="landing">
    <div class="card">
      <h4>Inicia sesión</h4>
      <form @submit.prevent="login">
        <label for="email-login">Email:</label>
        <input type="text" v-model="loginData.identifier" id="email-login" required />
        <label for="password-login">Contraseña:</label>
        <input type="password" v-model="loginData.password" id="password-login" required />
        <button type="submit">Ingresar</button>
      </form>
    </div>
    <div class="card2">
      <h4>Registrarse</h4>
      <form @submit.prevent="register">
        <label for="email-register">Ingrese su email:</label>
        <input type="text" v-model="registerData.email" id="email-register" required />
        <label for="username-register">Ingrese un username:</label>
        <input type="text" v-model="registerData.username" id="username-register" required />
        <label for="password-register">Ingresa una contraseña:</label>
        <input type="password" v-model="registerData.password" id="password-register" required />
        <button type="submit">Registrarme</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',
  data() {
    return {
      loginData: {
        identifier: '',
        password: ''
      },
      registerData: {
        username: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/login', this.loginData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response); 
        if (response.data && response.data.data && response.data.data.token) {
          const token = response.data.data.token;
          localStorage.setItem('token', token);
          this.showToast('Login successful', 'success');
          this.resetLoginFields();
          this.fetchUserInfo(); 
          this.$router.push('/mainView'); 
        } else {
          this.showToast('Unexpected response structure', 'error');
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    async fetchUserInfo() {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          return; 
        }
        const response = await axios.get('http://localhost:8080/api/user/whoami', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('User Info:', response.data); 
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    async register() {
      try {
        const response = await axios.post('http://localhost:8080/api/auth/register', this.registerData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        if (response.data && response.data.message) {
          this.showToast('Registration successful', 'success');
          this.resetRegisterFields();
        } else {
          this.showToast('Unexpected response structure', 'error');
        }
      } catch (error) {
        this.handleError(error);
      }
    },
    resetLoginFields() {
      this.loginData.identifier = '';
      this.loginData.password = '';
    },
    resetRegisterFields() {
      this.registerData.username = '';
      this.registerData.email = '';
      this.registerData.password = '';
    },
    showToast(message, type) {
      alert(`${type.toUpperCase()}: ${message}`);
    },
    handleError(error) {
      console.error('API Error:', error); 
      if (error.response && error.response.data && error.response.data.message) {
        this.showToast(error.response.data.message, 'error');
      } else {
        this.showToast('An error occurred', 'error');
      }
    }
  }
}
</script>





<style scoped>
@import url('../styles.css');

.landing{
  background-image: url('../assets/doctor.png');
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: row;
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  width: 100%; 
  min-height: 550px;
  align-items: center;
  padding: 60px;
  gap: 20px;
  
}

.title{
  align-items: start;
  display: flex;
  flex-direction: column;
  font-family: var(--primary-font);
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.title img{
  height: 170px;
  width: 150px;
}

.title button{
  background-color: white;
  font-family: var(--primary-font);
  font-size: 17px;
  border-radius: 10px;
  padding: 15px;
  color: var(--primary-color);
  margin-top: 20px;
}

.google{
  height: 90px;
  width: 90%;
}

.google:hover{
  cursor: pointer;
}

.card{
  border-radius: 20px;
  width: 350px;
  height: 310px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
}

.card2{
  border-radius: 20px;
  width: 350px;
  height: 390px;
  padding: 25px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border-radius: 20px;
}

.card h4, .card2 h4{
  font-family: var(--primary-font);
  font-size: 25px;
  color: var(--title-color);
}

.card p, .card2 p{
  font-family: var(--primary-font);
  font-size: 20px;
  color: var(--title-color);
}

.cards{
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1); 
  font-size: 24px;
  color: var(--primary-color);
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
}

.cards p{
  font-size: 17px;
  color: var(--title-color);
}

.cards img{
  height: 200px;
  width: 200px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--title-color);
  font-family: var(--primary-font);
  text-align: left;
}

input[type="text"],input[type="password"]{
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

input:focus {
  outline-color: var(--primary-color);
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"] {
  background-color: var(--bg-color);
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  font-weight: 600;
}

button[type="button"]:hover {
  background-color: #E0E1E5;  
}

button[type="submit"] {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-family: var(--primary-font);
  font-weight: 600;
}

button[type="submit"]:hover {
  background-color: #1d3a94;
}

@media screen and (min-width: 769px) and (max-width: 1095px) {
  .title{
    align-items: center;
  }
}

@media screen and (max-width: 768px) {
  .title{
    align-items: center;
  }
}
</style>