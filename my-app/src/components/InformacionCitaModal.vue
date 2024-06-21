<template>
  <div class="modal-container" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h3>Información de la cita</h3>
      <p>ID de la cita: {{ appointmentId }}</p>
      <p class="titles">Doctores:</p>
      <ul>
        <li v-for="doctor in doctors" :key="doctor">{{ doctor }}</li>
      </ul>
      <p class="titles">Historial del paciente:</p>
      <ul>
        <li v-for="history in histories" :key="history">{{ history }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InformacionCitaModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    appointmentId: {
      type: String,
      required: true
    },
    doctors: {
      type: Array,
      required: true
    },
    histories: {
      type: Array,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
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
    margin-bottom: 0px;
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

  ul{
    font-size: 13px;
    color: var(--title-color);
    font-family: var(--primary-font);
    text-align: left;
  }

  li{
    list-style-type: none;
  }

  .titles{
    font-weight: 800;
  }
  </style>