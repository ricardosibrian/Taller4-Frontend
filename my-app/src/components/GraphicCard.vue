<template>
  <div class="card-graph">
    <h3>Registro de cantidad de entradas</h3>
    <img src="../assets/graphic.png" class="home-img"> 
  </div>
</template>

<script>
import EditHouseModal from '../components/EditHouseModal.vue';

export default {    
  name: 'CardHome',
  components: {
    EditHouseModal
  },
  data() {
    return {
      showModal: false,
      houseData: {
        residentsAllowed: 6,
        residentInCharge: 'John Doe',
        qrValidity: '10 min'
      }
    };
  },
  methods: {
    updateHouseData(updatedData) {
      this.houseData = { ...this.houseData, ...updatedData };
    }
  }
}
</script>

<style scoped>
@import url('../styles.css');

.card-graph{
  background-color: var(--white-color);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1); 
  border-radius: 10px; 
  border: 1px solid transparent; 
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  overflow-x: auto;
}

.card-graph h3{
  color: var(--title-color);
  font-size: 18px;
  font-family: var(--primary-font);
  margin-bottom: 20px;
}

.card-graph img{
  min-width: 100%;
  height: 350px;
}



</style>
