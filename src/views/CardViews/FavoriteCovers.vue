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
          placeholder="Filter by song or artist"
          class="search-bar"
        />
      </div>

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
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import AllData from '../../assets/Data/FavCovers.json';
import HeaderWithIcon from '../../components/HeaderWithIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const searchQuery = ref('');

const filteredCovers = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return AllData.FavoriteCovers.filter(cover =>
    cover.Song.toLowerCase().includes(query) ||
    cover.Artist.toLowerCase().includes(query)
  );
});


const getImagePath = (song) => {
  if (!song.ArtistPic) {
    return new URL(`../../assets/AlbumPics/${song.AlbumImage}.jpg`, import.meta.url).href;
  }

  return new URL(`../../assets/ArtistPics/${song.AlbumImage}.jpg`, import.meta.url).href;
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
  font-size: 12px;
  color: #ddd;
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
    width: 65px;
    height: 65px;
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
}

</style>
