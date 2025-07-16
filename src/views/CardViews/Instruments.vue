<template>
  <div>
    <div class="content-container">
      <HeaderWithIcon
        title="Instruments"
        icon="guitar"
        iconColor="teal"
      />

      <div class="middle-bar">
        <div class="search-bar-container">
          <font-awesome-icon icon="search" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            autocomplete="off"
            placeholder="Search by name or type"
            class="search-bar"
          />
        </div>
        
        <div class="filter-wrapper">
          <select v-model="selectedType" class="filter-select">
            <option value="All">All Instruments</option>
            <option
              v-for="type in instrumentTypes"
              :key="type"
              :value="type"
            >
              {{ type }}
            </option>
          </select>
        </div>
      </div>
      <p v-if="filteredInstruments.length === 0" class="no-results-msg">
        No results found
      </p>
    </div>

    <div class="instrument-list">
      <InstrumentCard
        v-for="instrument in filteredInstruments"
        :key="instrument.id"
        :instrument="instrument"
      />
    </div>
    <button
      v-if="isSmallScreen && !searchQuery"
      class="go-to-top-btn"
      @click="scrollToTop"
    >
      Go back to top
    </button>

  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import Instruments from '../../assets/Data/instruments.json';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import InstrumentCard from '../../components/InstrumentCard.vue';
import { useScreenHelpers } from '../../composables/useScreenHelpers.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const instrumentTypes = [
  'Acoustic', 'Electric', 'Classical',
  'Harmonica', 'Mandolin', 'Blues Slide'
];

const selectedType = ref('All');
const searchQuery = ref('');

const { isSmallScreen, scrollToTop } = useScreenHelpers();

const filteredInstruments = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return Instruments.Instruments.filter(instrument => {
    const matchesType =
      selectedType.value === 'All' ||
      instrument.type === selectedType.value;

    const matchesSearch =
      instrument.name?.toLowerCase().includes(query) ||
      instrument.nameNoKey?.toLowerCase().includes(query) ||
      instrument.type?.toLowerCase().includes(query);

    return matchesType && matchesSearch;
  });
});

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.content-container {
  padding: 0 1rem;
}

.middle-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-bar-container {
  position: relative;
  flex: 1;
  max-width: 400px;
}

.search-bar {
  width: 100%;
  padding: 9px 10px 9px 37px;
  border-radius: 6px;
  background-color: #eeeded;
  border: 2px solid #eeeded;
  font-size: 16px;
  color: #111;
  box-sizing: border-box;
}

.dark .search-bar {
  background-color: white;
}

.search-bar::placeholder {
  color: #555;
}

.search-bar:focus {
  outline: none;
  border-color: #2275d9;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #555;
}

.filter-wrapper {
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #1f2937;
  padding-right: 10px;
}

.dark .filter-wrapper {
  background-color: #ea580c;
}

.dark .filter-select {
  background-color: #ea580c;
}

.filter-select {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #1f2937;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
}

.instrument-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

.no-results-msg {
  color: #888;
  margin-top: 8px;
  margin-bottom: 20px;
}

@media (max-width: 400px) {
  .go-to-top-btn {
    display: block;
    margin: 40px auto 50px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #14b8a6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .go-to-top-btn:hover {
    background-color: #0f766e;
  }
  
  .filter-wrapper {
    display: none;
  }
}

</style>
