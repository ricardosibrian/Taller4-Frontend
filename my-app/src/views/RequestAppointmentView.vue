<template>
  <div class="main-admin-house">
    <div class="main-card">
      <h2>Solicitudes de citas</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Email</th>
              <th>Razón</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="solicitud in solicitudes" :key="solicitud.appointmentId">
              <td>{{ solicitud.requestedDate }}</td>
              <td>{{ solicitud.patientEmail }}</td>
              <td>{{ solicitud.reason }}</td>
              <td>
                <button class="resolve-button accept" @click="openModal(solicitud.appointmentId)">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2ABD8C">
                    <path d="M423.28-291.22 708.87-576.8l-62.46-62.7-223.13 223.13L312.15-527.5l-62.45 62.7 173.58 173.58ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm0-91q133.04 0 225.09-92.04 92.04-92.05 92.04-225.09 0-133.04-92.04-225.09-92.05-92.04-225.09-92.04-133.04 0-225.09 92.04-92.04 92.05-92.04 225.09 0 133.04 92.04 225.09 92.05 92.04 225.09 92.04ZM480-480Z"/>
                  </svg>
                </button>
                <button class="resolve-button deny" @click="rejectSolicitud(solicitud.appointmentId)">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#535356">
                    <path d="M338.63-280 480-421.37 621.37-280 680-338.63 538.63-480 680-621.37 621.37-680 480-538.63 338.63-680 280-621.37 421.37-480 280-338.63 338.63-280ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm0-91q133.04 0 225.09-92.04 92.04-92.05 92.04-225.09 0-133.04-92.04-225.09-92.05-92.04-225.09-92.04-133.04 0-225.09 92.04-92.04 92.05-92.04 225.09 0 133.04 92.04 225.09 92.05 92.04 225.09 92.04ZM480-480Z"/>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal del componente NewAppointmentModal -->
    <NewAppointmentModal :visible="modalVisible" :appointmentId="currentAppointmentId" @close="modalVisible = false" @appointment-approved="handleAppointmentApproved" />
  </div>
</template>

<script>
import axios from 'axios';
import NewAppointmentModal from '../components/NewAppointmentModal.vue';

export default {
  name: 'AdminAppointmentsView',
  components: {
    NewAppointmentModal,
  },
  data() {
    return {
      solicitudes: [],
      modalVisible: false,
      currentAppointmentId: null,
    };
  },
  methods: {
    openModal(appointmentId) {
      this.currentAppointmentId = appointmentId;
      console.log(`Aceptar solicitud con ID: ${appointmentId}`);
      this.modalVisible = true;
    },
    rejectSolicitud(appointmentId) {
      const token = localStorage.getItem('token');
      const rejectData = {
        state: "Rejected",
        appointmentDate: "2024-06-20 13:22:00",
        minutesAppointment: "25"
      };

      axios.post(`http://localhost:8080/api/appointment/approve/${appointmentId}`, rejectData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(`Solicitud rechazada con ID: ${appointmentId}`);
        // Actualizar la tabla después de rechazar la solicitud
        this.fetchSolicitudes();
      })
      .catch(error => {
        console.error('Error al rechazar la solicitud:', error);
        // Manejar el error según sea necesario
      });
    },
    fetchSolicitudes() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:8080/api/appointment/requestAppointments', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data && response.data.data) {
          this.solicitudes = response.data.data.map(item => ({
            appointmentId: item.appointmentId,
            requestedDate: item.requestedDate,
            patientEmail: item.patientEmail,
            reason: item.reason
          }));
        }
      })
      .catch(error => {
        console.error('Error al obtener las solicitudes de citas:', error);
      });
    },
    handleAppointmentApproved() {
      this.modalVisible = false;
      this.fetchSolicitudes(); // Recargar solicitudes para reflejar cambios
    }
  },
  mounted() {
    this.fetchSolicitudes();
  }
};
</script>




<style scoped>
@import url('../styles.css');

.main-admin-house {
  padding: 20px;
}

.accept{
  margin-right: 10px;
}
.main-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.table-container {
  margin-top: 20px;
  overflow-x: auto;
}

h2 {
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
}

table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

thead {
  background-color: #f4f4f4;
}

.table-container {
  width: 100%;
  border-collapse: collapse;
  color: var(--title-color);
  font-family: var(--primary-font);
}

.table-container th,
.table-container td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.table-container th {
  background-color: #f9f9f9;
  font-size: 14px;
}

.table-container td {
  font-size: 13px;
}

.icon-action {
  font-size: 20px;
  cursor: pointer;
  margin-right: 10px;
}

.icon-action:hover {
  color: #007BFF;
}

.icon-action:nth-child(1) {
  color: green;
}

.icon-action:nth-child(2) {
  color: red;
}
</style>


