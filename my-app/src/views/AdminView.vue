<template>
  <div class="main-admin-vigilant">
    <div class="add-vigilant">
      <h2>Administración de roles</h2>
      <form @submit.prevent="addRecord">
        <label for="email">Correo electrónico</label>
        <input type="email" id="email" v-model="newVigilantEmail" placeholder="Ingresar el correo electrónico" required />
        <label for="role">Agregar/Eliminar Rol</label>
        <select id="role" v-model="selectedRole" required>
          <option value="" disabled>Seleccionar Rol</option>
          <option value="ASTN">Asistente</option>
          <option value="DOCT">Doctor</option>
        </select>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminView',
  data() {
    return {
      newVigilantEmail: '',
      selectedRole: ''
    };
  },
  methods: {
    addRecord() {
      const token = localStorage.getItem('token');
      const requestData = {
        role: this.selectedRole,
        user: this.newVigilantEmail
      };

      axios.post('http://localhost:8080/api/config/user-role', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        alert('Role changed successfully');
        // Puedes agregar aquí lógica adicional, como limpiar los campos del formulario
        this.newVigilantEmail = '';
        this.selectedRole = '';
      })
      .catch(error => {
        alert('Error changing role');
        console.error('Error:', error);
      });
    }
  }
};
</script>

<style scoped>
@import url('../styles.css');

.main-admin-vigilant {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  font-family: var(--primary-font);
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: var(--title-size);
  color: var(--title-color);
}

.add-vigilant {
  background-color: var(--white-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  width: 75%;
  
}

.add-vigilant h2 {
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
  margin-bottom: 25px;
}

.add-vigilant form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.add-vigilant label {
  margin-bottom: 5px;
  text-align: left;
  font-weight: 600;
}

.add-vigilant input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus {
  outline-color: var(--primary-color);
}

.add-vigilant button {
  background-color: var(--primary-color);
  margin-top: 20px;
  font-size: 14px;
  color: white;
  font-family: var(--primary-font);
  font-weight: 600;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-vigilant button:hover {
  background-color: #1d3a94;
}

select, input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

option {
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

option:focus {
  outline-color: var(--primary-color);
  padding: 10px;
}

select {
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

select:focus {
  outline-color: var(--primary-color);
}

</style>