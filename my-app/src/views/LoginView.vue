<template>
  <div class="landing">
    <div class="title">
      <img src="../assets/logo.png" alt="google-icon">
      <p>Acceso sin demoras, seguridad sin preocupaciones</p>
      <button @click="scrollToBenefits">Conoce más</button>
    </div>
    <div class="card">
      <h4>Inicia sesión</h4>
      <p>Regístrate e inicia sesión con tu cuenta de Google</p>
      <router-link to="/mainView">
        <img class="google" src="../assets/google.png" alt="google-icon">
      </router-link>
    </div>
  </div>
  <div class="info" id="beneficios">
      <h4>Conoce nuestros beneficios...</h4>
      <div class="benefits">
        <div class="cards">
          <h5>Acceso mediante QR</h5>
          <img src="../assets/benefit_1.png" alt="google-icon">
          <p>Accede fácilmente escaneando un código QR único.</p>
        </div>
        <div class="cards">
          <h5>Solicitud de Permisos</h5>
          <img src="../assets/benefit_2.png" alt="google-icon">
          <p>Solicita permisos de entrada con solo unos toques.</p>
        </div>
        <div class="cards">
          <h5>Gestión Centralizada</h5>
          <img src="../assets/benefit_3.png" alt="google-icon">
          <p>Administra y monitorea todos los accesos a tu hogar desde una sola plataforma.</p>
        </div>
      </div>
    </div>
    <footer>
      QRGuard
    </footer>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    scrollToBenefits() {
      // Obtén la posición de la sección de beneficios
      const benefitsSection = document.getElementById('beneficios');
      if (benefitsSection) {
        const benefitsPosition = benefitsSection.offsetTop;

        // Realiza un desplazamiento suave hasta la posición de la sección de beneficios
        window.scrollTo({
          top: benefitsPosition,
          behavior: 'smooth'
        });
      }
    }
  }
}
</script>

<style scoped>
@import url('../styles.css');

.landing{
  background-image: url('../assets/background-img.png');
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  flex-direction: row;
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat;
  width: 100%; 
  min-height: 550px;
  align-items: center;
  padding: 60px;
  gap: 20px;
  
}

.title{
  align-items: start;
  display: flex;
  flex-direction: column;
  font-family: var(--primary-font);
  font-size: 22px;
  font-weight: bold;
  color: white;
}

.title img{
  height: 170px;
  width: 150px;
}

.title button{
  background-color: white;
  font-family: var(--primary-font);
  font-size: 17px;
  border-radius: 10px;
  padding: 15px;
  color: var(--primary-color);
  margin-top: 20px;
}

.google{
  height: 90px;
  width: 90%;
}

.google:hover{
  cursor: pointer;
}

.card{
  border-radius: 20px;
  width: 350px;
  height: 310px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card h4{
  font-family: var(--primary-font);
  font-size: 25px;
  color: var(--title-color);
}

.card p{
  font-family: var(--primary-font);
  font-size: 20px;
  color: var(--title-color);
}

.info{
  background-color: #FAFAFA;
  font-family: var(--primary-font);
  font-size: 25px;
  color: var(--title-color);
  padding-top: 90px;
  padding-bottom: 130px;
  
}

.benefits{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 30px;
  flex-wrap: wrap;
}

.cards{
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1); 
  font-size: 24px;
  color: var(--primary-color);
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
}

.cards p{
  font-size: 17px;
  color: var(--title-color);
}

.cards img{
  height: 200px;
  width: 200px;
}

footer{
  background-color: #3B3838;
  color: white;
  height: 50px;
  font-size: 15px;
  display: flex; 
  align-items: center;
  text-align: start;
  padding-left: 40px;
}

@media screen and (min-width: 769px) and (max-width: 1095px) {
  .title{
    align-items: center;
  }
}

@media screen and (max-width: 768px) {
  .title{
    align-items: center;
  }
}
</style>