<template>
  <div class="table-container">
    <div class="table-header">
      <h3>Mis citas</h3>
      <div class="filter-container">
        <label for="stateFilter">Filtrar por estado:</label>
        <select id="stateFilter" v-model="selectedState">
          <option value="">Todos</option>
          <option value="PENDING_OF_APPROVAL">PENDING_OF_APPROVAL</option>
          <option value="PENDING_OF_REALIZATION">PENDING_OF_REALIZATION</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="FINALIZED">FINALIZED</option>
          <option value="REJECTED">REJECTED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>
      <button class="add-button" @click="filterAppointments">
        Filtrar
      </button>
      <button class="add-button" @click="showAddAppointmentModal = true">
        Solicitar cita
      </button>
    </div>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Fecha de solicitud</th>
            <th>Razón</th>
            <th>Estado</th>
            <th>Fecha/Hora a realizar</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in appointments" :key="index">
            <td>{{ appointment.requestedDate }}</td>
            <td>{{ appointment.appointmentReason }}</td>
            <td>{{ appointment.appointmentState }}</td>
            <td>{{ appointment.realizationDate ? appointment.realizationDate : 'Aún no definido' }}</td>
            <td>
              <button class="delete-button" @click="openPrescripcionesModal(appointment)">Prescripciones</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <SolicitarCitaModal :visible="showAddAppointmentModal" @close="showAddAppointmentModal = false" @appointment-created="fetchAppointments" />
    <MisPrescripcionesModal :visible="showPrescripcionesModal" :appointment-id="selectedAppointmentId" @close="showPrescripcionesModal = false" />
  </div>
</template>


<script>
import axios from 'axios';
import SolicitarCitaModal from './SolicitarCitaModal.vue';
import MisPrescripcionesModal from './MisPrescripcionesModal.vue';

export default {
  name: 'MyCitasTable',
  components: {
    SolicitarCitaModal,
    MisPrescripcionesModal
  },
  data() {
    return {
      appointments: [],
      showAddAppointmentModal: false,
      showPrescripcionesModal: false,
      selectedAppointmentId: null,
      selectedState: '' // Estado seleccionado del filtro
    };
  },
  created() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments(state = '') {
      const token = localStorage.getItem('token');
      let url = 'http://localhost:8080/api/appointment/own';

      if (state) {
        url += `?state=${state}`;
      }

      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Response from API:', response.data); // Agregado para inspeccionar la respuesta
        // Verificar si response.data.data.appointments es un arreglo
        if (Array.isArray(response.data.data.appointments)) {
          this.appointments = response.data.data.appointments.map(appointment => ({
            requestedDate: appointment.requestedDate,
            appointmentReason: appointment.appointmentReason,
            appointmentState: appointment.appointmentState,
            realizationDate: appointment.realizationDate,
            appointmentId: appointment.appointmentId // Asegúrate de incluir appointmentId
          }));
        } else {
          console.error('Expected an array but got:', response.data.data.appointments);
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    },
    filterAppointments() {
      this.fetchAppointments(this.selectedState);
    },
    openPrescripcionesModal(appointment) {
      this.selectedAppointmentId = appointment.appointmentId;
      this.showPrescripcionesModal = true;
    }
  }
};
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

.filter-container {
  display: flex;
  align-items: center;
}

.filter-container label {
  margin-right: 10px;
  font-size: 14px;
  color: var(--title-color);
}

.filter-container select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: var(--title-color);
}
</style>








