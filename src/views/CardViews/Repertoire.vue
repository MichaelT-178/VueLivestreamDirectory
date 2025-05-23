<template>
  <p class="title">Repertoire</p>
</template>


<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>



<style scoped>
.title {
  color: white;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
}
</style>