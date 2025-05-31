<template>
  <p class="title">Repertoire</p>
  <HeaderWithIcon
    title="Repertoire"
    icon="musicnote"
    iconColor="#FB7185"
  />
</template>


<script setup>
import { onMounted } from 'vue';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';

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