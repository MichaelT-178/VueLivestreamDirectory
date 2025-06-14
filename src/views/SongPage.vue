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
          >
            {{ song.Artist }}
          </router-link>
        </div>

        <p v-else-if="song.Artist">
          <strong>Artist:</strong> {{ song.Artist }}
        </p>

        <p v-if="song.Album && song.CleanedAlbum">
          <router-link 
            :to="{ name: 'AlbumPageFromSong', params: { song: song.CleanedTitle, album: song.CleanedAlbum } }"
          >
            {{ song.Album }}
          </router-link>
          <span class="year-released"> • {{ song.Year }}</span>
        </p>
        <p v-else-if="song.Album">
          <strong>Album:</strong> {{ song.Album }}
        </p>
      </div>
    </div>

    <div v-if="song.Appearances?.length || song.Other_Artists?.length || song.Instruments?.length" class="appearances-section">
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
        <div v-if="song.Other_Artists?.length" class="other-artists">
          <strong>Other Artists</strong>
          <ul>
            <li 
              v-for="(artist, index) in song.Other_Artists" 
              :key="'other-artist-' + index"
            >
              <router-link 
                :to="{ name: 'ArtistPageFromSong', params: { song: song.CleanedTitle, artist: artist.cleanedArtist } }"
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

const headerConfig = computed(() => {
  if (props.artist) {
    return {
      leadingIcon: 'palette',
      leadingIconColor: 'orange',
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
      leadingIconColor: '#38bdf8',
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
    return new URL(`../assets/AlbumPics/${song.value.CleanedAlbum}.jpg`, import.meta.url).href
  }

  return new URL(`../assets/ArtistPics/${song.value.CleanedArtist}.jpg`, import.meta.url).href
}

const getArtistImagePath = (cleanedName) => {
  return new URL(`../assets/ArtistPics/${cleanedName}.jpg`, import.meta.url).href
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

p {
  margin: 0.5rem 0;
}

a {
  color: #007acc;
  text-decoration: underline;
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
  color: white;
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
</style>
