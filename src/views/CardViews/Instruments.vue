<template>
  <div>
    <div class="top-bar">
      <div class="header-with-icon-wrapper">
        <HeaderWithIcon
          title="Instruments"
          icon="guitar"
          iconColor="#2DD4BF"
        />
      </div>

      <div class="filter-wrapper">
        <select v-model="selectedType" class="filter-select">
          <option value="All">All Instruments</option>
          <option v-for="type in instrumentTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
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

const instrumentTypes = [
  'Acoustic', 'Electric', 'Classical',
  'Harmonica', 'Mandolin', 'Blues Slide'
];

const selectedType = ref('All');

const filteredInstruments = computed(() => {
  if (selectedType.value === 'All') {
    return Instruments.Instruments;
  }

  return Instruments.Instruments.filter(
    instrument => instrument.type === selectedType.value
  );
});

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  padding-bottom: 0;
}

.filter-wrapper {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-right: 10px;
  background-color: #1f2937;
  margin-right: 10px;
}

.header-with-icon-wrapper {
  margin-left: 10px;
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

@media (max-width: 550px) {
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .filter-wrapper {
    margin-right: auto;
    margin-left: 10px;
  }
}


</style>
