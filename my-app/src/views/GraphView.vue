<template>
  <div class="main-graph">
    <GraphicCard></GraphicCard>
  </div>
</template>

<script>
import GraphicCard from '../components/GraphicCard.vue';

export default {
  name: 'GraphView',
  components:{
    GraphicCard
  }
}
</script>

<style scoped>
@import url('../styles.css');

.main-graph {
  padding: 20px;
}

</style>