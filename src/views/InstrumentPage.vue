<template>
  <div class="page-container" v-if="instrument">
    <h1>{{ instrument.instrument }}</h1>
    <img :src="getImagePath(instrument.pic)" :alt="instrument.instrument" class="instrument-image" />
    <p><strong>Number of Appearances:</strong> {{ instrument.numOfAppearances }}</p>

    <div class="appearance" v-for="appearance in instrument.appearances" :key="appearance.id">
      <p><strong>Song Title:</strong> {{ appearance.songTitle }}</p>
      <p><strong>Artist:</strong> {{ appearance.artist }}</p>
      <p><strong>Livestream:</strong> {{ appearance.livestream }}</p>
      <p>
        <strong>Link:</strong>
        <a :href="appearance.link" target="_blank" rel="noopener noreferrer">{{ appearance.link }}</a>
      </p>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Instrument not found.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import InstrumentData from '../assets/Data/InstrumentData.json'

const props = defineProps({
  name: String
})

const instrument = computed(() => InstrumentData[props.name])

const getImagePath = (fileName) => {
  return new URL(`../assets/instrument-pics/${fileName}`, import.meta.url).href
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.page-container {
  padding: 2rem;
  font-size: 1.1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.instrument-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

.appearance {
  margin-top: 1.5rem;
  padding: 1rem;
  border-left: 4px solid #ccc;
  background-color: #f9f9f9;
}
</style>
