<template>
  <div class="instrument-page-container" v-if="instrument">
    <HeaderWithIcon
      :title="instrument.instrument"
      icon="musicnote"
      iconColor="fuchsia"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />

    <p 
      v-if="isSmallScreen"
      class="mobile-instrument-title"
    >{{ instrument.instrument }}</p>

    <img
      :src="getImagePath(instrument.pic)"
      :alt="instrument.instrument"
      class="instrument-main-image"
    />

    <p class="appearance-count">
      <strong>Number of Appearances:</strong> {{ instrument.numOfAppearances }}
    </p>

    <div class="search-bar-container" v-if="instrument.numOfAppearances >= 25">
      <font-awesome-icon icon="search" class="search-icon" />
      <input
        v-model="searchQuery"
        type="text"
        class="search-bar"
        autocomplete="off"
        placeholder="Filter by song or artist"
      />
    </div>

    <p 
      v-if="instrument.numOfAppearances >= 25 && filteredAppearances.length === 0" 
      class="no-results-msg"
    >
      No results found
    </p>

    <div
      v-for="appearance in filteredAppearances"
      :key="appearance.id"
      class="appearance-card"
    >
      <a
        :href="appearance.link"
        target="_blank"
        rel="noopener noreferrer"
        class="appearance-link"
      >
        <img
          :src="getSongImagePath(appearance)"
          :alt="appearance.songTitle"
          class="appearance-image"
        />
        <div class="appearance-info">
          <p><strong>{{ appearance.songTitle }}</strong></p>
          <p>{{ appearance.artist }}</p>
          <p>{{ appearance.livestream }}</p>
        </div>
      </a>
    </div>

    <div v-if="canLoadMore && !searchQuery" class="load-more-container">
      <button @click="loadMore" class="load-more-button">
        Load More
      </button>
    </div>
    <button
      v-if="
        instrument.numOfAppearances >= 25 &&
        isSmallScreen &&
        !searchQuery &&
        filteredAppearances.length >= instrument.appearances.length
      "
      class="go-to-top-btn"
      @click="scrollToTop"
    >
      Go back to top
    </button>
  </div>

  <div class="instrument-page-container" v-else>
    <p>Instrument not found.</p>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import InstrumentData from '../assets/Data/InstrumentData.json';
import HeaderWithIcon from '../components/HeaderWithIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useScreenHelpers } from '../composables/useScreenHelpers.js';

const { isSmallScreen, scrollToTop } = useScreenHelpers();

const props = defineProps({
  instrument: String,
  song: {
    type: String,
    required: false,
  },
});

const instrument = computed(() => InstrumentData[props.instrument]);
const searchQuery = ref('');
const appearancesToShow = ref(100);

const filteredAppearances = computed(() => {
  const query = searchQuery.value.toLowerCase();
  const baseList = instrument.value?.appearances ?? [];

  const filtered = baseList.filter(app =>
    app.songTitle.toLowerCase().includes(query) ||
    app.artist.toLowerCase().includes(query)
  );

  return filtered.slice(0, appearancesToShow.value);
});

const canLoadMore = computed(() => {
  return (
    instrument.value &&
    filteredAppearances.value.length < instrument.value.appearances.length
  );
});

const loadMore = () => {
  appearancesToShow.value += 100;
};

const headerConfig = computed(() => {
  if (props.song) {
    return {
      leadingIcon: 'audiolines',
      leadingIconColor: 'orange',
      leadingIconRoute: `/song/${props.song}`,
    };
  }

  return {
    leadingIcon: 'guitar',
    leadingIconColor: 'teal',
    leadingIconRoute: '/instruments',
  };
});

const getImagePath = (fileName) => {
  return new URL(`../assets/instrument-pics/${fileName}`, import.meta.url).href;
};

const getSongImagePath = (appearance) => {
  if (appearance.cleanedAlbum) {
    return new URL(`../assets/AlbumPics/${appearance.cleanedAlbum}.jpg`, import.meta.url).href;
  }

  return new URL(`../assets/ArtistPics/${appearance.cleanedArtist}.jpg`, import.meta.url).href;
};

onMounted(() => {
  window.scrollTo(0, 0);
});

</script>


<style scoped>
.instrument-page-container {
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.instrument-main-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 12px;
}

.appearance-count {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.search-bar-container {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-bottom: 2rem;
}

.search-bar {
  width: 100%;
  padding: 9px 10px 9px 37px;
  border-radius: 6px;
  background-color: #eeeded;
  border: 2px solid #eeeded;
  font-size: 16px;
  color: #111;
}

.dark .search-bar {
  background-color: white;
}

.search-bar::placeholder {
  color: #555;
}

.search-bar:focus {
  outline: none;
  border-color: #2275d9;
}

.dark .appearance-count {
  color: #14b8a6;
}

.dark .appearance-card {
  background-color: #c026d3;
  color: white;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #555;
}

.appearance-card {
  margin-bottom: 1.5rem;
  background-color: #1f2937;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.appearance-card:hover {
  transform: scale(1.01);
}

.appearance-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
  gap: 1rem;
}

.appearance-image {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.appearance-info p {
  margin: 0.25rem 0;
}

.load-more-container {
  text-align: center;
  margin-top: 2rem;
}

.load-more-button {
  background-color: lightgray;
  color: black;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: 2px solid #e879f9;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.load-more-button:hover {
  background-color: #e879f9;
  color: white;
}

.no-results-msg {
  color: #888;
  margin-top: -17px;
  margin-bottom: 20px;
}

@media (max-width: 500px) {
  .search-bar-container {
    width: 100%;
    box-sizing: border-box;
    margin-top: -0.5rem;
    margin-bottom: 1.5rem;
  }

  .appearance-count {
    margin-top: 0rem;
  }

  .search-bar {
    width: 100%;
    box-sizing: border-box;
  }

  .appearance-card {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0rem;
  }

  .appearance-link {
    padding: 0.7rem 1rem;
  }
}

@media (max-width: 400px) {
  .mobile-instrument-title {
    color: #e3e3e3;
    margin-top: -1rem;
    font-size: 16px;
    font-weight: bold;
  }

  .appearance-count {
    color: #e3e3e3;
  }
  
  .go-to-top-btn {
    display: block;
    margin: 40px auto 50px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #e879f9;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .go-to-top-btn:hover {
    background-color: #d14ee4;
  }
}

</style>
