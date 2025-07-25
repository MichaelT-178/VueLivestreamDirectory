<template>
  <div class="page-container" v-if="song">
    <div class="header-wrapper">
      <HeaderWithIcon
        title="Song"
        icon="audiolines"
        iconColor="orange"
        :leadingIcon="headerConfig.leadingIcon"
        :leadingIconColor="headerConfig.leadingIconColor"
        :leadingIconRoute="headerConfig.leadingIconRoute"
      />
    </div>

    <div class="content-wrapper">
      <div class="image-wrapper">
        <img 
          :src="getImagePath()" 
          :alt="song.Title" 
          class="song-image"
        />
      </div>

      <div class="song-details">
        <h2>{{ song.Title }}</h2>

        <div class="artist-info" v-if="song.Artist && song.CleanedArtist">
          <img
            :src="getArtistImagePath(song.CleanedArtist)"
            :alt="song.Artist"
            class="artist-thumb"
          />
          <router-link 
            :to="{ name: 'ArtistPageFromSong', params: { song: song.CleanedTitle, artist: song.CleanedArtist } }"
            class="artist-link"
          >
            {{ song.Artist }}
          </router-link>
        </div>

        <p v-else-if="song.Artist">
          <strong>Artist:</strong> {{ song.Artist }}
        </p>

        <p v-if="!isSmallScreen && song.Album && song.CleanedAlbum">
          <router-link 
            :to="{ name: 'AlbumPageFromSong', params: { song: song.CleanedTitle, album: song.CleanedAlbum } }"
            class="album-link"
          >
            {{ song.Album }}
          </router-link>
          <span class="year-released"> • {{ song.Year }}</span>
        </p>
        <p v-else-if="!isSmallScreen && song.Album">
          <strong>Album:</strong> {{ song.Album }}
        </p>
        
      </div>
    </div>

    <div 
      v-if="song.Appearances?.length || song.Other_Artists?.length || song.Instruments?.length" 
      class="appearances-section"
    >
      <div class="tab-header">
        <strong 
          class="appearances-tab"
          :class="{ active: activeTab === 'appearances' }"
          @click="activeTab = 'appearances'"
        >
          Appearances
        </strong>
        <strong 
          class="appearances-tab"
          :class="{ active: activeTab === 'info' }"
          @click="activeTab = 'info'"
        >
          Info
        </strong>
      </div>

      <div v-if="activeTab === 'appearances'">
        <ul class="appearances-list">
          <li 
            v-for="(appearance, index) in song.Appearances" 
            :key="index" 
            :class="{ zebra: index % 2 === 1 }"
          >
            <a 
              :href="appearance.link" 
              target="_blank" 
              rel="noopener noreferrer"
              class="appearance-link"
            >
              <div class="appearance-row">
                <div 
                  class="appearance-id"
                  :class="{ 'non-zebra-text': index % 2 === 0 }"
                >
                  {{ appearance.id }}
                </div>
                <div 
                  class="appearance-content"
                  :class="{ 'non-zebra-text': index % 2 === 0 }"
                >
                  <div class="appearance-title">
                    {{ appearance.appearance }}
                  </div>
                  <div 
                    class="keys"
                    :class="{ 'non-zebra-text': index % 2 === 0 }"
                  >
                    {{ appearance.keys?.join(' • ') }}
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div v-if="activeTab === 'info'" class="info-section">

        <!-- Only show this on small screen. Year and album-->
        <div v-if="isSmallScreen && song.Album" class="album-info">
          <strong class="info-section-header">Album</strong>
          <ul>
            <li>
              <template v-if="song.CleanedAlbum">
                <router-link 
                  :to="{ name: 'AlbumPageFromSong', params: { song: song.CleanedTitle, album: song.CleanedAlbum } }"
                  class="album-link"
                >
                  {{ song.Album }}
                </router-link>
              </template>
              <template v-else>
                {{ song.Album }}
              </template>
            </li>
          </ul>
        </div>
        
        <!-- PART OF SMALL SCREEN SHOWS THE YEAR
        <div v-if="isSmallScreen && song.Year" class="year-info">
          <strong class="info-section-header">Year</strong>
          <ul>
            <li>{{ song.Year }}</li>
          </ul>
        </div> 
        -->


        <div v-if="song.Other_Artists?.length" class="other-artists">
          <strong>Other Artists</strong>
          <ul>
            <li 
              v-for="(artist, index) in song.Other_Artists" 
              :key="'other-artist-' + index"
            >
              <router-link 
                :to="{ name: 'ArtistPageFromSong', params: { song: song.CleanedTitle, artist: artist.cleanedArtist } }"
                class="other-artist-link"
              >
                {{ artist.artist }}
              </router-link>
            </li>
          </ul>
        </div>

        <div v-if="song.Instruments?.length" class="instruments">
          <strong>Instruments</strong>
          <ul>
            <li 
              v-for="(instrument, index) in song.Instruments" 
              :key="'instrument-' + index"
            >
              <template v-if="instrument.cleanedName">
                <router-link 
                  :to="{ name: 'InstrumentPageFromSong', params: { song: song.CleanedTitle, instrument: instrument.cleanedName } }"
                  class="instrument-link"
                >
                  {{ instrument.name }}
                </router-link>
              </template>
              <template v-else>
                <span class="instrument-name">{{ instrument.name }}</span>
              </template>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Song not found.</p>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import SongData from '../assets/Data/songs.json'
