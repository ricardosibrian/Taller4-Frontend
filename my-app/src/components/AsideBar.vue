<template>
<aside class="sidebar">
  <div class="main-info">
    <div class="links">
      <router-link to="/mainView">
      <div class="item-container qr-icon" :class="{ 'active-hover': $route.path === '/mainView' || $route.path === '/mainView/'}" >
        <p class="item-link">Citas</p>
      </div>
      </router-link>
      <router-link to="/mainView/requestAppointmentView">
      <div class="item-container home-icon" :class="{ 'active-hover': $route.path === '/mainView/requestAppointmentView' }">
        <p class="item-link">Solicitudes</p>
      </div>
      </router-link>
      <router-link to="/mainView/atentionView">
      <div class="item-container entry-icon" :class="{ 'active-hover': $route.path === '/mainView/atentionView' }">
        <p class="item-link">Atención</p>
      </div>
      </router-link>
      <router-link to="/mainView/recordView">
      <div class="item-container permission-icon" :class="{ 'active-hover': $route.path === '/mainView/recordView' }">
        <p class="item-link">Historial</p>
      </div>
      </router-link>
      <router-link to="/mainView/postRecordView">
      <div class="item-container graph-icon" :class="{ 'active-hover': $route.path === '/mainView/postRecordView' }">
        <p class="item-link" to="/about">Nuevo historial</p>
      </div>
      </router-link>
      <router-link to="/mainView/adminView">
        <div class="item-container admin-icon" :class="{ 'active-hover': $route.path === '/mainView/adminView' || $route.path === '/mainView/adminHouseView' || $route.path === '/mainView/adminScanerView' || $route.path === '/mainView/adminVigilantView' || $route.path === '/mainView/adminHouseDetailView' }">
        <p class="item-link" >Administrar</p>
      </div>
      </router-link>
    </div>
  </div>
  <router-link to="/">
     <svg class="exit" xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFF"><path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z"/>
    </svg>
  </router-link>
</aside>
</template>

<script>
export default {
  name: 'AsideBar',
  

  
};
</script>

<style scoped>
@import url('../styles.css');
.sidebar {
  position: fixed;
  left: 0;
  top: 0; 
  bottom: 0; 
  background-color: var(--primary-color); 
  width: 16%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom:20px;
}

.logo{
  margin-top: 20px;
  width: 70px;
  height: 80px;
  margin-left: auto;
  margin-right: auto;
}

.links {
  display: flex;
  width: 83%;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
  gap: 10px;
}

.item-container{
  padding: 8px 25px 8px 25px;
  gap: 10px;
  width: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.item-container .item-link{
  color: var(--white-color);
  font-family: var(--primary-font);
  font-size: var(--menu-items-size);
  font-weight: 300;
}

.icons{
  width: 25px;
  height: 25px; 
}

.exit{
  width: 35px;
  height: 35px; 
}

.item-link {
  text-decoration: none;
}

.item-container:hover, .item-container.active-hover {
  background-color: var(--white-color);
  border-radius: 5px;
  cursor: pointer;
}

.item-container:hover .item-link, .item-container.active-hover .item-link {
  color: var(--primary-color); 
  font-weight: bold;
}

.item-container:hover .icons path, .item-container.active-hover .icons path {
  fill: var(--primary-color);
}

@media screen and (min-width: 769px) and (max-width: 1200px) {
  .item-link {
    display: none;
    
  }

  .item-container{
    justify-content: center;
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
