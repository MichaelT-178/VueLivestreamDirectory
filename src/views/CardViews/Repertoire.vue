<template>
  <div class="repertoire-container">
    <HeaderWithIcon
      title="Corey's Repertoire"
      icon="musicnote"
      iconColor="rose"
    />

    <div class="search-bar-container">
      <font-awesome-icon icon="search" class="search-icon" />
      <input 
        id="tutorial-search"
        name="tutorial-search"
        v-model="searchQuery" 
        type="text"
        autocomplete="off"
        placeholder="Filter by song or artist"
        class="search-bar"
      />
    </div>

    <p 
      v-if="Object.keys(filteredData).length === 0" 
      class="no-results-msg"
    >
      No results found
    </p>

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

    <!-- <div v-if="displayedCount < totalSongsCount" class="loading-more">
      Loading more songs...
    </div> -->

    <button
      v-if="isSmallScreen && !searchQuery"
      class="go-to-top-btn"
      @click="scrollToTop"
    >
      Go back to top
    </button>
  </div>
</template>


<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import AllData from '../../assets/Data/repertoire.json';
import { useScreenHelpers } from '../../composables/useScreenHelpers.js';

const searchQuery = ref('');
const displayedCount = ref(20);

const router = useRouter();
const { isSmallScreen, scrollToTop } = useScreenHelpers();

const totalSongsCount = Object.values(AllData).flat().length;

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
  const result = {};
  let count = 0;

  for (const [category, songs] of Object.entries(AllData)) {
    const filteredSongs = songs.filter(song =>
      song.Song.toLowerCase().includes(query) ||
      song.Artist.toLowerCase().includes(query) ||
      song.Category.toLowerCase().includes(query)
    );

    if (filteredSongs.length > 0) {
      const remaining = displayedCount.value - count;

      if (remaining <= 0) {
        break;
      }

      result[category] = filteredSongs.slice(0, remaining);
      count += result[category].length;
    }
  }

  return result;
});

const loadMoreSongs = () => {
  displayedCount.value += 20;
};

const handleScroll = () => {
  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  if (nearBottom && displayedCount.value < totalSongsCount) {
    loadMoreSongs();
  }
};

onMounted(() => {
  window.scrollTo(0, 0);
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
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

.dark .category-title {
  color: #94A3B8;
}

.dark .song-card {
  background-color: #f43f5e;
  color: white;
}

.dark .song-card:hover {
  background-color: #be123c;
}

.dark .divider {
  background-color: #0284c7;
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

.loading-more {
  text-align: center;
  color: #ccc;
  margin: 2rem 0;
  font-style: italic;
}

.no-results-msg {
  color: #888;
  margin-top: -7px;
  margin-bottom: 20px;
}

@media (max-width: 400px) {
  .go-to-top-btn {
    display: block;
    margin: 40px auto 50px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #fb7185;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .go-to-top-btn:hover {
    background-color: #f43f5e;
  }
}

</style>
