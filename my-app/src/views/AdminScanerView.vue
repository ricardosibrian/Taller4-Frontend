<template>
  <div class="main-admin-scanner">
    <div class="add-scanner">
      <h2>Agregar un nuevo escáner</h2>
      <form @submit.prevent="addScanner">
        <label for="text">ID del escaner</label>
        <input type="text" id="text" v-model="newScannerId" placeholder="Identificador" required />
        <button type="submit">Agregar escáner</button>
      </form>
    </div>
    <div class="active-scanner">
      <h2>Escáneres activos</h2>
      <div class="scanner-cards">
        <div class="scanner-card" v-for="scanner in scanners" :key="scanner.email">
          <CardScanner :src="scanner.src" :name="scanner.name" :email="scanner.email" @remove="removeScanner(scanner.email)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardScanner from '../components/CardTablet.vue';
import scannerImage from '../assets/scaner.png';

export default {
  name: 'AdminScannerView',
  components: {
    CardScanner
  },
  data() {
    return {
      newScannerId: '',
      scanners: [
        { name: 'Galaxy Tab S9 FE', src: scannerImage }
      ]
    };
  },
  methods: {
    addScanner() {
      if (this.newScannerId) {
        this.scanners.push({ name: 'Nuevo Escáner', text: this.newScannerId, src: scannerImage });
        this.newScannerId = '';
      }
    },
    removeScanner(text) {
      this.scanners = this.scanners.filter(s => s.text !== text);
    }
  }
};
</script>

<style scoped>
@import url('../styles.css');

.main-admin-scanner {
  padding: 20px;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  font-family: var(--primary-font);
  align-items: center;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: var(--title-size);
  color: var(--title-color);
}

.add-scanner {
  background-color: var(--white-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  color: var(--title-color);
  font-size: 14px;
  font-family: var(--primary-font);
  width: 75%;
  
}

.add-scanner h2 {
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
  margin-bottom: 25px;
}

.add-scanner form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-scanner label {
  margin-bottom: 5px;
  text-align: left;
  font-weight: 600;
}

.add-scanner input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus {
  outline-color: var(--primary-color);
}

.add-scanner button {
  background-color: var(--primary-color);
  font-size: 14px;
  color: white;
  font-family: var(--primary-font);
  font-weight: 600;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-scanner button:hover {
  background-color: #1d3a94;
}

.active-scanner {
  margin-top: 20px;
  max-width: 100%;
}

.active-scanner h2 {
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
  margin-bottom: 10px;
}

.scanner-cards {
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  gap: 20px;
}

.scanner-card {
  flex: 0 0 auto;
}
</style>

