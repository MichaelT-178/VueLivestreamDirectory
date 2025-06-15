<template>
  <div class="page-container" v-if="album">
    <div class="header-wrapper">
      <HeaderWithIcon
        title="Album"
        icon="DiscThree"
        iconColor="emerald"
        :leadingIcon="headerConfig.leadingIcon"
        :leadingIconColor="headerConfig.leadingIconColor"
        :leadingIconRoute="headerConfig.leadingIconRoute"
      />
    </div>

    <div class="content-wrapper">
      <div class="image-wrapper">
        <img 
          :src="getAlbumImagePath(album.CleanedAlbumTitle)" 
          :alt="album.AlbumTitle" 
          class="song-image"
        />
      </div>

      <div class="song-details">
        <h2>{{ album.AlbumTitle }}</h2>

        <div class="artist-info" v-if="album.Artist && album.CleanedArtist">
          <img 
            :src="getArtistImagePath(album.CleanedArtist)" 
            :alt="album.Artist" 
            class="artist-thumb"
          />
          <router-link
            :to="{
              name: 'ArtistPageFromAlbum',
              params: {
                album: album.CleanedAlbumTitle,
                artist: album.CleanedArtist
              }
            }"
            class="artist-link"
          >
            {{ album.Artist }}
          </router-link>
        </div>

        <p v-if="album.Year" class="year-text">
          Album <span class="album-circle">•</span> {{ album.Year }}
        </p>
      </div>
    </div>

    <div v-if="album.Songs?.length" class="appearances-section">
      <div class="tab-header">
        <strong class="appearances-tab no-border">Songs</strong>
      </div>

      <ul class="appearances-list">
        <li 
          v-for="(song, index) in album.Songs" 
          :key="index" 
          :class="{ zebra: index % 2 === 1 }"
        >
          <router-link
            :to="{
              name: 'SongPageFromAlbum',
              params: {
                album: props.album,
                song: song.CleanedSong
              }
            }"
            class="appearance-link"
          >
            <div class="appearance-row">
              <div class="appearance-id" :class="{ 'non-zebra-text': index % 2 === 0 }">
                {{ index + 1 }}
              </div>
              <div class="appearance-content" :class="{ 'non-zebra-text': index % 2 === 0 }">
                <div class="appearance-title">
                  {{ song.Song }}
                </div>
              </div>
            </div>
          </router-link>
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

const album = computed(() => AlbumData[props.album])

const headerConfig = computed(() => {
  if (props.artist) {
    return {
      leadingIcon: 'palette',
      leadingIconColor: 'indigo',
      leadingIconRoute: `/artist/${props.artist}`
    }
  } else if (props.song) {
    return {
      leadingIcon: 'audiolines',
      leadingIconColor: 'orange',
      leadingIconRoute: `/song/${props.song}`
    }
  }

  return {
    leadingIcon: 'home',
    leadingIconColor: 'sky',
    leadingIconRoute: '/'
  }
})

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

.artist-link {
  color: #007acc;
  text-decoration: underline;
}

p {
  margin: 0.5rem 0;
}

.year-text {
  color: #dad7d7;
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
  padding-bottom: 4px;
  position: relative;
}

.appearances-tab.no-border {
  border-bottom: none;
}

.appearances-list {
  list-style-type: none;
  padding: 0;
  margin-top: 1rem;
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

.album-circle {
  font-size: 15px;
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

.appearance-title {
  color: white;
}
</style>
