<template>
  <div class="repertoire-container">
    <HeaderWithIcon
      title="Corey's Repertoire"
      icon="musicnote"
      iconColor="#FB7185"
    />

    <div v-for="(songs, category) in AllData" :key="category" class="category-section">
      <h2 class="category-title">{{ formatCategory(category) }}</h2>
      <div class="divider"></div>

      <div v-for="song in songs" :key="song.Song" class="song-card">
        <img
          :src="getImagePath(song)"
          :alt="song.Song"
          class="song-image"
          loading="lazy"
        />
        <div class="song-info">
          <p><strong>Song:</strong> {{ song.Song }}</p>
          <!-- <p><strong>Album:</strong> {{ song.AlbumTitle || 'N/A' }}</p> -->
          <p><strong>Artist:</strong> {{ song.Artist }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted } from 'vue';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import AllData from "../../assets/Data/repertoire.json";

onMounted(() => {
  window.scrollTo(0, 0);
});

const getImagePath = (song) => {
  if (song.CleanedAlbumTitle) {
    return new URL(`../../assets/AlbumPics/${song.CleanedAlbumTitle}.jpg`, import.meta.url).href;
  }

  return new URL(`../../assets/ArtistPics/${song.CleanedArtist}.jpg`, import.meta.url).href;
};

const formatCategory = (category) => {
  if (/^[A-Z]$/.test(category)) {
    return `${category} Songs`;
  }

  return category;
};

</script>


<style scoped>
.repertoire-container {
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 2rem;
}

.divider {
  height: 2px;
  background-color: #FB7185;
  margin: 0.5rem 0 1rem;
  width: 100%;
}

.song-card {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  background-color: #1f2937;
  border-radius: 10px;
  padding: 1rem;
  gap: 1rem;
}

.song-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
}

.song-info p {
  margin: 0.25rem 0;
}

</style>
