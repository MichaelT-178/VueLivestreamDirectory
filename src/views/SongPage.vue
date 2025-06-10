<template>
  <div class="page-container" v-if="song">
    <HeaderWithIcon
      :title="song.Title"
      icon="audiolines"
      iconColor="#FB923C"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />

    <h1>{{ song.Title }}</h1>

    <img 
      :src="getImagePath()" 
      :alt="song.Title" 
      class="song-image"
    />

    <p v-if="song.Artist && song.CleanedArtist">
      <strong>Artist:</strong>
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
      <strong>Album:</strong>
      <router-link 
        :to="{ name: 'AlbumPageFromSong', params: { song: song.CleanedTitle, album: song.CleanedAlbum } }"
      >
        {{ song.Album }}
      </router-link>
    </p>
    <p v-else-if="song.Album">
      <strong>Album:</strong> {{ song.Album }}
    </p>

    <p v-if="song.Other_Artists"><strong>Other Artists:</strong> {{ song.Other_Artists }}</p>
    <p v-if="song.Instruments"><strong>Instruments:</strong> {{ song.Instruments }}</p>

    <div v-if="song.Appearances?.length">
      <strong>Appearances:</strong>
      <ul>
        <li v-for="(appearance, index) in song.Appearances" :key="index">
          <a 
            :href="appearance.link" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {{ appearance.appearance }}
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
import SongData from '../assets/Data/songs.json'
import HeaderWithIcon from '../components/HeaderWithIcon.vue'
import { useRoute } from 'vue-router'

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
}

.song-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
}

h1 {
  margin-bottom: 1rem;
}

p {
  margin: 0.5rem 0;
}

a {
  color: #007acc;
  text-decoration: underline;
}
</style>
