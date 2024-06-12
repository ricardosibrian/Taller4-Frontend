<template>
  <div class="entries-table-container">
    <h3>Historial de entradas a mi hogar</h3>
    <div class="filter-container">
      <input type="text" placeholder="Buscar por nombre de visitante" v-model="searchQuery" />
      <div class="dropdown">
        <button @click="toggleDropdown" class="dropdown-button">
          Filtrar por fecha de entrada
        </button>
        <div v-if="dropdownVisible" class="dropdown-menu">
          <button @click="sortEntries('oldest')">Más antigua</button>
          <button @click="sortEntries('newest')">Más reciente</button>
        </div>
      </div>
    </div>
    <div class="table-wrapper">
      <table class="entries-table">
      <thead>
        <tr>
          <th>Fecha/Hora de entrada</th>
          <th>Visitante</th>
          <th>Correo electrónico</th>
          <th>Tipo de entrada</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in filteredEntries" :key="entry.id">
          <td>{{ entry.date }}</td>
          <td>{{ entry.visitor }}</td>
          <td>{{ entry.email }}</td>
          <td>{{ entry.entryType }}</td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EntriesTable',
  data() {
    return {
      searchQuery: '',
      dropdownVisible: false,
      entries: [
        { id: 1, date: '02/03/2023 16:17:02', visitor: 'Carlos García', email: 'john.doe@gmail.com', entryType: 'Entrada única' },
        { id: 2, date: '02/03/2023 07:57:43', visitor: 'Mario Valencia', email: 'ricardo.lopez@gmail.com', entryType: 'Entrada múltiple' },
        { id: 3, date: '02/03/2023 15:02:20', visitor: 'Dennis Villalta', email: 'dennis.villalta@gmail.com', entryType: 'Entrada única' },
        { id: 4, date: '02/03/2023 19:32:17', visitor: 'Carlos García', email: 'john.doe@gmail.com', entryType: 'Entrada única' },
        { id: 5, date: '03/03/2023 09:15:30', visitor: 'Ana Rodríguez', email: 'ana.rodriguez@gmail.com', entryType: 'Entrada múltiple' },
      ],
    };
  },
  computed: {
    filteredEntries() {
      return this.entries.filter(entry => 
        entry.visitor.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    sortEntries(order) {
      this.entries.sort((a, b) => {
        return order === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      });
      this.dropdownVisible = false;
    }
  }
};
</script>

<style scoped>
@import url('../styles.css');

.table-wrapper {
  overflow-x: auto;
}

.entries-table-container {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
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

.filter-container input{
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  border-color: var(--title-color);
}

.filter-container input:focus {
  outline-color: var(--primary-color);
}

.dropdown {
  position: relative;
}

.dropdown-button {
  background-color: var(--primary-color);
  color: white;
  font-size: 14px;
  font-family: var(--primary-font);
  padding: 10px 20px;
  font-weight: 600;
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
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-family: var(--primary-font);
  color: var(--title-color);
}

.dropdown-menu button:hover {
  background-color: #f0f0f0;
}

.entries-table {
  width: 100%;
  border-collapse: collapse;
  color: var(--title-color);
  font-family: var(--primary-font);
}

.entries-table th,
.entries-table td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.entries-table th {
  background-color: #f9f9f9;
  font-size: 14px;
}

.entries-table td {
  font-size: 13px;
}

.entries-table-container h3{
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
  margin-bottom: 20px;
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
