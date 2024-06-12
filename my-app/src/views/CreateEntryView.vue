<template>
  <div class="main-admin-vigilant">
    <div class="add-vigilant">
      <h2>Registrar una entrada no asociada</h2>
      <form @submit.prevent="addVigilant">
        <label for="text">¿Quién entra?</label>
        <input type="text" id="entrada" v-model="newVigilantEmail" placeholder="Camión de aseo, policía, delivery..." required />
        <label for="text">Motivo de la entrada</label>
        <input type="text" id="motivo" v-model="newVigilantEmail" placeholder="Motivo de entrada" required />
        <button type="submit">Registrar entrada</button>
      </form>
    </div>
  </div>
</template>

<script>
import CardAdmin from '../components/CardVigilante.vue';
import vigilantImage from '../assets/vigilant.png';

export default {
  name: 'CreateEntryView',
  components: {
    CardAdmin
  },
  data() {
    return {
      newVigilantEmail: '',
      vigilants: [
        { name: 'Carlos García', email: 'carlosgarcia@mail.com', src: vigilantImage },
      ]
    };
  },
  methods: {
    addVigilant() {
      if (this.newVigilantEmail) {
        this.vigilants.push({ name: 'Nuevo Vigilante', email: this.newVigilantEmail, src: vigilantImage });
        this.newVigilantEmail = '';
      }
    },
    removeVigilant(email) {
      this.vigilants = this.vigilants.filter(v => v.email !== email);
    }
  }
};
</script>

<style scoped>
@import url('../styles.css');

.main-admin-vigilant {
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

.add-vigilant {
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

.add-vigilant h2 {
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
  margin-bottom: 25px;
}

.add-vigilant form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.add-vigilant label {
  margin-bottom: 5px;
  text-align: left;
  font-weight: 600;
}

.add-vigilant input {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

input:focus {
  outline-color: var(--primary-color);
}

.add-vigilant button {
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

.add-vigilant button:hover {
  background-color: #1d3a94;
}

</style>

