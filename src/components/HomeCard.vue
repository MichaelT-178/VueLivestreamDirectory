<template>
  <router-link 
    :to="route" 
    class="home-card" 
    :style="{ backgroundColor: color }"
  >
    <p class="home-card-text">{{ name }}</p>
  </router-link>

  <!-- <CalculatorIcon stroke-color="green" :width="32" /> -->
  
</template>


<script setup>
import CalculatorIcon from "../assets/svg/calculator.vue";

defineProps({
  name: String,
  route: String,
  color: {
    type: String,
    default: '#2a9fd6'
  }
})

</script>


<style scoped>
.home-card {
  padding: 1rem 2rem;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
  color: white;
  font-weight: bold;
  font-size: 1rem;
  margin: 1rem;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: inline-block;
}

.home-card:hover {
  transform: scale(1.05);
}

.home-card-text {
  margin: 0;
}

</style>
