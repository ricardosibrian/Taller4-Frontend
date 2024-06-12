<template>
  <div class="modal-container" v-if="visible">
    <div class="modal-content">
      <button class="close-button" @click="closeModal">✕</button>
      <h3>Crear un nuevo permiso</h3>
      <form class="form-permission" @submit.prevent="confirmAddMember">
        <label for="email">Correo electrónico del visitante:</label>
        <input type="email" v-model="newMemberEmail" id="email" required />
        <div class="form-group">
          <label for="residentInCharge">Tipo de entrada</label>
          <select id="residentInCharge" v-model="entryType">
            <option>Entrada única</option>
            <option>Entrada múltiple</option>
          </select>
        </div>
        <div class="form-group">
          <label for="qrValidity">Tipo de creación de permiso:</label>
          <select id="qrValidity" v-model="permissionType">
            <option value="10 min">Creación única</option>
            <option value="15 min">Creación periódica</option>
          </select>
        </div>
        <div class="form-group">
          <label for="startDateTime">Fecha y hora de inicio:</label>
          <input type="datetime-local" v-model="startDateTime" id="startDateTime" required />
        </div>
        <div class="form-group">
          <label for="endDateTime">Fecha y hora de fin:</label>
          <input type="datetime-local" v-model="endDateTime" id="endDateTime" required />
        </div>
        <div class="form-group">
          <label>Días de la semana:</label>
          <div class="days-checkboxes">
            <label v-for="day in daysOfWeek" :key="day.value" class="days">
              <input type="checkbox" v-model="selectedDays" :value="day.value" />
              {{ day.label }}
            </label>
          </div>
        </div>
        <div class="modal-actions">
          <button type="button" @click="closeModal">Cancelar</button>
          <button type="submit">Crear permiso</button>
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
      newMemberEmail: '',
      startDateTime: '',
      endDateTime: '',
      entryType: '',
      permissionType: '',
      selectedDays: [],
      daysOfWeek: [
        { label: 'Lunes', value: 'monday' },
        { label: 'Martes', value: 'tuesday' },
        { label: 'Miércoles', value: 'wednesday' },
        { label: 'Jueves', value: 'thursday' },
        { label: 'Viernes', value: 'friday' },
        { label: 'Sábado', value: 'saturday' },
        { label: 'Domingo', value: 'sunday' },
      ]
    };
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    confirmAddMember() {
      const newMemberData = {
        email: this.newMemberEmail,
        startDateTime: this.startDateTime,
        endDateTime: this.endDateTime,
        entryType: this.entryType,
        permissionType: this.permissionType,
        selectedDays: this.selectedDays
      };
      this.$emit('add-member', newMemberData);
      this.newMemberEmail = '';
      this.startDateTime = '';
      this.endDateTime = '';
      this.entryType = '';
      this.permissionType = '';
      this.selectedDays = [];
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

.form-permission {
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

input[type="email"], input[type="datetime-local"] {
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
  border-color: var (--title-color);
}

select:focus {
  outline-color: var(--primary-color);
}

.days-checkboxes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.days-checkboxes label {
  display: flex;
  align-items: center;
  font-size: 14px;
  gap: 3px;
  color: var(--title-color);
  font-family: var(--primary-font);
}
</style>





