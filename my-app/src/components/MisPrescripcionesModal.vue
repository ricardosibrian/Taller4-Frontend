<template>
  <div class="modal-container" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h3>Prescripciones médicas</h3>
      <p>ID de la cita: {{ appointmentId }}</p> <!-- Muestra el appointmentId -->
      
      <div v-if="prescripciones.length === 0">
        <p>No hay prescripciones para esta cita.</p>
      </div>
      
      <div v-for="(prescripcion, index) in prescripciones" :key="index">
        <p v-if="prescripcion">{{ `Prescripción ${index + 1}: ${prescripcion.medicine} - Dosis: ${prescripcion.dose}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PrescripcionModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appointmentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      prescripciones: []
    };
  },
  methods: {
    async fetchPrescripciones() {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:8080/api/prescripcion/byAppointmentId';
      const data = {
        appointmentId: this.appointmentId
      };

      try {
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.data && response.data.data) {
          this.prescripciones = response.data.data;
        } else {
          console.error('Respuesta de API inesperada:', response);
        }
      } catch (error) {
        console.error('Error al obtener las prescripciones:', error);
      }
    },
    closeModal() {
      this.$emit('close');
    }
  },
  watch: {
    visible(newValue) {
      if (newValue) {
        this.fetchPrescripciones();
      }
    }
  }
};
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
  z-index: 9999;
}

.modal-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  position: relative;
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

p {
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--title-color);
  font-family: var(--primary-font);
  text-align: left;
}

.modal-actions {
  display: flex;
  justify-content: center;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[type="button"] {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-family: var(--primary-font);
  font-weight: 600;
}

button[type="button"]:hover {
  background-color: #1d3a94;
}
</style>