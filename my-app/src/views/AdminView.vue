<template>
  <div class="main-admin-roles">
    <div class="main-card">
      <h2>Administrar Roles</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.nombre }}</td>
              <td>
                <select v-model="user.rol">
                  <option v-for="rol in roles" :key="rol" :value="rol">{{ rol }}</option>
                </select>
              </td>
              <td>
                <button @click="updateRole(user)" class="update-role">Actualizar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminRolesView',
  data() {
    return {
      users: [
        { id: 1, nombre: 'Juan Pérez', rol: 'Admin' },
        { id: 2, nombre: 'María López', rol: 'Usuario' },
        { id: 3, nombre: 'Carlos Martínez', rol: 'Moderador' },
      ],
      roles: ['Admin', 'Usuario', 'Moderador'],
    };
  },
  methods: {
    updateRole(user) {
      // Lógica para actualizar el rol del usuario
      console.log(`Rol de ${user.nombre} actualizado a ${user.rol}`);
    },
  },
};
</script>

<style scoped>
@import url('../styles.css');

.main-admin-roles {
  padding: 20px;
}
.main-card {
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.table-container {
  margin-top: 20px;
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

.update-role {
  background-color: var(--bg-color);
  color: var(--title-color);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.update-role:hover {
  background-color: #e0e1e5;
}

select {
  padding: 5px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}
</style>

