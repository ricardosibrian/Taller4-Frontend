<template>
  <div class="permissions-table-container">
    <h2>Gestión de permisos</h2>
    <div class="tabs">
      <button :class="{ active: activeTab === 'solicitudes' }" @click="setActiveTab('solicitudes')">Historial de solicitudes</button>
      <button :class="{ active: activeTab === 'activos' }" @click="setActiveTab('activos')">Permisos activos</button>
    </div>
    <div class="filter-container">
      <input type="text" placeholder="Buscar por nombre de visitante" v-model="searchQuery" />
      <div class="dropdown">
        <button @click="toggleDropdown" class="dropdown-button">
          Filtrar por fecha de creación
        </button>
        <div v-if="dropdownVisible" class="dropdown-menu">
          <button @click="sortPermissions('oldest')">Más antigua</button>
          <button @click="sortPermissions('newest')">Más reciente</button>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="permissions-table">
      <thead>
        <tr>
          <th>Solicitante</th>
          <th>Visitante</th>
          <th>Fecha de permiso</th>
          <th>Hora de inicio</th>
          <th>Hora de fin</th>
          <th>Tipo de permiso</th>
          <th>Responder</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="permission in filteredPermissions" :key="permission.id">
          <td>{{ permission.requester }}</td>
          <td>{{ permission.visitor }}</td>
          <td>{{ permission.permissionDate }}</td>
          <td>{{ permission.startTime }}</td>
          <td>{{ permission.endTime }}</td>
          <td>{{ permission.permissionType }}</td>
          <td>
          <button class="resolve-button accept">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#284AC7"><path d="M423.28-291.22 708.87-576.8l-62.46-62.7-223.13 223.13L312.15-527.5l-62.45 62.7 173.58 173.58ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm0-91q133.04 0 225.09-92.04 92.04-92.05 92.04-225.09 0-133.04-92.04-225.09-92.05-92.04-225.09-92.04-133.04 0-225.09 92.04-92.04 92.05-92.04 225.09 0 133.04 92.04 225.09 92.05 92.04 225.09 92.04ZM480-480Z"/>
            </svg>
          </button>
          <button class="resolve-button deny">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#535356"><path d="M338.63-280 480-421.37 621.37-280 680-338.63 538.63-480 680-621.37 621.37-680 480-538.63 338.63-680 280-621.37 421.37-480 280-338.63 338.63-280ZM480-71.87q-84.91 0-159.34-32.12-74.44-32.12-129.5-87.17-55.05-55.06-87.17-129.5Q71.87-395.09 71.87-480t32.12-159.34q32.12-74.44 87.17-129.5 55.06-55.05 129.5-87.17 74.43-32.12 159.34-32.12t159.34 32.12q74.44 32.12 129.5 87.17 55.05 55.06 87.17 129.5 32.12 74.43 32.12 159.34t-32.12 159.34q-32.12 74.44-87.17 129.5-55.06 55.05-129.5 87.17Q564.91-71.87 480-71.87Zm0-91q133.04 0 225.09-92.04 92.04-92.05 92.04-225.09 0-133.04-92.04-225.09-92.05-92.04-225.09-92.04-133.04 0-225.09 92.04-92.04 92.05-92.04 225.09 0 133.04 92.04 225.09 92.05 92.04 225.09 92.04ZM480-480Z"/>
            </svg>
          </button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PermissionsTable',
  data() {
    return {
      searchQuery: '',
      dropdownVisible: false,
      activeTab: 'solicitudes',
      permissions: [
        { id: 1, requester: 'Carlos García', visitor: 'Elena Cruz', permissionDate: '02/03/2023', startTime: '15:30:00', endTime: '15:30:00', permissionType: 'Entrada única', resolved: true },
        { id: 2, requester: 'Carlos García', visitor: 'Elena Cruz', permissionDate: '02/03/2023', startTime: '15:30:00', endTime: '15:30:00', permissionType: 'Entrada única', resolved: false },
        // Agrega más permisos según sea necesario
      ],
    };
  },
  computed: {
    filteredPermissions() {
      return this.permissions.filter(permission => 
        permission.visitor.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    sortPermissions(order) {
      this.permissions.sort((a, b) => {
        return order === 'newest' ? new Date(b.permissionDate) - new Date(a.permissionDate) : new Date(a.permissionDate) - new Date(b.permissionDate);
      });
      this.dropdownVisible = false;
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
};
</script>

<style scoped>

.table-wrapper {
  overflow-x: auto;
}

.permissions-table-container {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
}

.tabs {
  display: flex;
  margin-bottom: 20px;
}

.tabs button {
  flex: 1;
  padding: 10px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  font-family: var(--primary-font);
  color: var(--title-color);
  border-bottom: 2px solid transparent;
}

.tabs button.active {
  border-bottom: 2px solid var(--primary-color);
  color: var(--primary-color);
  font-weight: 600;
}

.filter-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

input[type="text"] {
  width: 60%;
  padding: 10px;
  border: 1px solid #dcdcdc;
  border-radius: 5px;
}

.dropdown {
  position: relative;
}

.dropdown-button {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-family: var(--primary-font);
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.dropdown-button:hover {
  background-color: #1d3a94;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  background: white;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.dropdown-menu button {
  display: block;
  padding: 10px 20px;
  width: 100%;
  text-align: left;
  background: none;
  font-size: 14px;
  font-family: var(--primary-font);
  color: var(--title-color);
  border: none;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #E0E1E5;
}

.permissions-table {
  width: 100%;
  border-collapse: collapse;
  color: var(--title-color);
  font-family: var(--primary-font);
}

.permissions-table th,
.permissions-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.permissions-table th {
  background-color: #f9f9f9;
  font-size: 14px;
}

.permissions-table td {
  font-size: 13px;
}

.resolve-button {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  padding-right: 12px; 
}

.filter-container input{
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

.filter-container input:focus {
  outline-color: var(--primary-color);
}

@media screen and (min-width: 769px) and (max-width: 900px) {
  .filter-container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

@media screen and (max-width: 768px) {
  .filter-container {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

</style>



