<template>
  <div>
    <HeaderWithIcon
      title="Instruments"
      icon="guitar"
      iconColor="#2DD4BF"
    />

    <div class="instrument-list">
      <div 
        v-for="instrument in Instruments.Instruments" 
        :key="instrument.id" 
        class="instrument-card"
      >
        <img
          :src="getImagePath(instrument.cleaned)"
          :alt="instrument.alias || instrument.name"
          class="instrument-image"
          loading="lazy"
          @load="handleImageLoad"
        />
        <h2 @click="goToInstrumentPage(instrument.cleaned)" class="clickable-title">
          {{ instrument.alias || instrument.name }}
        </h2>

        <p><strong>Name:</strong> {{ instrument.name }}</p>
        <p><strong>Key:</strong> {{ instrument.key || '—' }}</p>
        <p><strong>Appears:</strong> {{ instrument.appears }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from 'vue';
import Instruments from "../../assets/Data/instruments.json";
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const getImagePath = (imageName) => {
  return new URL(`../../assets/instrument-pics/${imageName}.jpg`, import.meta.url).href;
};

const handleImageLoad = (event) => {
  event.target.classList.add('loaded');
};

const goToInstrumentPage = (name) => {
  router.push({ name: 'InstrumentPage', params: { name } });
};

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

.instrument-card {
  background-color: #1f2937;
  color: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  text-align: center;
}

.instrument-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  opacity: 0;
  transition: opacity 0.5s ease-in;
}

.instrument-image.loaded {
  opacity: 1;
}

.instrument-card h2 {
  font-size: 20px;
  margin-bottom: 0.5rem;
  color: #2DD4BF;
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
