<template>
  <div class="modal-container" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h3>Prescripción médica</h3>
      <p>ID de la cita: {{ appointmentId }}</p> <!-- Muestra el appointmentId -->
      <form class="form-prescription" @submit.prevent="submitPrescripcion">
        <div class="form-group">
          <label for="numPrescripciones">Cantidad de prescripciones:</label>
          <select v-model="numPrescripciones" @change="updatePrescripciones">
            <option v-for="n in prescripcionOptions" :key="n.value" :value="n.value">{{ n.label }}</option>
          </select>
        </div>
        
        <div v-for="(prescripcion, index) in prescripciones.slice(0, numPrescripciones)" :key="index" class="prescripcion-fields">
          <div class="form-group">
            <label :for="'medicamento-' + index">Medicamento {{ index + 1 }}:</label>
            <input type="text" v-model="prescripcion.medicamento" :id="'medicamento-' + index" required />
          </div>
          <div class="form-group">
            <label :for="'dosis-' + index">Dosis:</label>
            <input type="text" v-model="prescripcion.dosis" :id="'dosis-' + index" required />
          </div>
        </div>
        
        <div class="modal-actions">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">Agregar</button>
        </div>
      </form>
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
      type: String, // Cambia el tipo a String
      required: true
    }
  },
  data() {
    return {
      numPrescripciones: 1,
      prescripciones: Array.from({ length: 5 }, () => ({ medicamento: '', dosis: '' })),
      prescripcionOptions: [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 }
      ],
      defaultEndDate: '2024-06-20' // Fecha de fin por defecto
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    submitPrescripcion() {
      const token = localStorage.getItem('token');
      const prescripcionesValidas = this.prescripciones.slice(0, this.numPrescripciones).map(prescripcion => ({
        medicine: prescripcion.medicamento,
        dose: prescripcion.dosis,
        endDate: this.defaultEndDate // Establece la fecha de fin por defecto
      }));

      const data = {
        appointmentId: this.appointmentId,
        prescriptions: prescripcionesValidas
      };

      axios.post('http://localhost:8080/api/clinic/prescriptions', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        alert('Prescripción agregada con éxito');
        this.closeModal();
      })
      .catch(error => {
        console.error('Error al agregar la prescripción:', error);
        alert('Error al agregar la prescripción');
      });
    },
    updatePrescripciones() {
      // Ajustar el tamaño del array de prescripciones si es necesario
      if (this.prescripciones.length < this.numPrescripciones) {
        this.prescripciones.push(...Array.from({ length: this.numPrescripciones - this.prescripciones.length }, () => ({ medicamento: '', dosis: '' })));
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
  max-height: 500px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  width: 400px;
  position: relative;
  overflow-y: auto;
}

.form-prescription {
  
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

input[type="text"], select {
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

.prescripcion-fields label {
  display: block;
  font-size: 14px;
  color: var(--title-color);
  font-family: var(--primary-font);
  text-align: left;
}

.prescripcion-fields input, .prescripcion-fields select {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>