<template>
  <div>
    <HeaderWithIcon
      title="Instruments"
      icon="guitar"
      iconColor="#2DD4BF"
    />

    <div class="instrument-list">
      <InstrumentCard
        v-for="instrument in Instruments.Instruments"
        :key="instrument.id"
        :instrument="instrument"
      />
    </div>
  </div>
</template>


<script setup>
import { onMounted } from 'vue';
import Instruments from '../../assets/Data/instruments.json';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import InstrumentCard from '../../components/InstrumentCard.vue';

const instrumentTypes = [
  'Acoustic', 'Electric', 'Classical', 
  'Harmonica', 'Mandolin', 'Blues Slide'
];

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.instrument-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 1rem;
}

</style>
