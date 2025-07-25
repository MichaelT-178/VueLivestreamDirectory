<template>
  <div class="mobile-search-view">
    <div class="search-bar-container">
      <div class="search-bar-wrapper">
        <font-awesome-icon icon="search" class="search-icon" />
        <input
          ref="searchInput"
          v-model="query"
          autocomplete="off"
          type="text"
          class="search-input"
          placeholder="Search by song or artist"
          @input="filterResults"
        />
      </div>
      <button class="cancel-button" @click="emit('close')">Cancel</button>
    </div>

    <ul v-if="filteredResults.length" class="results-list">
      <li
        v-for="(item, index) in filteredResults.slice(0, 30)"
        :key="`${item.id}-${index}`"
        class="result-item"
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
            :class="['result-thumb', { 'artist-thumb': item.Type === 'Artist' }]"
          />
        </div>

        <div class="result-text">
          <span class="result-title">{{ item.name || item.title }}</span>
          <div class="result-type">
            {{ item.Type }}<span v-if="item.Type === 'Song'"> • {{ item.artist }}</span>
          </div>
        </div>
      </li>
    </ul>
    <p
      v-else-if="query.trim() !== ''"
      class="no-results-message"
    >
      No results found
    </p>
  </div>
</template>


<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useScreenHelpers } from '../composables/useScreenHelpers.js';
import SearchData from '../assets/Data/SearchData.json';
import AlbumLookup from '../assets/Data/AlbumLookup.js';
import ArtistLookup from '../assets/Data/ArtistLookup.js';

const imageLoaded = reactive({})

const emit = defineEmits(['close']);
const { isSmallScreen } = useScreenHelpers(400);
const router = useRouter();

const query = ref('');
const filteredResults = ref([]);

const searchInput = ref(null);

watch(isSmallScreen, (value) => {
  if (!value) {
    emit('close');
  }
});

const filterResults = () => {
  const raw = query.value.trim().toLowerCase();

  if (!raw) {
    filteredResults.value = [];
    return;
  }

  let songPart = '';
  let artistPart = '';

  const isBySearch = raw.includes(" by") 
                 && !raw.includes(" drop") 
                 && !raw.includes("vain") 
                 && !raw.includes("by the river");

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

  emit('close');
};

onMounted(() => {
  searchInput.value?.focus();
});

</script>


<style scoped>
.mobile-search-view {
  height: 100%;
  width: 100%;
  background-color: #0f172a;
  color: white;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.search-bar-container {
  display: flex;
  align-items: center;
  padding: 0.75rem 0.0rem 0.75rem 0rem;
  /* background-color: #0f172a; */
  background-color: #1e293b;
  position: sticky;
  top: 0;
  z-index: 10;
  gap: 0.5rem;
}

.search-bar-wrapper {
  position: relative;
  flex-grow: 1;
  margin-left: 10px;
}

.search-input {
  width: 100%;
  padding: 8px 10px 8px 0px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
  color: black;
  text-indent: 30px;
}

.search-input:focus {
  outline: none;
}

/* .search-input::placeholder {
  padding-left: 30px;
} */

.search-icon {
  position: absolute;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #707070;
  font-size: 15px;
  pointer-events: none;
}

.cancel-button {
  flex-shrink: 0;
  padding: 6px 12px;
  font-size: 14px;
  color: #cbd5e1;
  background: transparent;
  border: none;
  cursor: pointer;
}

.cancel-button:hover {
  text-decoration: underline;
}

.results-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  /* border-bottom: 1px solid #1e293b; 
  background-color: #1e293b; */
  cursor: pointer;
}

.result-item:hover {
  background-color: #334155;
}

.result-thumb {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.artist-thumb {
  border-radius: 50%;
}

.result-text {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.result-title {
  font-weight: bold;
  color: white;
}

.result-type {
  font-size: 0.85em;
  color: #cbd5e1;
}

.dot {
  margin: 0 4px;
}

.image-container {
  position: relative;
  width: 50px;
  height: 50px;
  flex-shrink: 0;
}

.image-placeholder {
  background: #334155;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  animation: pulse 1.2s infinite;
}

.no-results-message {
  padding: 0rem 1rem;
  text-align: center;
  color: #94a3b8;
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

</style>
