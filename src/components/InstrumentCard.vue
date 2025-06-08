<template>
  <div class="instrument-card">
    <img
      :src="imageSrc"
      :alt="instrument.alias || instrument.name"
      class="instrument-image"
      loading="lazy"
      @load="handleImageLoad"
    />

    <div class="instrument-info">
      <h2 @click="goToInstrumentPage(instrument.cleaned)" class="clickable-title">
        {{ instrument.alias || instrument.name }}
      </h2>

      <p><strong>Name:</strong> {{ instrument.name }}</p>
      <p><strong>Key:</strong> {{ instrument.key || 'None' }}</p>
      <p><strong>Appears:</strong> {{ instrument.appears }}</p>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { onMounted } from 'vue';

const props = defineProps({
  instrument: Object
});

const router = useRouter();

const imageSrc = ref('');

watchEffect(() => {
  imageSrc.value = new URL(`../assets/instrument-pics/${props.instrument.cleaned}.jpg`, import.meta.url).href;
});

const goToInstrumentPage = (name) => {
  router.push({ name: 'InstrumentPage', params: { name } });
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

.clickable-title {
  cursor: pointer;
  color: #2DD4BF;
  text-decoration: none;
  transition: color 0.2s;
}

.clickable-title:hover {
  color: #5eead4;
  text-decoration: underline;
}

</style>
