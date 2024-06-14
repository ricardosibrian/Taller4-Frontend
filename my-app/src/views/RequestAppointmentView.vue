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
            <tr v-for="solicitud in solicitudes" :key="solicitud.id">
              <td>{{ solicitud.fecha }}</td>
              <td>{{ solicitud.email }}</td>
              <td>{{ solicitud.razon }}</td>
              <td>
                <span @click="openModal()" class="icon-action">✔️</span>
                <span @click="rejectSolicitud(solicitud.id)" class="icon-action">❌</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal del componente AddMemberModal -->
    <AddMemberModal :visible="modalVisible" @close="modalVisible = false" @add-member="handleAddMember" />
  </div>
</template>

<script>
import AddMemberModal from '../components/NewAppointmentModal.vue';

export default {
  name: 'AdminAppointmentsView',
  components: {
    AddMemberModal,
  },
  data() {
    return {
      solicitudes: [
        { id: 1, fecha: '2024-06-10', email: 'juan.perez@example.com', razon: 'Consulta general' },
        { id: 2, fecha: '2024-06-11', email: 'maria.lopez@example.com', razon: 'Revisión anual' },
        { id: 3, fecha: '2024-06-12', email: 'carlos.martinez@example.com', razon: 'Consulta de seguimiento' },
      ],
      modalVisible: false,
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    rejectSolicitud(id) {
      this.solicitudes = this.solicitudes.filter(solicitud => solicitud.id !== id);
    },
    handleAddMember() {
      this.modalVisible = false;
    },
  },
};
</script>

<style scoped>
@import url('../styles.css');

.main-admin-house {
  padding: 20px;
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


