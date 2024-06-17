<template>
  <div class="permissions-table-container">
    <h2>Gestión de citas</h2>
    <div class="tabs">
      <button :class="{ active: activeTab === 'pendientes' }" @click="setActiveTab('pendientes')">Citas pendientes</button>
      <button :class="{ active: activeTab === 'finalizadas' }" @click="setActiveTab('finalizadas')">Citas finalizadas</button>
    </div>
    <div class="table-wrapper" v-if="activeTab === 'pendientes'">
      <table class="permissions-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Razón</th>
            <th>Fecha de realización</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citasPendientes" :key="cita.id">
            <td>{{ cita.paciente }}</td>
            <td>{{ cita.razon }}</td>
            <td>{{ cita.fechaRealizacion }}</td>
            <td>
              <button @click="finalizarCita(cita)" class="resolve-button finalizar">Finalizar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-wrapper" v-else>
      <table class="permissions-table">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Razón</th>
            <th>Fecha de finalización</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cita in citasFinalizadas" :key="cita.id">
            <td>{{ cita.paciente }}</td>
            <td>{{ cita.razon }}</td>
            <td>{{ cita.fechaFinalizacion }}</td>
            <td>
              <button @click="mostrarPrescripcion(cita)" class="resolve-button prescripcion">Prescripción</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PrescripcionModal :visible="modalVisible" @close="modalVisible = false" />
  </div>
</template>

<script>
import PrescripcionModal from '../components/PrescripcionModal.vue';

export default {
  name: 'CitasTable',
  components: {
    PrescripcionModal
  },
  data() {
    return {
      activeTab: 'pendientes',
      modalVisible: false,
      citasPendientes: [
        { id: 1, paciente: 'Juan Pérez', razon: 'Consulta general', fechaRealizacion: '2024-06-15' },
        { id: 2, paciente: 'María López', razon: 'Revisión anual', fechaRealizacion: '2024-06-16' },
        { id: 3, paciente: 'Carlos Martínez', razon: 'Consulta de seguimiento', fechaRealizacion: '2024-06-17' },
      ],
      citasFinalizadas: [
        { id: 1, paciente: 'Ana Gómez', razon: 'Consulta de control', fechaFinalizacion: '2024-05-10' },
        { id: 2, paciente: 'Luis Fernández', razon: 'Revisión post-operatoria', fechaFinalizacion: '2024-05-11' },
        { id: 3, paciente: 'Sofía González', razon: 'Consulta dermatológica', fechaFinalizacion: '2024-05-12' },
      ],
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    finalizarCita(cita) {
      console.log(`Finalizando cita: ${cita.id}`);
    },
    mostrarPrescripcion(cita) {
      this.modalVisible = true;
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
}

.resolve-button.finalizar {
  background-color: var(--primary-color);
  color: white;
}

.resolve-button.prescripcion {
  background-color: var(--primary-color);
  color: white;
}
</style>



