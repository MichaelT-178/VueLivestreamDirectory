<template>
  <div class="search-bar-container">
    <font-awesome-icon icon="search" class="search-icon" />
    <input 
      id="search"
      name="search"
      class="search-bar"
      type="text" 
      v-model="query"
      placeholder="Search by song, artist, or instrument"
      @input="filterResults"
      @keyup.enter="handleEnter"
    />

    <ul v-if="filteredResults.length" class="search-dropdown">
      <li 
        v-for="(item) in filteredResults" 
        :key="item.id"
        class="search-item"
        @click="navigateTo(item)"
      >
        <img 
          :src="getImagePath(item)" 
          :alt="item.name || item.title" 
          class="search-thumb"
        />
        <div class="search-text">
          <span class="search-title">{{ item.name || item.title }}</span>
          <div class="search-type">
            {{ item.Type }}
            <span v-if="item.Type === 'Song'">
              <span class="separator-dot">•</span> {{ item.artist }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import SearchData from '../assets/Data/SearchData.json';

const query = ref('');
const filteredResults = ref([]);
const router = useRouter();

const filterResults = () => {
  const raw = query.value.trim().toLowerCase();

  if (!raw) {
    filteredResults.value = [];
    return;
  }

  // Detect "Song by Artist" format
  let songPart = '';
  let artistPart = '';

  const isBySearch = raw.includes(" by") && !raw.includes(" drop") && 
                     !raw.includes("vain") && !raw.includes("by the river");

  if (isBySearch) {
    const parts = raw.split(" by ");

    songPart = parts[0].trim();
    artistPart = parts[1].trim();
  }


  filteredResults.value = SearchData.SearchData.filter(item => {
    const title = (item.name || item.title || '').toLowerCase();
    const artist = (item.artist || '').toLowerCase();
    const otherArtists = (item.otherArtists || item.other_artists || '').toLowerCase();
    const instruments = (item.instruments || '').toLowerCase();
    const album = (item.album || '').toLowerCase();
    const cleanedAlbum = (item.cleanedAlbum || '').toLowerCase();
    const searchField = (item.search || '').toLowerCase();

    const byMatch = isBySearch &&
      title === songPart && artist === artistPart;

    return (
      title.includes(raw) ||
      artist.includes(raw) ||
      otherArtists.includes(raw) ||
      instruments.includes(raw) ||
      album.includes(raw) ||
      cleanedAlbum.includes(raw) ||
      searchField.includes(raw) ||
      byMatch
    );
  });
}

const handleEnter = () => {
  if (filteredResults.value.length === 1) {
    navigateTo(filteredResults.value[0]);
  }
}

const getImagePath = (item) => {
  try {
    if (item.Type === 'Artist') {
      return new URL(`../assets/ArtistPics/${item.cleanedName}.jpg`, import.meta.url).href;
    } else if (item.Type === 'Song' && item.CleanedPicture) {
      const baseFolder = item.ArtistPic ? 'ArtistPics' : 'AlbumPics';
      return new URL(`../assets/${baseFolder}/${item.CleanedPicture}.jpg`, import.meta.url).href;
    }
  } catch (e) {
    return ''
  }

  return ''
}

const navigateTo = (item) => {
  if (item.Type === 'Artist') {
    router.push(`/artist/${item.cleanedName}`)
  } else if (item.Type === 'Song') {
    router.push(`/song/${item.cleanedTitle}`)
  }
}

</script>


<style scoped>
.search-bar-container {
  position: relative;
  width: 70%;
  max-width: 700px;
  margin: 0 auto;
}

.search-bar {
  width: 100%;
  padding: 14px 14px 14px 60px;
  border-radius: 50px;
  border: 2px solid #444;
  font-size: 20px;
  box-sizing: border-box;
}

.search-bar::placeholder {
  color: #707070;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  color: #707070;
}

.separator-dot {
  font-size: 12px;
}

.search-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 8px;
  z-index: 10;
  padding: 0;
  list-style: none;
  margin: 8px 0 0 0;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.search-item:hover {
  background-color: #f0f0f0;
}

.search-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.search-text {
  display: flex;
  flex-direction: column;
}

.search-title {
  font-weight: bold;
}

.search-type {
  font-size: 0.85em;
  color: #666;
}

@media (max-width: 900px) {
  .search-bar-container {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .search-bar-container {
    width: 90%;
  }
}

@media (max-width: 500px) {
  .search-bar {
    font-size: 18px;
  }

  .search-icon {
    font-size: 20px;
  }
}

@media (max-width: 400px) {
  .search-bar-container {
    width: 96%;
  }

  .search-bar {
    border-radius: 8px;
    padding: 13px 14px 13px 15px;
  }

  .search-icon {
    display: none;
  }
}
</style>


<style scoped>
.search-bar-container {
  position: relative;
  width: 70%;
  max-width: 700px;
  margin: 0 auto;
}

.search-bar {
  width: 100%;
  padding: 14px 14px 14px 60px;
  border-radius: 50px;
  border: 2px solid #444;
  font-size: 20px;
  box-sizing: border-box;
}

.search-bar::placeholder {
  color: #707070;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  color: #707070;
}

.search-dropdown {
  position: absolute;
  top: 110%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  max-height: 300px;
  overflow-y: auto;
  border-radius: 8px;
  z-index: 10;
  padding: 0;
  list-style: none;
  margin: 8px 0 0 0;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.search-item:hover {
  background-color: #f0f0f0;
}

.search-thumb {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}

.search-text {
  display: flex;
  flex-direction: column;
}

.search-title {
  font-weight: bold;
}

.search-type {
  font-size: 0.85em;
  color: #666;
}

@media (max-width: 900px) {
  .search-bar-container {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .search-bar-container {
    width: 90%;
  }
}

@media (max-width: 500px) {
  .search-bar {
    font-size: 18px;
  }

  .search-icon {
    font-size: 20px;
  }
}

@media (max-width: 400px) {
  .search-bar-container {
    width: 96%;
  }

  .search-bar {
    border-radius: 8px;
    padding: 13px 14px 13px 15px;
  }

  .search-icon {
    display: none;
  }
}
</style>
