<template>
  <div class="modal-container" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h3>Crear una nueva cita</h3>
      <form class="form-appointment" @submit.prevent="confirmAddAppointment">
        <label for="email">Tiempo estimado:</label>
        <input type="text" v-model="patientEmail" id="email" required />

        <div class="form-group">
          <label for="appointmentDateTime">Fecha y hora de cita:</label>
          <input type="datetime-local" v-model="appointmentDateTime" id="appointmentDateTime" required />
        </div>

        <div class="form-group">
          <label>Cantidad de doctores:</label>
          <select v-model="doctorCount" @change="updateDoctors">
            <option v-for="option in doctorOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>

        <!-- Dinámico: campos para nombre de doctor y especialidad -->
        <div v-for="(doctor, index) in doctors" :key="index" class="doctor-fields">
          <div class="form-group">
            <label :for="'doctorName' + index">Nombre del doctor {{ index + 1 }}:</label>
            <input type="text" v-model="doctor.name" :id="'doctorName' + index" required />
          </div>
          <div class="form-group">
            <label :for="'doctorSpecialty' + index">Especialidad:</label>
            <select v-model="doctor.specialty" :id="'doctorSpecialty' + index" required>
              <option v-for="specialty in specialties" :key="specialty" :value="specialty">{{ specialty }}</option>
            </select>
          </div>
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
  name: 'AddAppointmentModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      patientEmail: '',
      appointmentDateTime: '',
      doctorCount: 1,
      doctors: [{ name: '', specialty: '' }],
      doctorOptions: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
      ],
      specialties: ['Cardiología', 'Neurología', 'Pediatría', 'Oftalmología', 'Dermatología']
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAddAppointment() {
      const newAppointmentData = {
        patientEmail: this.patientEmail,
        appointmentDateTime: this.appointmentDateTime,
        doctors: this.doctors
      };
      this.$emit('add-appointment', newAppointmentData);
      this.patientEmail = '';
      this.appointmentDateTime = '';
      this.doctors = [{ name: '', specialty: '' }];
      this.closeModal();
    },
    updateDoctors() {
      const count = parseInt(this.doctorCount);
      this.doctors = Array.from({ length: count }, () => ({ name: '', specialty: '' }));
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

input[type="email"], input[type="datetime-local"], input[type="text"] {
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

input[type="datetime-local"] {
  margin-bottom: 0px;
}

input:focus {
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

.form-group {
  margin-bottom: 20px;
}

select, input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

option {
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

option:focus {
  outline-color: var(--primary-color);
  padding: 10px;
}

select {
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

select:focus {
  outline-color: var(--primary-color);
}

.doctor-fields .form-group {
  margin-bottom: 20px;
}

.doctor-fields label {
  display: block;
  font-size: 14px;
  color: var(--title-color);
  font-family: var(--primary-font);
  text-align: left;
}

.doctor-fields input, .doctor-fields select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>

