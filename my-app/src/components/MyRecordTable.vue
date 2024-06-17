<template>
  <div class="table-container">
    <div class="table-header">
      <h3>Mi historial médico</h3>
    </div>
    <div class="date-filter">
      <label for="startDate">Fecha Inicio:</label>
      <input type="date" id="startDate" v-model="startDate" @change="filterAppointments" />
      <label for="endDate">Fecha Fin:</label>
      <input type="date" id="endDate" v-model="endDate" @change="filterAppointments" />
    </div>
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Razón</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(appointment, index) in filteredAppointments" :key="index">
            <td>{{ appointment.requestDate }}</td>
            <td>{{ appointment.reason }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyCitasTable',
  props: {
    appointments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      startDate: '',
      endDate: '',
      filteredAppointments: this.appointments
    };
  },
  methods: {
    filterAppointments() {
      if (this.startDate && this.endDate) {
        this.filteredAppointments = this.appointments.filter(appointment => {
          const appointmentDate = new Date(appointment.requestDate);
          return appointmentDate >= new Date(this.startDate) && appointmentDate <= new Date(this.endDate);
        });
      } else {
        this.filteredAppointments = this.appointments;
      }
    }
  },
  watch: {
    appointments(newAppointments) {
      this.filteredAppointments = newAppointments;
    }
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

.date-filter{
  font-size: 15px;
}
</style>









