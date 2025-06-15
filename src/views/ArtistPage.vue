<template>
  <div class="page-container" v-if="artist">
    <div class="header-wrapper">
      <HeaderWithIcon
        title="Artist"
        icon="palette"
        iconColor="indigo"
        :leadingIcon="headerConfig.leadingIcon"
        :leadingIconColor="headerConfig.leadingIconColor"
        :leadingIconRoute="headerConfig.leadingIconRoute"
      />
    </div>

    <div class="content-wrapper">
      <div class="image-wrapper">
        <img
          :src="getArtistImagePath(artist.CleanedArtist)"
          :alt="artist.Artist"
          class="artist-image"
        />
      </div>

      <div class="details-wrapper">
        <h2 class="artist-title">{{ artist.Artist }}</h2>
      </div>
    </div>

    <div class="tabbed-section" v-if="artist.Songs?.length || true">
      <div class="tab-header">
        <strong
          class="tab"
          :class="{ active: activeTab === 'songs' }"
          @click="activeTab = 'songs'"
        >Songs</strong>
        <strong
          class="tab"
          :class="{ active: activeTab === 'albums' }"
          @click="activeTab = 'albums'"
        >Albums</strong>
      </div>

      <div v-if="activeTab === 'songs'">
        <ul v-if="artist.Songs?.length" class="list">
          <li
            v-for="(song, index) in artist.Songs"
            :key="song.Id"
            :class="{ zebra: index % 2 === 1 }"
          >
            <router-link
              :to="{ name: 'SongPageFromArtist', params: { artist: artist.CleanedArtist, song: song.CleanedTitle } }"
              class="list-link"
            >
              <div class="list-row">
                <img
                  :src="getSongImagePath(song)"
                  :alt="song.Title"
                  class="thumb"
                />
                <div class="list-content">
                  <div class="title">{{ song.Title }}</div>
                  <div v-if="song.Album" class="subtitle">{{ song.Album }}</div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <div v-else class="empty-message">This artist has no songs.</div>
      </div>

      <div v-if="activeTab === 'albums'">
        <ul v-if="artist.Albums?.length" class="list">
          <li
            v-for="(album, index) in artist.Albums"
            :key="album.CleanedTitle"
            :class="{ zebra: index % 2 === 1 }"
          >
            <router-link
              :to="{ name: 'AlbumPageFromArtist', params: { artist: artist.CleanedArtist, album: album.CleanedTitle } }"
              class="list-link"
            >
              <div class="list-row">
                <img
                  :src="getAlbumImagePath(album.CleanedTitle)"
                  :alt="album.Title"
                  class="thumb"
                />
                <div class="list-content">
                  <div class="title">{{ album.Title }}</div>
                  <div class="subtitle">{{ album.Year }}</div>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <div v-else class="empty-message">This artist has no albums.</div>
      </div>
    </div>
  </div>

  <div class="page-container" v-else>
    <p>Artist not found.</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import ArtistData from '../assets/Data/artists.json'
import HeaderWithIcon from '../components/HeaderWithIcon.vue'

const props = defineProps({
  artist: String,
  song: String,
  album: String
})

const activeTab = ref('songs')

const artist = computed(() => ArtistData[props.artist])

const headerConfig = computed(() => {
  if (props.song) {
    return {
      leadingIcon: 'audiolines',
      leadingIconColor: 'orange',
      leadingIconRoute: `/song/${props.song}`
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

const getArtistImagePath = (cleanedName) =>
  new URL(`../assets/ArtistPics/${cleanedName}.jpg`, import.meta.url).href

const getAlbumImagePath = (cleanedTitle) =>
  new URL(`../assets/AlbumPics/${cleanedTitle}.jpg`, import.meta.url).href

const getSongImagePath = (song) => {
  if (song.CleanedAlbum) {
    return new URL(`../assets/AlbumPics/${song.CleanedAlbum}.jpg`, import.meta.url).href
  }
  return getArtistImagePath(artist.value.CleanedArtist)
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
  gap: 2rem;
  flex-wrap: wrap;
  width: 100%;
  max-width: 800px;
}

.image-wrapper {
  flex-shrink: 0;
}

.artist-image {
  width: 250px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.details-wrapper {
  flex: 1;
  min-width: 250px;
}

.artist-title {
  color: white;
  margin-top: 0.5rem;
}

.tabbed-section {
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

.tab {
  color: white;
  cursor: pointer;
  padding-bottom: 4px;
}

.tab.active {
  border-bottom: 2px solid #007acc;
}

.list {
  list-style: none;
  padding: 0;
  margin-top: 1rem;
}

.list li {
  background-color: #131e37;
}

.list li.zebra {
  background-color: #0F172A;
}

.list-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.list-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  transition: background-color 0.3s ease;
}

.list-link:hover .list-row {
  background-color: #090e19;
  text-decoration: underline;
}

.thumb {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}

.list-content {
  flex: 1;
  color: white;
  display: flex;
  flex-direction: column;
}

.title {
  font-weight: bold;
  color: white;
}

.subtitle {
  font-size: 0.95rem;
  margin-top: 0.25rem;
  color: white;
}

.empty-message {
  color: white;
}

</style>
