<template>
  <div>
    <div class="content-container">
      <HeaderWithIcon
        title="Instruments"
        icon="guitar"
        iconColor="#2DD4BF"
      />

      <div class="middle-bar">
        <div class="search-bar-container">
          <font-awesome-icon icon="search" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
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
    </div>

    <div class="instrument-list">
      <InstrumentCard
        v-for="instrument in filteredInstruments"
        :key="instrument.id"
        :instrument="instrument"
      />
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import Instruments from '../../assets/Data/instruments.json';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import InstrumentCard from '../../components/InstrumentCard.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const instrumentTypes = [
  'Acoustic', 'Electric', 'Classical',
  'Harmonica', 'Mandolin', 'Blues Slide'
];

const selectedType = ref('All');
const searchQuery = ref('');

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

@media (max-width: 400px) {
  .filter-wrapper {
    display: none;
  }
}

</style>
