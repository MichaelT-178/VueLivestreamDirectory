<template>
  <div class="repertoire-container">
    <HeaderWithIcon
      title="Corey's Repertoire"
      icon="musicnote"
      iconColor="#FB7185"
    />

    <div class="search-bar-container">
      <font-awesome-icon icon="search" class="search-icon" />
      <input 
        id="tutorial-search"
        name="tutorial-search"
        v-model="searchQuery" 
        type="text" 
        placeholder="Filter by song or artist"
        class="search-bar"
      />
    </div>

    <div v-for="(songs, category) in filteredData" :key="category" class="category-section">
      <h2 class="category-title">{{ formatCategory(category) }}</h2>
      <div class="divider"></div>

      <div 
        v-for="song in songs" 
        :key="`${song.Song}-${song.Artist}`"
        class="song-card"
        @click="goToSongPage(song.CleanedSong)"
        style="cursor: pointer;"
      >
        <img
          :src="getImagePath(song)"
          :alt="song.Song"
          class="song-image"
        />
        <div class="song-info">
          <p><strong>{{ song.Song }}</strong></p>
          <p>{{ song.Artist }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, ref, onMounted } from 'vue';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import AllData from "../../assets/Data/repertoire.json";
import { useRouter } from 'vue-router';

const searchQuery = ref('');

const router = useRouter();

const getImagePath = (song) => {
  if (song.CleanedAlbumTitle) {
    return new URL(`../../assets/AlbumPics/${song.CleanedAlbumTitle}.jpg`, import.meta.url).href;
  }

  return new URL(`../../assets/ArtistPics/${song.CleanedArtist}.jpg`, import.meta.url).href;
};

const formatCategory = (category) => {
  return /^[A-Z]$/.test(category) ? `${category} Songs` : category;
};

const goToSongPage = (cleanedTitle) => {
  router.push({ name: 'SongPageFromRepertoire', params: { song: cleanedTitle } });
};

const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();

  if (!query) {
    return AllData;
  }

  const result = {};

  for (const [category, songs] of Object.entries(AllData)) {

    const filteredSongs = songs.filter(song =>
      song.Song.toLowerCase().includes(query) ||
      song.Artist.toLowerCase().includes(query)
    );

    if (filteredSongs.length > 0) {
      result[category] = filteredSongs;
    }
  }

  return result;
});

onMounted(() => {
  window.scrollTo(0, 0);
});

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

.search-bar-container {
  position: relative;
  max-width: 400px;
  width: 100%;
  margin: 1rem 0;
}

.search-icon {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  color: #888;
  font-size: 16px;
}

.search-bar {
  width: 100%;
  padding: 10px 10px 10px 36px;
  border-radius: 6px;
  background-color: #eeeded;
  border: 2px solid #eeeded;
  font-size: 16px;
  color: #111;
  box-sizing: border-box;
}

.search-bar:focus {
  outline: none;
  box-shadow: none;
  border-color: #2275d9;
}

</style>
