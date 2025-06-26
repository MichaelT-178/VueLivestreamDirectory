<template>
  <div class="country-page-container" v-if="country">
    <HeaderWithIcon
      :title="country.name"
      icon="mappin"
      iconColor="amber"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />

    <img 
      :src="getCountryImagePath(country.cleanedName)" 
      :alt="country.name" 
      class="country-image"
    />

    <p class="artist-count">
      <strong>Number of Artists:</strong> {{ country.numOfArtists }}
    </p>

    <!-- Search Bar -->
    <div class="search-bar-container" v-if="country.numOfArtists >= 25">
      <font-awesome-icon icon="search" class="search-icon" />
      <input 
        v-model="searchQuery"
        type="text"
        class="search-bar"
        placeholder="Filter by artist or location"
      />
    </div>

    <div
      v-for="artist in filteredArtists"
      :key="artist.CleanedArtist"
      class="artist-card"
    >
      <router-link
        :to="`/country/${country.cleanedName}/artist/${artist.CleanedArtist}`"
        class="artist-link"
      >
        <div class="artist-info">
          <img
            :src="getArtistImagePath(artist.CleanedArtist)"
            :alt="artist.Artist"
            class="artist-thumb"
          />
          <div class="artist-text">
            <p><strong>{{ artist.Artist }}</strong></p>
            <p>{{ artist.Location }}</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
  
  <div v-else class="country-page-container">
    <HeaderWithIcon
      title="Country"
      icon="mappin"
      iconColor="amber"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />
    <div class="not-found-message">
      <p>
        "<strong>{{ formattedCountryNoArtists }}</strong>" ain't no country I ever heard of!
        <br />
        Do they speak English in "<strong>{{ formattedCountryNoArtists }}</strong>"?
      </p>
    </div>
    <img :src="SamJacksonPic" alt="Pulp Fiction Sam Jackson Jules" class="not-found-image" />
  </div>
</template>


<script setup>
import { computed, ref, onMounted } from 'vue';
import CountryData from '../assets/Data/countries.json';
import HeaderWithIcon from '../components/HeaderWithIcon.vue';
import SamJacksonPic from '../assets/CountryPics/SamJackson.jpg';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const props = defineProps({
  country: String,
  artist: {
    type: String,
    required: false,
  },
});

const country = computed(() => CountryData[props.country.toLowerCase()]);
const searchQuery = ref('');

const filteredArtists = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return !country.value
    ? []
    : country.value.artists.filter(artist =>
        artist.Artist.toLowerCase().includes(query) ||
        artist.Location.toLowerCase().includes(query)
      );
});

const formattedCountryNoArtists = computed(() => {
  if (!props.country) {
    return '';
  }

  return props.country
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
});

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
});

const getCountryImagePath = (cleanedName) => {
  return new URL(`../assets/CountryPics/${cleanedName}.jpg`, import.meta.url).href;
};

const getArtistImagePath = (cleanedName) => {
  return new URL(`../assets/ArtistPics/${cleanedName}.jpg`, import.meta.url).href;
};

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
  margin-bottom: 1.5rem;
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
  box-sizing: border-box;
}

.search-bar::placeholder {
  color: #555;
}

.search-bar:focus {
  outline: none;
  border-color: #2275d9;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #555;
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

.artist-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.artist-thumb {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
}

.artist-text {
  display: flex;
  flex-direction: column;
}

.artist-text p {
  margin: 0.25rem 0;
}

.country-image {
  width: 100%;
  max-width: 600px;
  margin: 1rem auto 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.not-found-message {
  font-size: 1.3rem;
  text-align: center;
  margin-bottom: 2rem;
}

.not-found-image {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

@media (max-width: 500px) {
  .not-found-message {
    font-size: 1.1rem;
  }

  .search-bar-container {
    margin-bottom: 1.5rem;
  }
}
</style>
