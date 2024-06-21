<template>
  <div class="permissions-table-container">
    <h2>Gestión de citas</h2>
    <div class="tabs">
      <button :class="{ active: activeTab === 'pendientes' }" @click="setActiveTab('pendientes')">Citas pendientes</button>
      <button :class="{ active: activeTab === 'finalizadas' }" @click="setActiveTab('finalizadas')">Citas finalizadas</button>
    </div>
    <div v-if="activeTab === 'pendientes'" class="date-filter2">
      <label for="startDate">Buscar mis citas para un día específico:</label>
      <input type="date" id="startDate" v-model="startDate" />
      <button class="filter-button" @click="fetchPendingAppointments">
        Buscar
      </button>
    </div>
    <div class="table-wrapper" v-if="activeTab === 'pendientes'">
      <table class="permissions-table">
        <thead>
          <tr>
            <th>Fecha/Hora a realizar</th>
            <th>Paciente</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in pendingAppointments" :key="index">
            <td>{{ appointment.realizationDate }}</td>
            <td>{{ appointment.patient }}</td>
            <td>
              <button @click="mostrarInformacion(appointment)" class="resolve-button informacion">Información</button>
              <button @click="finalizarCita(appointment)" class="resolve-button finalizar">Finalizar</button>
            </td>
          </tr>
          <tr v-if="pendingAppointments.length === 0">
            <td colspan="3" class="text-center">No hay citas pendientes para la fecha seleccionada</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-wrapper" v-else>
      <table class="permissions-table">
        <thead>
          <tr>
            <th>Fecha/Hora que se realizó</th>
            <th>Paciente</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in finalizedAppointments" :key="index">
            <td>{{ appointment.realizationDate }}</td>
            <td>{{ appointment.patient }}</td>
            <td>
              <button @click="mostrarPrescripcion(appointment)" class="resolve-button prescripcion">Prescripción</button>
            </td>
          </tr>
          <tr v-if="finalizedAppointments.length === 0">
            <td colspan="3" class="text-center">No hay citas finalizadas</td>
          </tr>
        </tbody>
      </table>
    </div>
    <PrescripcionModal :visible="modalVisible" :appointmentId="selectedAppointmentId" @close="modalVisible = false" />
    <InformacionCitaModal 
      :visible="infoModalVisible" 
      :appointmentId="selectedAppointmentId" 
      :doctors="selectedAppointmentDoctors"
      :histories="selectedAppointmentHistories"
      @close="infoModalVisible = false" 
    />
  </div>
</template>

<script>
import axios from 'axios';
import PrescripcionModal from '../components/PrescripcionModal.vue';
import InformacionCitaModal from '../components/InformacionCitaModal.vue';

export default {
  name: 'CitasTable',
  components: {
    PrescripcionModal,
    InformacionCitaModal
  },
  data() {
    return {
      activeTab: 'pendientes',
      modalVisible: false,
      infoModalVisible: false,
      startDate: '',
      pendingAppointments: [],
      finalizedAppointments: [],
      selectedAppointmentId: null,
      selectedAppointmentDoctors: [],
      selectedAppointmentHistories: []
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
      if (tab === 'finalizadas') {
        this.fetchFinalizedAppointments();
      }
    },
    fetchPendingAppointments() {
      if (!this.startDate) {
        alert('Por favor selecciona una fecha antes de buscar citas.');
        return;
      }

      const token = localStorage.getItem('token');
      const formattedDate = this.formatDate(this.startDate);
      const url = `http://localhost:8080/api/clinic/schedule?state=PENDING_OF_REALIZATION&&date=${formattedDate}`;

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data && response.data.data) {
          this.pendingAppointments = response.data.data.map(appointment => ({
            appointmentId: appointment.appointmentId,
            realizationDate: appointment.realizationDate,
            patient: appointment.patient,
            doctor: appointment.doctor,
            histories: appointment.histories
          }));
        } else {
          console.error('Respuesta de API inesperada:', response);
        }
      })
      .catch(error => {
        console.error('Error al obtener las citas pendientes:', error);
      });
    },
    fetchFinalizedAppointments() {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:8080/api/clinic/schedule?state=FINALIZED&&date=null';

      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data && response.data.data) {
          this.finalizedAppointments = response.data.data.map(appointment => ({
            appointmentId: appointment.appointmentId, // Añade esta línea para capturar el appointmentId
            realizationDate: appointment.realizationDate,
            patient: appointment.patient
          }));
        } else {
          console.error('Respuesta de API inesperada:', response);
        }
      })
      .catch(error => {
        console.error('Error al obtener las citas finalizadas:', error);
      });
    },
    finalizarCita(appointment) {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:8080/api/appointment/finish';
      const data = {
        appointmentIdentifier: appointment.appointmentId
      };

      axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        alert('Cita finalizada con éxito');
        // Actualizar la lista de citas pendientes
        this.fetchPendingAppointments();
      })
      .catch(error => {
        console.error('Error al finalizar la cita:', error);
        alert('Error al finalizar la cita');
      });
    },
    mostrarPrescripcion(appointment) {
      this.selectedAppointmentId = appointment.appointmentId; // Almacena el appointmentId seleccionado
      this.modalVisible = true;
    },
    mostrarInformacion(appointment) {
      this.selectedAppointmentId = appointment.appointmentId;
      this.selectedAppointmentDoctors = appointment.doctor;
      this.selectedAppointmentHistories = appointment.histories;
      this.infoModalVisible = true;
    },
    formatDate(date) {
      const [year, month, day] = date.split('-');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} 00:00:00`;
    }
  }
};
</script>





<style scoped>
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

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-family: var(--primary-font);
  color: var(--title-color);
  border-bottom: 2px solid transparent;
}

.tabs button.active {
  border-bottom: 2px solid var(--primary-color);
  color: var(--primary-color);
  font-weight: 600;
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
  background-color: var(--bg-color);
  color: var(--title-color);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.date-filter2 {
  display: flex;
  justify-content: space-between;
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
</style>