import HeaderWithIcon from '../components/HeaderWithIcon.vue'
import { useScreenHelpers } from '../composables/useScreenHelpers.js';
import AlbumLookup from '../assets/Data/AlbumLookup.js';
import ArtistLookup from '../assets/Data/ArtistLookup.js';

const props = defineProps({
  song: String,
  artist: {
    type: String,
    required: false
  },
  album: {
    type: String,
    required: false
  }
})

const route = useRoute()
const song = computed(() => SongData[props.song])
const activeTab = ref('appearances')

const { isSmallScreen, scrollToTop } = useScreenHelpers();

const headerConfig = computed(() => {
  if (props.artist) {
    return {
      leadingIcon: 'palette',
      leadingIconColor: 'indigo',
      leadingIconRoute: `/artist/${props.artist}`
    }
  } else if (route.name === 'SongPageFromRepertoire') {
    return {
      leadingIcon: 'musicnote',
      leadingIconColor: 'rose',
      leadingIconRoute: '/repertoire'
    }
  } else if (props.album) {
    return {
      leadingIcon: 'DiscThree',
      leadingIconColor: 'emerald',
      leadingIconRoute: `/album/${props.album}`
    }
  }
  return {
    leadingIcon: 'home',
    leadingIconColor: 'sky',
    leadingIconRoute: '/'
  }
})

const getImagePath = () => {
  if (!song.value) {
    return ''
  }

  if (song.value.CleanedAlbum) {
    return AlbumLookup[song.value.CleanedAlbum]
  }

  return ArtistLookup[song.value.CleanedArtist]
}

const getArtistImagePath = (cleanedName) => {
  return ArtistLookup[cleanedName]
}

onMounted(() => {
  window.scrollTo(0, 0)
})

</script>


