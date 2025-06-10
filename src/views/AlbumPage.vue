<template>
  
  <div class="page-container" v-if="album">
    
    <HeaderWithIcon
      :title="album.AlbumTitle"
      icon="HandCoins"
      iconColor="#38bdf8"
      :leadingIcon="headerConfig.leadingIcon"
      :leadingIconColor="headerConfig.leadingIconColor"
      :leadingIconRoute="headerConfig.leadingIconRoute"
    />

    <h1>{{ album.AlbumTitle }}</h1>

    <img 
      :src="getAlbumImagePath(album.CleanedAlbumTitle)" 
      :alt="album.AlbumTitle" 
      class="album-image"
    />

    <div class="album-info">
      <p><strong>Artist:</strong> {{ album.Artist }}</p>
      <img 
        :src="getArtistImagePath(album.CleanedArtist)" 
        :alt="album.Artist" 
        class="artist-image"
      />
      <p><strong>Year:</strong> {{ album.Year }}</p>
    </div>

    <div class="songs" v-if="album.Songs && album.Songs.length">
      <h2>Songs</h2>
      <ul>
        <li v-for="(song, index) in album.Songs" :key="index">
          <p><strong>Title:</strong> {{ song.Song }}</p>
        </li>
      </ul>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Album not found.</p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import AlbumData from '../assets/Data/albums.json'
import HeaderWithIcon from '../components/HeaderWithIcon.vue'

const props = defineProps({
  album: String,
  artist: {
    type: String,
    required: false
  },
  song: {
    type: String,
    required: false
  }
})


const headerConfig = computed(() => {
  if (props.artist) {
    return {
      leadingIcon: 'palette',
      leadingIconColor: '#FB923C',
      leadingIconRoute: `/artist/${props.artist}`
    }
  } else if (props.song) {
    return {
      leadingIcon: 'audiolines',
      leadingIconColor: '#FB923C',
      leadingIconRoute: `/song/${props.song}`
    }
  }

  return {
    leadingIcon: 'home',
    leadingIconColor: '#38bdf8',
    leadingIconRoute: '/'
  }
})

const album = computed(() => AlbumData[props.album])

const getAlbumImagePath = (cleanedTitle) => {
  return new URL(`../assets/AlbumPics/${cleanedTitle}.jpg`, import.meta.url).href
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
}

.album-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 1.5rem;
}

.artist-image {
  max-width: 200px;
  height: auto;
  margin: 1rem 0;
}

.album-info {
  margin-bottom: 2rem;
}

.songs {
  margin-top: 2rem;
}

h1, h2 {
  margin-bottom: 1rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-left: 4px solid #ccc;
  background-color: #f9f9f9;
}
</style>
