<template>
  <div class="table-container">
    <div class="table-header">
      <h3>Mi historial médico</h3>
    </div>
    <div class="date-filter">
      <label for="startDate">Fecha Inicio:</label>
      <input type="date" id="startDate" v-model="startDate" />
      <label for="endDate">Fecha Fin:</label>
      <input type="date" id="endDate" v-model="endDate" />
      <button class="filter-button" @click="applyFilter">
        Aplicar filtro
      </button>
    </div>
    
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Razón</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(record, index) in records" :key="index">
            <td>{{ record }}</td>
          </tr>
          <tr v-if="loading">
            <td colspan="1" class="text-center">Cargando...</td>
          </tr>
          <tr v-if="error">
            <td colspan="1" class="text-center">{{ errorMessage }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyCitasTable',
  data() {
    return {
      startDate: '',
      endDate: '',
      records: [],
      loading: false,
      error: false,
      errorMessage: ''
    };
  },
  methods: {
    fetchRecords(params = {}) {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:8080/api/user/record';

      this.loading = true;
      this.error = false;

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: params // Agregar parámetros opcionales
      })
      .then(response => {
        this.loading = false;
        if (response.data && response.data.data && response.data.data.histories) {
          this.records = response.data.data.histories;
        } else {
          console.error('Respuesta de API inesperada:', response);
          this.error = true;
          this.errorMessage = 'Respuesta de API inesperada';
        }
      })
      .catch(error => {
        this.loading = false;
        console.error('Error al obtener el historial médico:', error);
        if (error.response && error.response.status === 404) {
          this.records = [];
          this.error = true;
          this.errorMessage = 'No hay registros disponibles para el filtro seleccionado.';
        } else {
          this.error = true;
          this.errorMessage = 'Error al obtener el historial médico.';
        }
      });
    },
    applyFilter() {
      if (this.startDate && this.endDate) {
        // Ambas fechas están definidas, aplicar filtro con parámetros
        const startDateFormatted = this.formatDate(this.startDate);
        const endDateFormatted = this.formatDate(this.endDate);
        
        if (startDateFormatted && endDateFormatted) {
          this.fetchRecords({
            startDate: startDateFormatted,
            endDate: endDateFormatted
          });
        } else {
          alert('Error en el formato de las fechas');
        }
      } else if (!this.startDate && !this.endDate) {
        // Ambas fechas están vacías, obtener registros sin filtros
        this.fetchRecords();
      } else {
        // Una de las fechas está vacía, mostrar mensaje de alerta
        alert('Filtros incompletos. Debes seleccionar ambas fechas o ninguna.');
      }
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  },
  mounted() {
    this.fetchRecords();
  }
}
</script>

<style scoped>
@import url('../styles.css');

.table-wrapper {
  overflow-x: auto;
}

.table-container {
  background-color: var(--white-color);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  overflow-x: auto;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.date-filter {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.date-filter label {
  margin-right: 10px;
}

.date-filter input {
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

.table {
  width: 100%;
  border-collapse: collapse;
  color: var(--title-color);
  font-family: var(--primary-font);
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f9f9f9;
  font-size: 14px;
}

.table td {
  background-color: var(--white-color);
  font-size: 13px;
}

.table-header h3 {
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
}

.delete-button {
  background-color: var(--bg-color);
  color: var(--title-color);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #e0e1e5;
}

.date-filter{
  font-size: 15px;
}

.add-button {
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

.add-button:hover {
  background-color: #1d3a94;
}
</style>









