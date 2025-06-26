<template>
  <div class="country-page-container" v-if="country">

    <div class="country-header-row">
      <HeaderWithIcon
        :title="country.name"
        icon="mappin"
        iconColor="amber"
        :leadingIcon="headerConfig.leadingIcon"
        :leadingIconColor="headerConfig.leadingIconColor"
        :leadingIconRoute="headerConfig.leadingIconRoute"
      />

      <div class="dropdown-and-image-wrapper">
        <div class="filter-wrapper header-dropdown-wrapper" @click="openCountryDropdown">
          <select
            ref="countrySelect"
            v-model="selectedCountry"
            class="filter-select"
            :class="{ 'no-arrow': isSmallScreen }"
            @change="handleCountryChange"
            @click.stop
          >
            <option disabled value="">Select Country</option>
            <option
              v-for="c in allCountries"
              :key="c.cleanedCountry"
              :value="c.cleanedCountry"
            >
              {{ c.emoji }} {{ c.country }}
            </option>
          </select>
        </div>

        <div class="country-image-wrapper">
          <img 
            :src="getCountryImagePath(country.cleanedName)" 
            :alt="country.name" 
            class="country-image"
            :class="{ 'loaded': imageLoaded }"
            @load="handleImageLoad"
          />
        </div>
      </div>
    </div>

    <p class="artist-count">
      <strong>Number of Artists:</strong> {{ country.numOfArtists }}
    </p>

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

    <button
      v-if="country.numOfArtists >= 25 && isExtraSmallScreen && !searchQuery"
      class="go-to-top-btn"
      @click="scrollToTop"
    >
      Go back to top
    </button>
  </div>

  <!-- Not Found -->
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import CountryData from '../assets/Data/countries.json';
import HeaderWithIcon from '../components/HeaderWithIcon.vue';
import SamJacksonPic from '../assets/CountryPics/SamJackson.jpg';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const router = useRouter();

const props = defineProps({
  country: String,
  artist: String
});

const country = computed(() => CountryData[props.country.toLowerCase()]);
const searchQuery = ref('');
const imageLoaded = ref(false);
const selectedCountry = ref('');
const allCountries = CountryData.AllCountries;

const isSmallScreen = ref(false);
const isExtraSmallScreen = ref(false);
const countrySelect = ref(null);

const handleImageLoad = () => {
  imageLoaded.value = true;
};

const filteredArtists = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return !country.value
    ? []
    : country.value.artists.filter(artist =>
        artist.Artist.toLowerCase().includes(query) ||
        artist.Location.toLowerCase().includes(query)
      );
});

const handleCountryChange = () => {
  if (selectedCountry.value) {
    router.push(`/country/${selectedCountry.value}`);
  }
};

const openCountryDropdown = () => {
  if (countrySelect.value) {
    nextTick(() => {
      countrySelect.value.focus();
      countrySelect.value.click();
    });
  }
};

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

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const checkScreen = () => {
  const width = window.innerWidth;

  isSmallScreen.value = width <= 700;
  isExtraSmallScreen.value = width <= 400;
};

onMounted(() => {
  window.scrollTo(0, 0);
  selectedCountry.value = props.country;
  checkScreen();
  window.addEventListener('resize', checkScreen);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen);
});

</script>


<style scoped>
.country-page-container {
  padding: 2rem;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.country-header-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dropdown-and-image-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  flex-wrap: wrap;
}

.header-dropdown-wrapper {
  background-color: #1f2937;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-right: 10px;
  cursor: pointer;
  position: relative;
}

.filter-select {
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #1f2937;
  border: none;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  appearance: auto;
}

.filter-select.no-arrow {
  appearance: none;
  background-image: none;
}

.country-image {
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
}

.country-image.loaded {
  opacity: 1;
}

.artist-count {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: #e3e3e3;
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

@media (max-width: 700px) {
  .dropdown-and-image-wrapper {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .header-dropdown-wrapper {
    width: 100%;
    margin-left: 0;
  }

  .country-image-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .artist-thumb {
    width: 60px;
    height: 60px;
  }

  .artist-card {
    margin-bottom: 1rem;
  }

  .artist-link {
    padding: 0.7rem 1rem;
  }
}

@media (max-width: 500px) {
  .search-bar-container {
    width: 100%;
    margin-bottom: 1.5rem;
  }

  .search-bar-container .search-bar {
    width: 100%;
    box-sizing: border-box;
  }

  .artist-card {
    width: 100%;
    box-sizing: border-box;
  }
}

@media (max-width: 400px) {
  .go-to-top-btn {
    display: block;
    margin: 40px auto 50px;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: bold;
    background-color: #2275d9;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .go-to-top-btn:hover {
    background-color: #1a57a2;
  }

  .artist-text {
    font-size: 0.925rem;
  }
}

</style>
