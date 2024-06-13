<template>
  <div class="modal-container" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h3>Crear cita médica</h3>
      <form class="form-appointment" @submit.prevent="confirmAddAppointment">
        <div class="form-group">
          <label for="email">Correo electrónico del paciente:</label>
          <input type="email" v-model="patientEmail" id="email" required />
        </div>
        <div class="form-group">
          <label for="appointmentDate">Fecha de cita:</label>
          <input type="date" v-model="appointmentDate" id="appointmentDate" required />
        </div>
        <div class="form-group">
          <label for="doctorCount">Cantidad de doctores:</label>
          <select id="doctorCount" v-model="doctorCount" required>
            <option v-for="count in doctorCounts" :key="count">{{ count }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="specialty">Especialidad:</label>
          <select id="specialty" v-model="specialty" required>
            <option v-for="specialty in specialties" :key="specialty">{{ specialty }}</option>
          </select>
        </div>
        <div class="modal-actions">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">Crear cita</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddMemberModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      patientEmail: '',
      appointmentDate: '',
      doctorCount: 1,
      specialty: '',
      doctorCounts: [1, 2, 3, 4, 5],
      specialties: ['Cardiología', 'Dermatología', 'Endocrinología', 'Gastroenterología', 'Neurología', 'Oncología', 'Pediatría', 'Psiquiatría', 'Traumatología']
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAddAppointment() {
      const newAppointmentData = {
        email: this.patientEmail,
        appointmentDate: this.appointmentDate,
        doctorCount: this.doctorCount,
        specialty: this.specialty
      };
      this.$emit('add-appointment', newAppointmentData);
      this.patientEmail = '';
      this.appointmentDate = '';
      this.doctorCount = 1;
      this.specialty = '';
      this.closeModal();
    }
  }
}
</script>

<style scoped>
.modal-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 8888;
}

.modal-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  max-height: 500px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  position: relative;
}

.form-appointment {
  overflow-y: auto;
  max-height: 400px;
  padding: 5px;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-content h3 {
  margin-bottom: 20px;
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: var(--title-color);
  font-family: var(--primary-font);
  text-align: left;
}

input[type="email"], input[type="date"], select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

input:focus, select:focus {
  outline-color: var(--primary-color);
}

.modal-actions {
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  margin-top: 30px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"] {
  background-color: var(--bg-color);
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  font-weight: 600;
}

button[type="button"]:hover {
  background-color: #E0E1E5;  
}

button[type="submit"] {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-family: var(--primary-font);
  font-weight: 600;
}

button[type="submit"]:hover {
  background-color: #1d3a94;
}
</style>





