<template>
  <div class="page-container" v-if="song">
    <h1>{{ song.Title }}</h1>

    <img 
      :src="getImagePath(song.CleanedAlbum)" 
      :alt="song.Title" 
      class="song-image"
    />

    <p><strong>Artist:</strong> {{ song.Artist }}</p>
    <p v-if="song.Album"><strong>Album:</strong> {{ song.Album }}</p>
    <p v-if="song.Other_Artists"><strong>Other Artists:</strong> {{ song.Other_Artists }}</p>
    <p v-if="song.Instruments"><strong>Instruments:</strong> {{ song.Instruments }}</p>
    <p v-if="song.Appearances"><strong>Appearances:</strong> {{ song.Appearances }}</p>
    <p v-if="song.Links">
      <strong>Link:</strong>
      <a :href="song.Links" target="_blank" rel="noopener noreferrer">{{ song.Links }}</a>
    </p>
  </div>

  <div class="page-container" v-else>
    <p>Song not found.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import SongData from '../assets/Data/songs.json'

const props = defineProps({
  title: String
})

const song = computed(() => SongData[props.title])

const getImagePath = (cleanedIdentifier) => {
  if (!song.value) return ''
  const baseFolder = song.value.ArtistPic ? 'ArtistPics' : 'AlbumPics'
  return new URL(`../assets/${baseFolder}/${cleanedIdentifier}.jpg`, import.meta.url).href
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