<style scoped>
.page-container {
  padding: 2rem;
  font-size: 1.1rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-wrapper {
  width: 100%;
  max-width: 800px;
  margin-bottom: 2rem;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  max-width: 800px;
  width: 100%;
}

.dark .song-details h2 {
  /* color: red; */
  color: #94A3B8;
}

.dark .year-released {
  /* color: red; */
  color: #94A3B8;
}

.dark .appearances-tab {
  color: #60A5FA;
}

.dark .appearances-tab.active {
  border-bottom: 2px solid #60A5FA;
}

.dark .appearances-list li {
  background-color: #eef5fd;
}

.dark .appearances-list li.zebra {
  background-color: white;
}

.dark .album-info strong {
  color: #94A3B8;
}

.dark .other-artists strong {
  color: #94A3B8;
}

.dark .instruments strong {
  color: #94A3B8;
}

.dark .instrument-name {
  color: #94A3B8;
}

.dark .appearance-id {
  color: #94A3B8;
}

.dark .appearance-content {
  /* color: #525252; */
  color: #656f7c;
}

.dark .keys {
  color: #94A3B8;
}

.dark .appearance-link:hover .appearance-row {
  background-color: #808ea2;
  text-decoration: none;
}

.dark .appearance-link:hover .appearance-title {
  color: white;
}

.dark .appearance-link:hover .appearance-id {
  color: white;
}

.dark .appearance-link:hover .keys {
  color: white;
}

/* .dark .tab-header {
  border-bottom: 1px solid red;
} */

.dark .other-artists li::before,
.dark .instruments li::before,
.dark .album-info li::before,
.dark .year-info li::before {
  /* color: #94A3B8; */
  /* color: black; */
  color: black;
}

.artist-link, 
.album-link {
  color: #007acc;
  text-decoration: none;
}

.artist-link:hover,
.album-link:hover {
  color: #63beff;
  text-decoration: underline;
}

.instrument-link,
.other-artist-link {
  color: #007acc;
  text-decoration: none;
}

.instrument-link:hover,
.other-artist-link:hover {
  color: #63beff;
  text-decoration: underline;
}

.other-artists li,
.instruments li {
  padding-bottom: 0.5rem;
}

.image-wrapper {
  flex-shrink: 0;
}

.song-image {
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.song-details {
  flex: 1;
  min-width: 250px;
}

.song-details h2 {
  color: white;
  margin-bottom: 0.5rem;
}

.artist-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.artist-thumb {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.dark .artist-thumb {
  /* border: 1px solid #656f7c; */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

p {
  margin: 0.5rem 0;
}

.appearances-section {
  width: 100%;
  max-width: 800px;
  margin-top: 2rem;
}

.tab-header {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #333;
}

.dark .tab-header {
  border-bottom: 1px solid#656f7c;
}

.appearances-tab {
  color: white;
  cursor: pointer;
  padding-bottom: 4px;
  position: relative;
}

.appearances-tab.active {
  border-bottom: 2px solid #007acc;
}

.appearances-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
}

.year-released {
  color: #e3e3e3;
}

.appearances-list li {
  padding: 0;
  background-color: #131e37;
  overflow: hidden;
  transition: color 0.3s ease;
}

.appearances-list li.zebra {
  background-color: #0F172A;
}

.appearance-link {
  display: block;
  width: 100%;
  text-decoration: none;
  color: inherit;
}

.appearance-row {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 0.75rem 1rem;
  transition: color 0.3s ease;
}

.appearance-link:hover .appearance-row {
  background-color: #090e19;
  text-decoration: underline;
}

.appearance-id {
  min-width: 40px;
  font-weight: bold;
  color: white;
}

.appearance-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  color: white;
}

.keys {
  font-size: 0.95rem;
  color: white;
  margin-top: 0.25rem;
}

.other-artists,
.instruments {
  color: white;
}

.other-artists ul,
.instruments ul {
  margin-top: 0.5rem;
  padding-left: 1rem;
  list-style: none;
}

.other-artists li::before,
.instruments li::before {
  content: '• ';
  margin-right: 0.5rem;
}

.instrument-name {
  color: white;
  cursor: default;
  text-decoration: none;
}

.album-info ul,
.year-info ul {
  margin-top: 0.5rem;
  padding-left: 1rem;
  list-style: none;
}

.year-info ul {
  color: white;
}

.album-info li::before,
.year-info li::before {
  content: '• ';
  margin-right: 0.5rem;
  color: white;
}

.info-section-header {
  color: white;
  font-weight: bold;
}

@media (max-width: 595px) {
  .song-details {
    margin-top: -40px;
  }
}

@media (max-width: 400px) {
  .page-container {
    padding: 2rem 1rem;
  }

  .image-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: -40px;
  }

  .appearances-section {
    margin-top: 15px;
  }
}

</style>
