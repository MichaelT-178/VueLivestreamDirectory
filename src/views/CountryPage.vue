<template>
  <div class="country-page-container" v-if="country">
    <HeaderWithIcon
      :title="country.name"
      icon="mappin"
      iconColor="blue"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />

    <p class="artist-count">
      <strong>Number of Artists:</strong> {{ country.numOfArtists }}
    </p>

    <div
      v-for="artist in visibleArtists"
      :key="artist.CleanedArtist"
      class="artist-card"
    >
      <router-link
        :to="`/country/${country.name}/artist/${artist.CleanedArtist}`"
        class="artist-link"
      >
        <div class="artist-info">
          <p><strong>{{ artist.Artist }}</strong></p>
          <p>{{ artist.Genre }}</p>
          <p>{{ artist.Location }}</p>
          <p>Formed: {{ artist.YearFormed }}</p>
        </div>
      </router-link>
    </div>

    <div v-if="canLoadMore" class="load-more-container">
      <button @click="loadMore" class="load-more-button">Load More</button>
    </div>
  </div>

  <div v-else class="country-page-container">
    <p>Country not found.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import CountryData from '../assets/Data/countries.json';
import HeaderWithIcon from '../components/HeaderWithIcon.vue';

const props = defineProps({
  country: String,
  artist: {
    type: String,
    required: false,
  },
});

const country = computed(() => CountryData[props.country]);
const artistsToShow = ref(100);

const visibleArtists = computed(() => {
  return country.value?.artists.slice(0, artistsToShow.value) || [];
});

const canLoadMore = computed(() => {
  return country.value && artistsToShow.value < country.value.artists.length;
});

const loadMore = () => {
  artistsToShow.value += 100;
};

const headerConfig = computed(() => {
  if (props.artist) {
    return {
      leadingIcon: 'palette',
      leadingIconColor: 'indigo',
      leadingIconRoute: `/artist/${props.artist}`
    }
  }

  return {
    leadingIcon: 'home',
    leadingIconColor: 'sky',
    leadingIconRoute: '/'
  }
})

onMounted(() => {
  window.scrollTo(0, 0);
});
</script>

<style scoped>
.country-page-container {
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.artist-count {
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

.artist-card {
  margin-bottom: 1.5rem;
  background-color: #1f2937;
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.artist-card:hover {
  transform: scale(1.01);
}

.artist-link {
  display: block;
  text-decoration: none;
  color: inherit;
  padding: 1rem;
}

.artist-info p {
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
  border: 2px solid #3b82f6;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.load-more-button:hover {
  background-color: #3b82f6;
  color: white;
}
</style>
