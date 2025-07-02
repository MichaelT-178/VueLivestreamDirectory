<template>
  <div class="instrument-card" @click="goToInstrumentPage(instrument.cleaned)">
    <img
      :src="imageSrc"
      :alt="instrument.alias || instrument.name"
      class="instrument-image"
      loading="lazy"
      @load="handleImageLoad"
    />

    <div class="instrument-info">
      <h2>{{ instrument.nameNoKey }}</h2>
      <p><strong>Name:</strong> {{ instrument.name }}</p>
      <p><strong>Key:</strong> {{ instrument.key || 'None' }}</p>
      <p><strong>Appears:</strong> {{ instrument.appears }}</p>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';

const props = defineProps({
  instrument: Object
});

const router = useRouter();

const imageSrc = ref('');

watchEffect(() => {
  imageSrc.value = new URL(`../assets/instrument-pics/${props.instrument.cleaned}.jpg`, import.meta.url).href;
});

const goToInstrumentPage = (instrument) => {
  router.push({ name: 'InstrumentPage', params: { instrument } });
};

const handleImageLoad = (event) => {
  event.target.classList.add('loaded');
};

</script>


<style scoped>
.instrument-card {
  background-color: #1f2937;
  color: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  text-align: left;
  transition: background-color 0.2s;
}

.dark .instrument-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: #14b8a6;
  color: white;
}

.dark .instrument-card h2 {
  color: white;
}

.dark .instrument-card:hover h2 {
  color: #dfdfdf;
}

.dark .instrument-image {
  transition: none;
  opacity: 1;
}

.instrument-card:hover {
  cursor: pointer;
}

.instrument-card:hover h2 {
  text-decoration: underline;
  color: #5eead4;
}

.instrument-card h2 {
  font-size: 20px;
  margin-bottom: 0.5rem;
  color: #2DD4BF;
  text-align: left;
}

.instrument-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  opacity: 0;
  transition: opacity 0.5s ease-in;
}

.instrument-image.loaded {
  opacity: 1;
}

.instrument-info {
  margin-left: 8px;
}

</style>
