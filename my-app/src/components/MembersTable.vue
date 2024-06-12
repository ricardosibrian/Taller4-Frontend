<template>
  <div class="table-container">
    <div class="table-header">
      <h3>Miembros de mi hogar</h3>
      <button class="add-button" @click="addMember">
         Añadir
      </button>
    </div>
    <div class="table-wrapper">
      <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Rol</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in members" :key="index">
          <td>{{ member.name }}</td>
          <td>{{ member.email }}</td>
          <td>{{ member.role }}</td>
          <td><button class="delete-button" @click="removeMember(index)">Eliminar</button></td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MembersTable',
  props: {
    members: {
      type: Array,
      required: true
    }
  },
  methods: {
    removeMember(index) {
      this.$emit('remove-member', index);
    },
    addMember() {
      this.$emit('show-add-member-modal');
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
  margin-top: 20px;
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

.add-button img {
  margin-right: 5px;
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

.table th, .table td {
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

.table-header h3{
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
  background-color: #E0E1E5;  
}
</style>




