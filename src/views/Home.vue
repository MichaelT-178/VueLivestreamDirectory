<template>
  <div class="page-container">
    <div class="centered">
      <p class="title">
        <font-awesome-icon icon="guitar" />
        Corey Heuvel <span class="search-word">Search</span>
      </p>

      <div class="search-wrapper">
        <SearchBar @focus="handleFocus" />
      </div>

      <div class="cards-wrapper" v-if="!showMobileSearch">
        <HomeCard 
          v-for="(card, index) in CardData.CardData" 
          :key="index"
          :card="card" 
        />
      </div>
    </div>

    <MobileSearchView 
      v-if="showMobileSearch" 
      class="mobile-overlay" 
      @close="handleMobileSearchClose" 
    />
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from '../components/SearchBar.vue';
import HomeCard from '../components/HomeCard.vue';
import MobileSearchView from './MobileSearchVIew.vue';
import rawCardData from '../assets/Home/HomeCardData.jsonc?raw';
import { useScreenHelpers } from '../composables/useScreenHelpers.js';
import { parse } from 'jsonc-parser';

const CardData = parse(rawCardData);
const showMobileSearch = ref(false);
const { isSmallScreen } = useScreenHelpers(400);

const handleFocus = () => {
  if (isSmallScreen.value) {
    showMobileSearch.value = true;
  }
};

const handleMobileSearchClose = () => {
  window.scrollTo(0, 0);
  showMobileSearch.value = false;
};

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  position: relative;
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
  max-width: 1200px;
}

.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  background-color: #0f172a;
}

.dark .title {
  color: #94A3B8;
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
