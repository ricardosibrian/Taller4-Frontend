<template>
  <div class="modal-container" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h3>Aprobar Cita</h3>
      <p class="small-text">Appointment ID: {{ appointmentId }}</p>

      <form class="form-appointment" @submit.prevent="approveAppointment">
        <div class="form-group">
          <label for="appointmentDateTime">Fecha y hora de cita:</label>
          <input type="datetime-local" v-model="appointmentDateTime" id="appointmentDateTime" required />
        </div>

        <div class="form-group">
          <label for="minutesAppointment">Tiempo estimado (minutos):</label>
          <input type="number" v-model="minutesAppointment" id="minutesAppointment" required />
        </div>

        <!-- Selección de cantidad de doctores -->
        <div class="form-group">
          <label for="doctorCount">Cantidad de doctores:</label>
          <select v-model="doctorCount" id="doctorCount" @change="updateDoctors" required>
            <option v-for="option in doctorOptions" :key="option.value" :value="option.value">{{ option.label }}</option>
          </select>
        </div>

        <!-- Campos dinámicos para nombres de doctores y especialidades -->
        <div v-for="(doctor, index) in doctors" :key="index" class="doctor-fields">
          <div class="form-group">
            <label :for="'doctorName' + index">Nombre del doctor {{ index + 1 }}:</label>
            <select v-model="doctor.name" :id="'doctorName' + index" required>
              <option v-for="doctorName in doctorNames" :key="doctorName" :value="doctorName">{{ doctorName }}</option>
            </select>
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
import axios from 'axios';

export default {
  name: 'NewAppointmentModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appointmentId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      appointmentDateTime: '',
      minutesAppointment: '',
      doctorCount: 1,
      doctors: [],
      doctorOptions: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
      ],
      specialties: ['CARDIOLOGY', 'DERMATOLOGY', 'ENDOCRINOLOGY', 'GASTROENTEROLOGY', 'GYNECOLOGY', 'HEMATOLOGY', 'NEUROLOGY', 'ONCOLOGY', 'OPHTHALMOLOGY', 'OTORHINOLARYNGOLOGY', 'PEDIATRICS', 'PSYCHIATRY', 'PULMONOLOGY', 'RHEUMATOLOGY', 'TRAUMATOLOGY', 'UROLOGY', 'GENERAL'],
      doctorNames: []
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async approveAppointment() {
      const token = localStorage.getItem('token');

      // Formatear la fecha y hora en el formato requerido ("YYYY-MM-DD HH:mm:ss")
      const formattedDateTime = this.appointmentDateTime.replace('T', ' ').substring(0, 16) + ':00';

      // Preparar los datos para enviar
      const newAppointmentData = {
        state: "Accepted",
        appointmentDate: formattedDateTime,
        minutesAppointment: this.minutesAppointment,
        doctorEmail: [],
        speciality: []
      };

      // Llenar los arrays doctorEmail y speciality con los datos de los doctores seleccionados
      this.doctors.forEach(doctor => {
        if (doctor.name && doctor.specialty) {
          newAppointmentData.doctorEmail.push(doctor.name);
          newAppointmentData.speciality.push(doctor.specialty);
        }
      });

      // Imprimir la fecha y hora en consola
      console.log('Fecha y hora de cita enviada:', newAppointmentData.appointmentDate);

      try {
        // Realizar la petición POST para aprobar la cita
        const response = await axios.post(`http://localhost:8080/api/appointment/approve/${this.appointmentId}`, newAppointmentData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Manejar la respuesta de éxito
        console.log('Cita aprobada exitosamente:', response.data);
        alert('¡La cita ha sido creada exitosamente!');
        this.$emit('appointment-approved');
      } catch (error) {
        // Manejar errores de la petición
        console.error('Error al crear la cita:', error);
        alert('¡Hubo un error al crear la cita! Por favor, intenta de nuevo.');
      }
    },
    updateDoctors() {
      const count = parseInt(this.doctorCount);
      this.doctors = Array.from({ length: count }, () => ({ name: '', specialty: '' }));
    },
    fetchDoctors() {
      const token = localStorage.getItem('token');
      axios.get('http://localhost:8080/api/user/allDoctors', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.data && response.data.data) {
          this.doctorNames = response.data.data;
        }
      })
      .catch(error => {
        console.error('Error fetching doctors:', error);
      });
    }
  },
  mounted() {
    this.fetchDoctors();
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
  overflow-y: auto;
}

.form-appointment {
  
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
  
  border: 1px solid #dcdcdc;
  border-radius: 5px;
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

.date {
  margin-top: 20px;
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

