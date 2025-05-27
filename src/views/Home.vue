<template>
  <div class="page-container">
    <div class="centered">
      <p class="title">
        <font-awesome-icon icon="guitar" />
        Corey Heuvel <span class="search-word">Search</span>
      </p>

      <div class="search-wrapper">
        <SearchBar />
      </div>

      <div class="cards-wrapper">
        <HomeCard 
          v-for="(card, index) in CardData.CardData" 
          :key="index"
          :card="card" 
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import SearchBar from '../components/SearchBar.vue';
import HomeCard from '../components/HomeCard.vue';
import CardData from '../assets/Home/CardData.json';

</script>


<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.centered {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
}

.title {
  font-size: 2.5rem;
  color: #cbd5e1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-word {
  color: #60A5FA;
}

.search-wrapper {
  width: 100%;
  display: flex;
  margin-top: -20px;
  justify-content: center;
}

.cards-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
  margin-bottom: 100px;
}

@media (max-width: 600px) {
  .title {
    font-size: 2rem;
  }
}

@media (max-width: 400px) {
  .title {
    margin-top: 18px;
    font-size: 1.75rem;
  }
}
</style>
