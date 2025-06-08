<template>
  <div class="lesson-card">
    <img
      :src="imageSrc"
      :alt="lesson.title"
      class="thumbnail-image"
    />

    <div class="lesson-info">
      <h2 class="song-title">{{ lesson.title }}</h2>
      <p><strong>Artist:</strong> {{ lesson.artist }}</p>
      <p><strong>Tuning:</strong> {{ lesson.tuning }}</p>
      <p><strong>Date:</strong> {{ lesson.date }}</p>
    </div>

    <a 
      :href="lesson.link" 
      class="youtube-button" 
      target="_blank" 
      rel="noopener noreferrer"
    >
      Watch on YouTube
    </a>
  </div>
</template>


<script setup>
import { ref, watchEffect } from 'vue';

const props = defineProps({
  lesson: Object
});

const imageSrc = ref('');

watchEffect(() => {
  imageSrc.value = new URL(`../assets/lesson-thumbnails/${props.lesson.thumbnail}`, import.meta.url).href;
});

</script>


<style scoped>
.lesson-card {
  background-color: #1f2937;
  color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: 425px;
  padding: 0;
}

.thumbnail-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

.lesson-info {
  padding: 0.25rem 1rem 0.5rem 1rem;
  flex-grow: 1;
  /* padding-bottom: 3rem; */
}

.song-title {
  cursor: pointer;
  color: #C084FC;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 20px;
  margin-bottom: 0.5rem;
}

.youtube-button {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background-color: #e5e7eb;
  color: #1f2937;
  border: 2px solid #C084FC;
  border-radius: 9999px;
  padding: 0.4rem 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.youtube-button:hover {
  background-color: #C084FC;
  color: white;
}

</style>
