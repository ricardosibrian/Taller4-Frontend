<template>
  <div class="main-container">
    <div class="permissions-table-container">
      <h2>Ver prescripciones de un paciente</h2>
      <div class="date-filter2">
        <input type="email" id="email" v-model="userEmail" placeholder="Ingresar el correo electrónico del paciente" required />
        <button class="filter-button" @click="fetchPrescriptions">
          Buscar
        </button>
      </div>
      <div class="table-wrapper">
        <table class="permissions-table">
          <thead>
            <tr>
              <th>Medicamento</th>
              <th>Dosis</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prescription in prescriptions" :key="prescription.prescriptionId">
              <td>{{ prescription.medicine }}</td>
              <td>{{ prescription.dose }}</td>
            </tr>
            <tr v-if="prescriptions.length === 0">
              <td colspan="2" class="text-center">No hay prescripciones disponibles</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'CitasTable',
  data() {
    return {
      userEmail: '',
      prescriptions: []
    };
  },
  methods: {
    fetchPrescriptions() {
      if (!this.userEmail) {
        alert('Por favor ingresa el correo electrónico del paciente.');
        return;
      }

      const token = localStorage.getItem('token');
      const url = `http://localhost:8080/api/clinic/prescriptions/${this.userEmail}`;

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data && response.data.data) {
          this.prescriptions = response.data.data;
        } else {
          console.error('Respuesta de API inesperada:', response);
          alert('Error al obtener las prescripciones');
        }
      })
      .catch(error => {
        console.error('Error al obtener las prescripciones:', error);
        alert('Error al obtener las prescripciones');
      });
    }
  }
};
</script>

<style scoped>

.main-container{
  padding:20px;
}

.table-wrapper {
  overflow-x: auto;
}

.permissions-table-container {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
}

.permissions-table {
  width: 100%;
  border-collapse: collapse;
  color: var(--title-color);
  font-family: var(--primary-font);
}

.permissions-table th,
.permissions-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.permissions-table th {
  background-color: #f9f9f9;
  font-size: 14px;
}

.permissions-table td {
  font-size: 13px;
}

.resolve-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 5px;
  margin-right: 5px;
}

.resolve-button.finalizar {
  background-color: var(--primary-color);
  color: white;
}

.resolve-button.prescripcion {
  background-color: var(--primary-color);
  color: white;
}

.resolve-button.informacion {
  background-color: #007bff;
  color: white;
}

.date-filter2 {
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 10px;
  color: var(--title-color);
  font-family: var(--primary-font);
}

.date-filter2 label {
  margin-right: 10px;
  font-size: 15px;
}

.date-filter2 input {
  margin-right: 20px;
}

.filter-button {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-family: var(--primary-font);
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  display: flex;
  align-items: center;
}

input:focus {
outline-color: var(--primary-color);
}

input{
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ddd;
    border-radius: 4px;
}
</style>
  