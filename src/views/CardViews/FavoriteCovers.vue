<template>
  <div>
    <div class="content-wrapper">
      <HeaderWithIcon
        title="My Favorite Covers"
        icon="heart"
        iconColor="pink"
      />

      <div class="search-bar-container">
        <font-awesome-icon icon="search" class="search-icon" />
        <input 
          id="cover-search"
          name="cover-search"
          v-model="searchQuery" 
          type="text" 
          autocomplete="off"
          placeholder="Filter by song or artist"
          class="search-bar"
        />
      </div>
      <p v-if="filteredCovers.length === 0" class="no-results-msg">
        No results found
      </p>

      <div class="grid">
        <a
          v-for="cover in filteredCovers"
          :key="cover.id"
          :href="cover.Link"
          target="_blank"
          rel="noopener noreferrer"
          class="cover-card"
        >
          <img
            :src="getImagePath(cover)"
            class="album-img"
            :alt="cover.Song"
          />
          <div class="text-content">
            <p class="song">{{ cover.Song }} by {{ cover.Artist }}</p>
            <p class="appearance">{{ cover.Appearance }}</p>
          </div>
        </a>
      </div>

      <button
        v-if="isSmallScreen && !searchQuery"
        class="go-to-top-btn"
        @click="scrollToTop"
      >
        Go back to top
      </button>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import AllData from '../../assets/Data/FavCovers.json';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import { useScreenHelpers } from '../../composables/useScreenHelpers.js';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import AlbumLookup from '../../assets/Data/AlbumLookup.js';
import ArtistLookup from '../../assets/Data/ArtistLookup.js';

const searchQuery = ref('');

const filteredCovers = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return AllData.FavoriteCovers.filter(cover =>
    cover.Song.toLowerCase().includes(query) ||
    cover.Artist.toLowerCase().includes(query)
  );
});

const { isSmallScreen, scrollToTop } = useScreenHelpers();

const getImagePath = (song) => {
  if (!song.ArtistPic) {
    return AlbumLookup[song.AlbumImage]
  }

  return ArtistLookup[song.AlbumImage]
};


onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.content-wrapper {
  padding: 20px;
  margin: 0 auto;
}

.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 1rem 0;
  padding-bottom: 10px;
}

.search-bar {
  width: 100%;
  padding: 9px 10px 9px 37px;
  border-radius: 6px;
  background-color: #eeeded;
  border: 2px solid #eeeded;
  font-size: 16px;
  color: #111;
  box-sizing: border-box;
}

.dark .search-bar {
  background-color: white;
}

.search-bar::placeholder {
  color: #555;
}

.search-bar:focus {
  outline: none;
  box-shadow: none;
  border-color: #2275d9;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 38%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #555;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.cover-card {
  background-color: #1f2937;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  color: white;
  text-decoration: none;
  display: block;
  transition: transform 0.15s ease;
}

.cover-card:hover {
  transform: translateY(-3px);
}

.dark .cover-card {
  background-color: #cbd5e1;
  background-color: #ec4899
}

.dark .appearance {
  /* color: #cbd5e1; */
  color: #cbd5e1;
}

.dark .song {
  color: white;
}

.album-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
}

.song {
  font-size: 14px;
  font-weight: bold;
  color: #60A5FA;
}

.appearance {
  font-size: 15px;
  color: #ddd;
}

.no-results-msg {
  color: #888;
  margin-top: -17px;
  margin-bottom: 20px;
  font-size: 1.1rem;
}

@media (max-width: 400px) {
  .grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .cover-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: left;
    padding: 8px;
  }

  .album-img {
    width: 60px;
    height: 60px;
    margin: 0 10px 0 0;
    flex-shrink: 0;
  }

  .text-content {
    display: flex;
    flex-direction: column;
  }

  .text-content .song,
  .text-content .appearance {
    margin: 0;
    line-height: 1.2;
  }

  .text-content .song {
    font-size: 0.95rem;
    color: #60A5FA;
    /* color: #fdfdfd; */
  }
  
  .text-content .appearance {
    margin-top: 0.15rem;
    font-size: 0.8rem;
  }
  
  .go-to-top-btn {
    display: block;
    margin: 40px auto 50px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #f472b6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .go-to-top-btn:hover {
    background-color: #ec4899;
  }
}

</style>
