<template>
  <div class="main-permission">
    <AtentionTable></AtentionTable>
  </div>
</template>

<script>
import AtentionTable from '@/components/AtentionTable.vue';

export default {
  name: 'AtentionView',
  components:{
    AtentionTable
  }
}
</script>

<style scoped>
@import url('../styles.css');

.main-permission{
  padding: 20px;
}
</style>

