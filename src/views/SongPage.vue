<template>
  <div class="page-container" v-if="song">
    <div class="header-wrapper">
      <HeaderWithIcon
        title=""
        icon="audiolines"
        iconColor="#FB923C"
        :leadingIcon="headerConfig.leadingIcon"
        :leadingIconColor="headerConfig.leadingIconColor"
        :leadingIconRoute="headerConfig.leadingIconRoute"
      />
    </div>

    <div class="content-wrapper">
      <img 
        :src="getImagePath()" 
        :alt="song.Title" 
        class="song-image"
      />

      <div class="song-details">
        <h2>{{ song.Title }}</h2>

        <p v-if="song.Artist && song.CleanedArtist">
          <router-link 
            :to="{ name: 'ArtistPageFromSong', params: { song: song.CleanedTitle, artist: song.CleanedArtist } }"
          >
            {{ song.Artist }}
          </router-link>
        </p>
        <p v-else-if="song.Artist">
          <strong>Artist:</strong> {{ song.Artist }}
        </p>

        <p v-if="song.Album && song.CleanedAlbum">
          <router-link 
            :to="{ name: 'AlbumPageFromSong', params: { song: song.CleanedTitle, album: song.CleanedAlbum } }"
          >
            {{ song.Album }}
          </router-link>
          <span class="year-released">• {{ song.Year }}</span>
        </p>
        <p v-else-if="song.Album">
          <strong>Album:</strong> {{ song.Album }}
        </p>

        <p v-if="song.Other_Artists"><strong>Other Artists:</strong> {{ song.Other_Artists }}</p>
        <p v-if="song.Instruments"><strong>Instruments:</strong> {{ song.Instruments }}</p>
      </div>
    </div>

    <div v-if="song.Appearances?.length" class="appearances-section">
      <strong class="appearances-tab">Appearances</strong>
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
            <div class="appearance-content">
              {{ appearance.appearance }}
              <div class="keys">{{ appearance.keys?.join(' • ') }}</div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Song not found.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SongData from '../assets/Data/songs.json'
import HeaderWithIcon from '../components/HeaderWithIcon.vue'

const props = defineProps({
  song: String,
  artist: {
    type: String,
    required: false
  }
})

const route = useRoute()
const song = computed(() => SongData[props.song])

const headerConfig = computed(() => {
  if (props.artist) {
    return {
      leadingIcon: 'palette',
      leadingIconColor: '#FB923C',
      leadingIconRoute: `/artist/${props.artist}`
    }
  } else if (route.name === 'SongPageFromRepertoire') {
    return {
      leadingIcon: 'musicnote',
      leadingIconColor: '#FB7185',
      leadingIconRoute: '/repertoire'
    }
  }
  return {
    leadingIcon: 'home',
    leadingIconColor: '#38bdf8',
    leadingIconRoute: '/'
  }
})

const getImagePath = () => {
  if (!song.value) return ''
  if (song.value.CleanedAlbum) {
    return new URL(`../assets/AlbumPics/${song.value.CleanedAlbum}.jpg`, import.meta.url).href
  }
  return new URL(`../assets/ArtistPics/${song.value.CleanedArtist}.jpg`, import.meta.url).href
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
  display: flex;
  justify-content: flex-start;
  margin-bottom: 2rem;
}

.content-wrapper {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
}

.song-image {
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.song-details {
  max-width: 500px;
}

.song-details h2 {
  color: white;
  margin-bottom: 0.5rem;
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
  margin-bottom: 0.5rem;
  background-color: #eaeaea; /* even rows */
  border-radius: 6px;
  overflow: hidden;
}

.appearances-list li.zebra {
  background-color: #d4d4d4; /* odd rows */
}

.appearance-link {
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: inherit;
}

.appearance-content {
  display: flex;
  flex-direction: column;
}

.keys {
  font-size: 0.95rem;
  color: #444;
  margin-top: 0.25rem;
}

.appearances-tab {
  color: #007acc;
  text-decoration: underline;
}
</style>
