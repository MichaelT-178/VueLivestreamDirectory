<template>
  <div class="search-bar-wrapper" ref="searchWrapper">
    <div 
      class="search-bar-background"
      :class="{ 'has-dropdown': filteredResults.length > 0 && isFocused }"
    >
      <font-awesome-icon icon="search" class="search-icon" />
      
      <input 
        id="search"
        name="search"
        :class="['search-bar', { 'show-dropdown': isFocused && filteredResults.length > 0 }]"
        type="text" 
        v-model="query"
        placeholder="Search by song, artist, or instrument"
        autocomplete="off"
        @input="filterResults"
        @keyup.enter="handleEnter"
        @focus="handleFocus"
        @blur="handleBlur"
      />

      <div 
        v-if="query"
        class="clear-icon-wrapper"
        @mousedown.prevent="clearQuery"
      >
        <font-awesome-icon icon="xmark" class="clear-icon" />
      </div>
    </div>

    <ul v-if="filteredResults.length && isFocused" class="search-dropdown">
      <li 
        v-for="(item, index) in filteredResults.slice(0, 30)" 
        :key="`${item.id}-${index}`"
        class="search-item"
        @mousedown.prevent="navigateTo(item)"
      >
        <div class="image-container">
          <div
            v-if="!imageLoaded[item.id]"
            class="image-placeholder"
          ></div>

          <img
            @load="imageLoaded[item.id] = true"
            loading="lazy"
            :src="getImagePath(item)"
            :alt="item.name || item.title"
            :style="{ opacity: imageLoaded[item.id] ? 1 : 0 }"
            :class="['search-thumb', { 'artist-thumb': item.Type === 'Artist' }]"
          />
        </div>

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
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import SearchData from '../assets/Data/SearchData.json';
import AlbumLookup from '../assets/Data/AlbumLookup.js';
import ArtistLookup from '../assets/Data/ArtistLookup.js';

const imageLoaded = reactive({})

const query = ref('');
const filteredResults = ref([]);
const isFocused = ref(false);
const searchWrapper = ref(null);
const router = useRouter();

const emit = defineEmits(['focus', 'blur']);

const filterResults = () => {
  const raw = query.value.trim().toLowerCase();

  if (!raw) {
    filteredResults.value = [];
    return;
  }

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

    const byMatch = isBySearch && title === songPart && artist === artistPart;

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
};

const handleEnter = () => {
  if (filteredResults.value.length === 1) {
    navigateTo(filteredResults.value[0]);
  }
};

const getImagePath = (item) => {
  if (item.Type === 'Artist') {
    return ArtistLookup[item.cleanedName] || '';
  }

  if (item.Type === 'Song') {
    if (item.ArtistPic && item.CleanedPicture) {
      return ArtistLookup[item.CleanedPicture] || '';
    }

    if (item.CleanedPicture) {
      return AlbumLookup[item.CleanedPicture] || '';
    }
  }

  return '';
};

const navigateTo = (item) => {
  if (item.Type === 'Artist') {
    router.push(`/artist/${item.cleanedName}`);
  } else if (item.Type === 'Song') {
    router.push(`/song/${item.cleanedTitle}`);
  }
};

const handleFocus = () => {
  isFocused.value = true;

  emit('focus'); // emit focus to parent

  if (query.value.trim()) {
    filterResults();
  }
};

const handleBlur = () => {
  setTimeout(() => {
    isFocused.value = false;
    emit('blur'); // emit blur to parent
  }, 0);
};

const clearQuery = () => {
  query.value = '';
  filteredResults.value = [];
};

</script>


<style scoped>
.search-bar-wrapper {
  position: relative;
  width: 70%;
  max-width: 700px;
  margin: 0 auto;
}

.search-bar-background {
  background-color: transparent;
  padding: 0px 0.5px 0px 0.5px;
  position: relative;
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
}

.search-bar-background.has-dropdown {
  background-color: white;
}

.search-bar {
  width: 100%;
  padding: 14px 45px 14px 50px;
  border-radius: 50px;
  border: 2px solid white;
  font-size: 20px;
  box-sizing: border-box;
}

.search-bar:focus {
  outline: none;
}

.search-bar::placeholder {
  color: #707070;
}

.dark .search-bar {  
  border: 2px solid #94A3B8;
  background-color: white;
}

.dark .search-bar-background.has-dropdown {
  border: 1px solid #ccc;
  border-bottom: none;
}

.dark .search-item {
  background: white;
}

.dark .search-bar-background.has-dropdown {
  background-color: white;
}

.dark .search-item {
  border-bottom: none;
}

.dark .search-bar.show-dropdown {
  border: 2px solid white !important;
}

.search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  color: #707070;
  z-index: 10;
}

.clear-icon-wrapper {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  z-index: 10;
}

.clear-icon-wrapper:hover {
  background-color: #ebebeb;
}

.clear-icon {
  font-size: 22px;
  color: #707070;
  pointer-events: none;
}

.separator-dot {
  font-size: 12px;
}

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc; /* was #ccc */
  max-height: calc(6 * 62px + 1px);
  overflow-y: auto;
  z-index: 10;
  padding: 0;
  list-style: none;
  margin: 0;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

.search-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  height: 62px;
  box-sizing: border-box;
  cursor: pointer;
  border-bottom: 1px solid transparent; /* was #eee */
}

.search-item:hover {
  background-color: #f0f0f0;
}

.search-thumb {
  width: 47px;
  height: 47px;
  object-fit: cover;
  border-radius: 4px;
  margin-left: 5px;
}

.artist-thumb {
  border-radius: 50%;
}

.search-text {
  display: flex;
  flex-direction: column;
}

.search-title {
  font-weight: bold;
}

.dark .search-title {
  color: #60A5FA;
}

.search-type {
  font-size: 0.85em;
  color: #666;
}

.image-container {
  position: relative;
  width: 47px;
  height: 47px;
}

.image-placeholder {
  background: #ddd;
  border-radius: 4px;
  width: 100%;
  height: 100%;
  animation: pulse 1.2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0.6;
  }
}

img {
  transition: opacity 0.3s ease;
}

@media (max-width: 900px) {
  .search-bar-wrapper {
    width: 80%;
  }
}

@media (max-width: 600px) {
  .search-bar-wrapper {
    width: 90%;
  }
}

@media (max-width: 400px) {
  .search-bar-wrapper {
    width: 96%;
  }

  .search-bar {
    border-radius: 8px;
    padding: 13px 14px 13px 15px;
  }

  .search-icon {
    display: none;
  }

  .clear-icon-wrapper {
    right: 12px;
    width: 28px;
    height: 28px;
  }

  .clear-icon {
    font-size: 16px;
  }
}

</style>
