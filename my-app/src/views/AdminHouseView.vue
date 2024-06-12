<template>
  <div class="main-admin-house">
    <div class="main-card">
    <h2>Registro de hogares</h2>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Nº de casa</th>
            <th>Encargado</th>
            <th>Habitantes</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="house in houses" :key="house.id">
            <td>{{ house.numeroCasa }}</td>
            <td>{{ house.encargado }}</td>
            <td>{{ house.habitantes }}</td>
            <td><router-link to="/mainView/adminHouseDetailView" class="admin-home"><button>Administrar</button></router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'AdminHouseView',
  data() {
    return {
      houses: [
        { id: 1, numeroCasa: 1, encargado: 'Carlos García', habitantes: 3 },
        { id: 2, numeroCasa: 2, encargado: 'Carlos García', habitantes: 4 },
        { id: 3, numeroCasa: 3, encargado: 'Carlos García', habitantes: 5 },
        { id: 4, numeroCasa: 4, encargado: 'Carlos García', habitantes: 2 },
        { id: 5, numeroCasa: 5, encargado: 'Carlos García', habitantes: 6 },
        { id: 6, numeroCasa: 6, encargado: 'Carlos García', habitantes: 2 },
        { id: 7, numeroCasa: 7, encargado: 'Carlos García', habitantes: 3 },
        { id: 8, numeroCasa: 8, encargado: 'Carlos García', habitantes: 4 },
        { id: 9, numeroCasa: 9, encargado: 'Carlos García', habitantes: 3 },
        { id: 10, numeroCasa: 10, encargado: 'Carlos García', habitantes: 2 },
      ]
    };
  },
  methods: {
    administrar(id) {
      console.log(`Administrar casa con id: ${id}`);
    }
  }
}
</script>

<style scoped>
@import url('../styles.css');

.main-admin-house{
  padding: 20px;
  margin-top: 20px;
}
.main-card{
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.table-container {
  margin-top: 20px;
  overflow-x: auto;
}

h2{
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

.table-container{
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

.admin-home {
  background-color: var(--bg-color);
  color: var(--title-color);
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.admin-home:hover {
  background-color: #E0E1E5;  
}
</style>
