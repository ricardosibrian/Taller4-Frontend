<template>
  <div class="main-admin-house">
    <MyRecordTable 
        :appointments="appointments" 
        @show-add-appointment-modal="showModal"
        @cancel-appointment="handleCancelAppointment"
      />
  </div>
</template>

<script>
import MyRecordTable from '../components/MyRecordTable.vue';

export default {
  components: {
    MyRecordTable
  },
  methods: {
    showModal() {
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    handleAddAppointment(newMemberEmail) {
      const newAppointment = {
        name: 'Nuevo Paciente',
        requestDate: new Date().toISOString().split('T')[0],
        status: 'Pendiente',
        reason: newMemberEmail
      };
      this.appointments.push(newAppointment);
      this.hideModal();
    },
    handleCancelAppointment(index) {
      this.appointments.splice(index, 1);
    }
  }
}
</script>

<style scoped>
@import url('../styles.css');

.main-admin-house {
  padding: 20px;
}

.table-container {
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

.admin-home {
  background-color: var(--bg-color);
  color: var(--title-color);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.admin-home:hover {
  background-color: #e0e1e5;
}
</style>
