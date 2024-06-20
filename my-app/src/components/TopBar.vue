<template>
  <div class="topbar">
    <div class="user">
      <div class="user-info">
        <p class="email-info">{{ userEmail }}</p>
      </div>
    </div>
    <button class="hamburger" @click="toggleSidebar">☰</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'TopBar',
  data() {
    return {
      userEmail: ''
    };
  },
  methods: {
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
        const userEmail = response.data.data.userEmail;
        localStorage.setItem('userEmail', userEmail);
        console.log('User Email from API:', userEmail);
        this.userEmail = userEmail; // Actualizar el dato local del componente
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    },
    toggleSidebar() {
      // Implementar la lógica para alternar la barra lateral aquí
    }
  },
  mounted() {
    console.log('TopBar mounted');
    this.fetchUserInfo(); // Obtener el correo electrónico al montar el componente
  }
};
</script>








<style scoped>
/* Estilos del topbar */
@import url('../styles.css');

.topbar {
  width: 84%;
  right: 0;
  position: fixed;
  height: 50px;
  background-color: var(--white-color); 
  text-align: center;
  padding: 4px 10px 4px 10px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  gap: 5px;
  z-index: 5000;
}

.user {
  display: flex;
  flex-direction: row;
}

.user-img {
  width: 40px;
  height: 40px;
  margin-right: 5px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: center;
}

.user-info .email-info {
  color: var(--title-color);
  font-family: var(--primary-font);
  font-size: var(--menu-items-size);
  font-weight: 600;
}

.user-info .role-info {
  color: var(--title-color);
  font-family: var(--primary-font);
  font-size: 0.7rem;
}

.hamburger {
  display: none; 
  order: -1;
  font-size: 30px; 
  font-weight: bold;
  color: var(--primary-color); 
}

@media screen and (max-width: 768px) {
  .topbar {
    width: 100%; 
    flex-direction: row; 
    justify-content: space-between;
  }

  .hamburger {
    display: block; 
  }
}

</style>

